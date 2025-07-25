type SocialLinkType = {
    socialIcon: React.ReactNode,
    title: string,
    description: string,
    link: string,
    style: string
}

function SocialLink({ link, socialIcon, title, description, style } : SocialLinkType) {
    return (
        <>
            <a href={link} target="_blank">
                <div className="cursor-pointer flex gap-4 items-center bg-neutral-300/50 dark:bg-gray-900/50 p-2 rounded-lg">
                    <div className={style}>
                        {socialIcon}
                    </div>
                    <div className="discord-right dark:text-white flex flex-col justify-between">
                        <h3 className="font-semibold max-sm:text-sm">{title}</h3>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                </div>
            </a>
        </>
    )
}

export default SocialLink