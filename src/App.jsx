//import React from 'react' // Default export, gets the whole thing. We do not need it when using jsx (App.jsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Named export, gets only that element
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<App />);
