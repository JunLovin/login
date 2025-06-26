import { useState, useEffect } from 'react'
import { Link } from "react-router"
import { Shield, Mail } from "lucide-react"
import { createClient } from '@supabase/supabase-js'

function RecoveryCard() {
    const [email, setEmail] = useState('')
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string)

    const sendRecoveryEmail = async () => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) console.error(error)
        if (data) console.log(data)
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                const newPassword = prompt("Ingresa tu nueva contraseña: ")
                const { data, error } = await supabase.auth.updateUser({ password: newPassword! })
                if (error) console.log(error)
                if (data) alert("Contraseña actualizada correctamente!")
            }
        })
    }

    return (
        <>
            <div className="login-card w-lg max-2xl:py-8 max-md:w-md dark:bg-black/20 rounded-xl p-8 h-max py-16 shadow-2xl border-white/30 dark:border-white/10 bg-white/20 transition-all duration-300">
                <div className="card-top flex flex-col items-center justify-center">
                    <div className="card-icon flex flex-col items-center justify-center">
                        <div className="icon-bg mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="card-text">
                        <h2 className="font-bold text-center text-2xl max-sm:text-xl dark:text-white leading-normal">Recuperar Cuenta</h2>
                        <p className="dark:text-slate-300 text-neutral-500 max-sm:text-sm">Ingresa tu email para recibir instrucciones de recuperación</p>
                    </div>
                </div>
                <div className="card-form w-full dark:text-white mt-4">
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <div className="email w-full flex flex-col gap-2">
                            <label htmlFor="email" className="font-semibold text-neutral-500 dark:text-white text-sm">Email</label>
                            <div className="input-email flex relative">
                                <Mail className="absolute left-3 bottom-[9px]" />
                                <input type="email" id="email" name="email" className="w-full dark:bg-black/40 pr-4 pl-12 py-2 rounded-md border dark:border-gray-800 outline-0 focus:border-blue-400 dark:focus:border-blue-400 bg-white/40 transition-all duration-300 border-white/10" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="button w-full">
                            <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold" onClick={() => {
                                sendRecoveryEmail()
                            }}>Enviar Instrucciones</button>
                        </div>
                        <div className="register flex justify-center items-center text-center text-sm">
                            <p>¿Recordaste tu contraseña? <Link to="/" className="text-blue-500 hover:underline">Inicia sesión aquí</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RecoveryCard