import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './utilities/Router'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AppProvider } from './utilities/Context';



createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </AppProvider>
  
)
