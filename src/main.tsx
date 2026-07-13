import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import FeaturesPage from './pages/FeaturesPage.tsx'
import StandalonePage from './pages/StandalonePage.tsx'
import CloudPage from './pages/CloudPage.tsx'
import CustomPage from './pages/CustomPage.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/features', element: <FeaturesPage /> },
  { path: '/standalone', element: <StandalonePage /> },
  { path: '/cloud', element: <CloudPage /> },
  { path: '/custom', element: <CustomPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
