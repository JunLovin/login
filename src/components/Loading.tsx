import { motion } from 'framer-motion'

function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-dvh w-dvw bg-gradient-to-br from-indigo-50 to-blue-500/80 backdrop-blur-md">
            <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 shadow-2xl flex items-center justify-center mb-8"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            >
                <motion.div
                    className="w-12 h-12 border-4 border-t-indigo-100 border-b-indigo-400 border-x-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ ease: 'linear', duration: 1, repeat: Infinity }}
                />
            </motion.div>
            <motion.span
                className="text-xl font-semibold text-indigo-700 drop-shadow-lg tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0.7, 1], y: [10, 0, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
                Cargando...
            </motion.span>
        </div>
    )
}

export default Loading