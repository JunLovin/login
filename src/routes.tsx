import App from './App'
import Home from './components/Home'
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
    },
    {
        path: '/home',
        element: <Home />
    }
]

export default routes