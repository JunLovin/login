import Footer from './components/Footer'
import Header from './components/Header'
import LoginCard from './components/LoginCard'
import { Outlet, useLocation } from 'react-router'

function App() {
  const location = useLocation()
  const home = location.pathname === '/'

  return (
    <>
      <main className="w-full min-h-dvh overflow-hidden flex flex-col relative">
        <div className="ball absolute size-90 dark:bg-yellow-500 bg-yellow-300 top-0 right-0 rounded-full animate-blob transition-all duration-300"></div>
        <div className="ball absolute size-90 dark:bg-green-500 bg-green-300 bottom-0 right-20 rounded-full animate-blob animation-delay-5000 transition-all duration-300"></div>
        <div className="ball absolute size-90 dark:bg-pink-500 bg-pink-300 bottom-0 left-40 rounded-full animate-blob animation-delay-2000 transition-all duration-300"></div>
        <div className="ball absolute size-100 dark:bg-purple-500 bg-purple-300 top-20 left-20 rounded-full animate-blob animation-delay-4000 transition-all duration-300"></div>
        <div className="overlay backdrop-blur-xl w-full min-h-dvh flex flex-col">
          <section className="header-container">
            <Header />
          </section>
          <section className="main-container w-full min-h-dvh flex justify-center items-center max-sm:px-4">
            {home ? (
              <LoginCard />
            ) : (
              <Outlet/>
            )}
          </section>
          <section className="footer-container">
            <Footer />
          </section>
        </div>
      </main>
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

export default App
