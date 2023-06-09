import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import { RecipeContextProvider } from './context/RecipeContext'
import RootLayout from './routes/RootLayout'
import Recipe from './routes/Recipe'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RecipeContextProvider>
        <RootLayout />
      </RecipeContextProvider>
    ),
    children: [
      {
        path: '/recipe/:ingredientInput',
        element: <Recipe />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
