import { useState } from 'react'
import { Link } from "react-router"
import { Lock, Mail, Eye } from "lucide-react"

type LogInForm = {
    email: string,
    password: string,
}

function LoginCard() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState<LogInForm>({ 
        email: '',
        password: '',
    })

    return (
        <>
            <div className="login-card w-lg max-2xl:py-8 max-md:w-md dark:bg-black/20 rounded-xl p-8 h-max py-16 shadow-2xl border-white/30 dark:border-white/10 bg-white/20 transition-all duration-300">
                <div className="card-top flex flex-col items-center justify-center">
                    <div className="card-icon flex flex-col items-center justify-center">
                        <div className="icon-bg mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="card-text">
                        <h2 className="font-bold text-center text-2xl max-sm:text-xl dark:text-white leading-normal">Bienvenido</h2>
                        <p className="dark:text-slate-300 text-neutral-500 max-sm:text-sm">Ingresa tus credenciales para continuar</p>
                    </div>
                </div>
                <div className="card-form w-full dark:text-white mt-2">
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                        <div className="email w-full flex flex-col gap-2">
                            <label htmlFor="email" className="font-semibold text-neutral-500 dark:text-white text-sm">Email</label>
                            <div className="input-email flex relative">
                                <Mail className="absolute left-3 bottom-[9px]" />
                                <input type="email" id="email" name="email" className="w-full dark:bg-black/40 pr-4 pl-12 py-2 rounded-md border dark:border-gray-800 outline-0 focus:border-blue-400 dark:focus:border-blue-400 bg-white/40 transition-all duration-300 border-white/10" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="pass w-full flex flex-col gap-2">
                            <label htmlFor="password" className="font-semibold text-neutral-500 dark:text-white text-sm">Contraseña</label>
                            <div className="input-pass flex relative">
                                <Lock className="absolute left-3 bottom-[9px]" />
                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="w-full dark:bg-black/40 pl-12 pr-4 py-2 rounded-md border dark:border-gray-800 outline-0 focus:border-blue-400 dark:focus:border-blue-400 transition-all duration-300 bg-white/40 border-white/10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                                <Eye className="absolute right-3 bottom-[9px] cursor-pointer" onClick={() => {
                                    setShowPassword(!showPassword)
                                }} />
                            </div>
                        </div>
                        <div className="options flex justify-between text-sm max-sm:text-xs">
                            <div className="remember flex gap-2">
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember" className="font-semibold text-neutral-500 dark:text-white">Recordarme</label>
                            </div>
                            <div className="forget">
                                <Link to="/recovery" className="font-semibold text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                            </div>
                        </div>
                        <div className="button w-full">
                            <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold">Iniciar Sesión</button>
                        </div>
                        <div className="third-party-auth flex flex-col items-center justify-center w-full gap-4">
                            <p className="uppercase text-neutral-500 text-sm text-center">O continúa con</p>
                            <div className="google-btn w-full">
                                <button className="dark:bg-black/30 dark:hover:bg-black/50 bg-white/50 border-white/30 transition-all duration-200 w-full flex justify-center items-center gap-2 py-3 border dark:border-neutral-700 rounded-md cursor-pointer text-neutral-500 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-white" onClick={() => {
                                    setForm({ 
                                        email: email,
                                        password: password
                                    })
                                }}>
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span>Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="register flex justify-center items-center text-center text-sm">
                            <p>¿No tienes cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate aquí</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginCard