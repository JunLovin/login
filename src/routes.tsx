import App from './App'
import Home from './components/Home'
import RecoveryCard from './components/RecoveryCard'
import RegisterCard from './components/RegisterCard'
import NewPassword from './components/NewPassword'

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