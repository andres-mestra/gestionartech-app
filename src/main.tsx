// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Root } from './screens/Root.tsx'
import ActivosScreen from './screens/Activos.tsx'
import PrestamosScreen from './screens/Prestamos.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/activos',
        element: <ActivosScreen />,
      },
      {
        path: '/prestamos',
        element: <PrestamosScreen />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
