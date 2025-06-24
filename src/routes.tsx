import App from './App'
import RecoveryCard from './components/RecoveryCard'
import RegisterCard from './components/RegisterCard'

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
                element: <RecoveryCard />
            }
        ]
    }
]

export default routes