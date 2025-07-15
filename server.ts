import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_ANON_KEY as string)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
    credentials: true
}))

app.get('/', (req, res) => {
    res.json({ success: "La API funciona correctamente." })
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Hay campos incompletos" })
    }
    const { data, error } = await supabase.auth.signUp({ email: email, password: password })
    if (error) {
        console.error(error)
        return res.json({ error: error })
    }
    if (data.session) {
        return res.json({ success: "Se ha registrado el usuario correctamente", role: "authenticated" })
    }
    return res.status(200).json({ success: "Se ha enviado un email de verificación" })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Hay campos incompletos" })
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })
    if (error) { 
        console.error(error)
        return res.status(400).json({ error: `Ha ocurrido un error iniciando sesión, ${error}` })
    }
    
    if (data.session) {
        return res.status(201).json({ success: "Se ha iniciado sesión correctamente", role: "authenticated", info: data.user })
    }
})

app.listen(PORT, () => {
    console.log(`El servidor se inició en el puerto ${PORT}`)
})