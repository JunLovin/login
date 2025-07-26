import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LoginCard from '@/features/auth/components/LoginCard'
import { Outlet, useLocation } from 'react-router'

function App() {
  const location = useLocation()
  const home = location.pathname === '/'

  return (
    <>
        <main className="w-full min-h-dvh overflow-hidden flex flex-col relative">
          <Background />
          <div className="overlay backdrop-blur-xl w-full min-h-dvh flex flex-col">
            <section className="header-container">
              <Header dashboard={false} />
            </section>
            <section className="main-container w-full h-[96dvh] flex justify-center items-center max-sm:px-4">
              {home ? (
                <LoginCard />
              ) : (
                <Outlet />
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
