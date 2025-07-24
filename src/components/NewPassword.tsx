import { useState, useEffect } from 'react'
import { Eye, EyeClosed, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { supabase } from '../utils/utils'
import Toast from './Toast'

function NewPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [canRecover, setCanRecover] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {
                setCanRecover(true)
            }
        })
    }, [])

    const onUpdatePassword = async () => {
        const { data, error } = await supabase.auth
            .updateUser({ password: password! })
        console.log(data)
        if (error) {
            setStatus("Error, ha ocurrido un problema cambiando la contraseña.")
            setShowToast(true)
            setTimeout(() => {
                setStatus("")
                setShowToast(false)
            }, 2000)
            return
        }
        setStatus('Success! Se ha cambiado la contraseña correctamente.')
        setShowToast(true)
        setTimeout(() => {
            setStatus("")
            setShowToast(false)
        }, 2000)

        localStorage.clear()
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    return (
        <>
            {canRecover && (
                <>
                    <Toast show={showToast} message={status} onClose={() => setShowToast(false)} type={status && status.startsWith('Error') ? 'error' : 'success'} />
                    <div className="login-card w-lg max-2xl:py-8 max-md:w-md dark:bg-black/20 rounded-xl p-8 h-max py-16 shadow-2xl border-white/30 dark:border-white/10 bg-white/20 transition-all duration-300">
                        <div className="card-top flex flex-col items-center justify-center">
                            <div className="card-icon flex flex-col items-center justify-center">
                                <div className="icon-bg mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="card-text">
                                <h2 className="font-bold text-center text-2xl max-sm:text-xl dark:text-white leading-normal">Cambia tu Contraseña</h2>
                                <p className="dark:text-slate-300 text-neutral-500 max-sm:text-sm text-center mx-auto">Ingresa tu nueva contraseña</p>
                            </div>
                        </div>
                        <div className="card-form w-full dark:text-white mt-4">
                            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                                <div className="email w-full flex flex-col gap-2">
                                    <label htmlFor="new-password" className="font-semibold text-neutral-500 dark:text-white text-sm">Nueva contraseña</label>
                                    <div className="input-pass flex relative">
                                        <Lock className="absolute left-3 bottom-[9px]" />
                                        <input type={showPassword ? 'text' : 'password'} id="new-password" name="new-password" className="w-full dark:bg-black/40 pl-12 pr-4 py-2 rounded-md border dark:border-gray-800 outline-0 focus:border-blue-400 dark:focus:border-blue-400 transition-all duration-300 bg-white/40 border-white/10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                                        {showPassword && <EyeClosed className="absolute right-3 bottom-[9px] cursor-pointer" onClick={() => {
                                            setShowPassword(false)
                                        }} />}
                                        {!showPassword && <Eye className="absolute right-3 bottom-[9px] cursor-pointer" onClick={() => {
                                            setShowPassword(true)
                                        }} />}
                                    </div>
                                </div>
                                <div className="button w-full">
                                    <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold" onClick={() => { onUpdatePassword() }}>Cambiar contraseña</button>
                                </div>
                                <div className="register flex justify-center items-center text-center text-sm">
                                    <p>¿Recordaste tu contraseña? <Link to="/" className="text-blue-500 hover:underline">Inicia sesión aquí</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default NewPassword