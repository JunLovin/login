import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes'
import './styles/index.css'
import { ToastProvider } from './hooks/useToast'
import { LoadingProvider } from './hooks/useLoading'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider> 
    </LoadingProvider>
  </StrictMode>,
)
