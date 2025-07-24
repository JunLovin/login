function Background() {
    return (
        <>
            <div className="ball absolute size-90 dark:bg-yellow-500 bg-yellow-300 top-0 right-0 rounded-full animate-blob transition-all duration-300"></div>
            <div className="ball absolute size-90 dark:bg-green-500 bg-green-300 bottom-0 right-20 rounded-full animate-blob animation-delay-5000 transition-all duration-300"></div>
            <div className="ball absolute size-90 dark:bg-pink-500 bg-pink-300 bottom-0 left-40 rounded-full animate-blob animation-delay-2000 transition-all duration-300"></div>
            <div className="ball absolute size-100 dark:bg-purple-500 bg-purple-300 top-20 left-20 rounded-full animate-blob animation-delay-4000 transition-all duration-300"></div>
        </>
    )
}

export default Background