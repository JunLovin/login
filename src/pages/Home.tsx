import { useState, useEffect, useRef } from "react"
import { User, Mail} from "lucide-react"
import { supabase } from "../utils/utils"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { useToast } from "../hooks/useToast"
import Background from "../components/Background"
import Header from "../components/Header"
import CreatorInfo from "../components/CreatorInfo"
import Footer from "../components/Footer"

function Home() {
    const {showToastMessage} = useToast()
    const data = JSON.parse(localStorage.getItem('data')!)
    const [email, setEmail] = useState(data.session.user.email)
    const [fullName, setFullName] = useState(data.session.user.user_metadata.full_name)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [avatarUrl, setAvatarUrl] = useState('http://placebear.com/250/250')
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const username = fullName?.length > 0 ? fullName : 'Usuario'


    const logOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            showToastMessage('Error al cerrar sesión', 'error')
            return
        }
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        supabase.auth.getSession().then((res) => {
            if (res.data) {
                navigate('/home')
                localStorage.setItem('data', JSON.stringify(res.data))
                if (res.data.session?.user.user_metadata.avatar_url) {
                    localStorage.setItem('avatar', JSON.stringify(res.data.session?.user.user_metadata.avatar_url))
                }
            }
        })
        retrieveUserPfp()
    }, [])

    const onUpdateInfoUser = async (newEmail?: string, name?: string) => {
        const { error } = await supabase.auth.updateUser({
            email: newEmail,
            data: { full_name: name }
        })
        if (error) {
            console.error(error)
            showToastMessage('Error interno, inténtelo de nuevo más tarde.', 'error')
            return
        }
        showToastMessage('Se ha cambiado la información correctamente.', 'success')
        const info = await supabase.auth.getSession()
        localStorage.setItem('data', JSON.stringify(info.data))
        return
    }

    const retrieveUserPfp = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase.storage
            .from('avatars')
            .download(`${user.id}/avatar.jpg`)

        if (data && !error) {
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        }
    }

    const onUploadPfp = async (pfp: File) => {
        const { data: { user } } = await supabase.auth.getUser()

        const { data: listBucketItems } = await supabase.storage
            .from('avatars')
            .list(user?.id, {
                limit: 50,
                offset: 0
            })

        const existingFile = listBucketItems?.find(file => file.name === 'avatar.jpg')

        if (existingFile) {
            const { data: replaceFile, error } = await supabase.storage
                .from('avatars')
                .update(`${user?.id}/avatar.jpg`, pfp)

            if (replaceFile) {
                showToastMessage('Se ha actualizado la imagen', 'success')
            } else if (error) {
                console.error(error)
                showToastMessage('Error, ha ocurrido un error', 'error')
            }
            return
        } else {
            const { data, error } = await supabase
                .storage
                .from('avatars')
                .upload(`${user?.id}/avatar.jpg`, pfp)
            if (data) {
                showToastMessage('Se ha actualizado la imagen', 'success')
            }
            if (error) {
                console.error(error)
                showToastMessage('Error, ha ocurrido un error', 'error')
            }
        }
    }

    const makeBlobUrl = (el: File) => {
        return URL.createObjectURL(el)
    }


    return (
        <>
            <div className="home-container min-h-dvh relative overflow-hidden w-full">
                <Background />
                <div className="overlay backdrop-blur-xl w-full min-h-dvh flex flex-col">
                    <Header dashboard={true} avatarUrl={avatarUrl} logOut={logOut} username={username} />
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="main-container flex-1 w-full flex gap-8 justify-evenly items-center px-8 max-xl:flex-col max-xl:py-8 max-xl:overflow-y-scroll"
                    >
                        <div className="dashboard-content-left grid justify-items-center items-center grid-rows-2 gap-6 w-[65%] max-sm:w-full py-5">
                            <motion.div
                            initial={{ position: 'relative', right: 50 }}
                            animate={{ left: 0 }}
                            className="edit-profile w-full h-full bg-white/20 rounded-lg shadow-lg p-8 dark:bg-black/30 backdrop-blur-xl flex flex-col justify-center gap-4"
                            >
                                <h2 className="font-bold text-2xl max-sm:text-xl dark:text-white leading-normal">Editar Perfil</h2>
                                <form action="" onSubmit={e => e.preventDefault()} className="flex flex-col justify-center items-start gap-4 dark:text-white w-full">
                                    <div className="email flex flex-col gap-2 w-full">
                                        <label htmlFor="email" className="font-semibold text-neutral-500 dark:text-white w-max">Email</label>
                                        <div className="input-email relative w-full">
                                            <input type="email" name="email" id="email" value={email} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" />
                                            <Mail className="absolute left-2.5 top-[9px]" />
                                        </div>
                                    </div>
                                    <div className="full_name flex flex-col gap-2 w-full relative">
                                        <label htmlFor="full_name" className="font-semibold text-neutral-500 dark:text-white w-max">Nombre</label>
                                        <div className="input-name relative w-full">
                                            <input type="text" name="full_name" value={fullName} onChange={e => setFullName(e.target.value)} id="full_name" placeholder="Jhon Doe" className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" />
                                            <User className="absolute left-2.5 top-[9px]" />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold" onClick={() => onUpdateInfoUser(email, fullName)}>Guardar</button>
                                </form>
                            </motion.div>
                            <motion.div
                            initial={{ position: 'relative', right: 50 }}
                            animate={{ left: 0 }}
                            className="edit-avatar w-full h-full bg-white/20 rounded-lg shadow-lg p-8 dark:bg-black/30 backdrop-blur-xl flex justify-evenly gap-4 items-center max-sm:flex-col"
                            >
                                <div className="edit-avatar-left-preview flex justify-center w-[50%]">
                                    <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 1 }}
                                    className="avatar-preview size-52 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full max-sm:size-35 max-lg:size-45 cursor-pointer"
                                    onClick={() => {
                                        if (avatarInputRef) {
                                            avatarInputRef.current?.click()
                                        }
                                    }}
                                    >
                                        <img src={avatar ? makeBlobUrl(avatar!) : avatarUrl} alt="user avatar" className="w-full h-full rounded-full object-cover" />
                                    </motion.div>
                                </div>
                                <div className="it-avatar-right-uploads w-full flex justify-center items-center dark:text-white">
                                    <div className="upload-avatar flex flex-col items-start justify-center gap-2">
                                        <label htmlFor="avatar" className="font-semibold text-neutral-500 dark:text-white w-max">Avatar</label>
                                        <input ref={avatarInputRef} type="file" accept="image/png, image/jpeg" name="avatar" id="avatar" className="w-full border dark:border-white/20 border-black/20 outline-0 focus:border-white/20 focus:ring-1 focus:ring-white/20 rounded-md p-2 px-10" onChange={(e) => {
                                            setAvatar(e.target.files?.[0] || null)
                                        }} />
                                        <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-full text-white py-3 cursor-pointer font-semibold" onClick={() => {
                                            if (!avatar) {
                                                showToastMessage("Intente con otra imagen", 'error')
                                                return
                                            }
                                            onUploadPfp(avatar)
                                            retrieveUserPfp()
                                        }}>Guardar</button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="dashboard-content-right flex h-179 max-2xl:h-179 relative w-[35%] max-lg:w-[65%] max-md:w-[95%] max-sm:w-full">
                            <CreatorInfo />
                        </div>
                    </motion.div>
                    <Footer />
                </div>
            </div>
            <style>{`
            @keyframes blob {
            0% {
                transform: translate(0px, 0px) scale(1);
            }
            33% {
                transform: translate(30px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
                transform: translate(0px, 0px) scale(1);
            }
            }
            .animate-blob {
            animation: blob 7s infinite;
            }
            .animation-delay-2000 {
            animation-delay: 2s;
            }
            .animation-delay-4000 {
            animation-delay: 4s;
            }
        `}</style>
        </>
    )
}

export default Home