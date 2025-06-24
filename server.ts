import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan())
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({ success: "La API funciona correctamente." })
})

app.listen(PORT, () => {
    console.log(`El servidor se inició en el puerto ${PORT}`)
})