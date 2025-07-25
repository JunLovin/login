import App from './App'
import Home from './pages/Home'
import RecoveryCard from './pages/RecoveryCard'
import RegisterCard from './pages/RegisterCard'
import NewPassword from './pages/NewPassword'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/register',
                element: <RegisterCard />
            },
            {
                path: '/recovery',
                element: <RecoveryCard />,
            },
            {
                path: '/new-password',
                element: <NewPassword />
            }
        ]
    },
    {
        path: '/home',
        element: <Home />
    }
]

export default routes