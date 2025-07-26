import App from '@/App'
import Home from '@/features/dashboard/components/Home'
import RecoveryCard from '@/features/auth/components/RecoveryCard'
import RegisterCard from '@/features/auth/components/RegisterCard'
import NewPassword from '@/features/auth/components/NewPassword'

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