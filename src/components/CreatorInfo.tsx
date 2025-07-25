import { motion } from 'framer-motion'
import { creatorSocials } from '../utils/utils'
import SocialLink from './SocialLink'

function CreatorInfo() {
    return (
        <>
            <motion.div
                initial={{ position: 'relative', left: 50 }}
                animate={{ left: 0 }}
                className="creator-info w-full rounded-md h-full bg-white/50 dark:bg-black/30 backdrop-blur-xl p-8 shadow-xl max-xl:h-120"
            >
                <h2 className="dark:text-white font-bold text-2xl max-sm:text-xl leading-normal mb-4">Información del creador</h2>
                <div className="social-networks flex flex-col gap-2">
                    {creatorSocials.map((social, i) => {
                        return (
                            <SocialLink link={social.link} socialIcon={social.socialIcon} title={social.title} description={social.description} style={social.style} key={i} />
                        )
                    })}
                </div>
            </motion.div>
            <button className="bg-black/80 text-white h-12 w-[80%] left-1/2 -translate-x-1/2 absolute bottom-4 rounded-md cursor-pointer" onClick={() => window.open('https://github.com/junlovin/login', '_blank')}>Ver Repositorio</button>
        </>
    )
}

export default CreatorInfo