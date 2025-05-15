//import React from 'react' // Default export, gets the whole thing. We do not need it when using jsx (App.jsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Named export, gets only that element
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<App />);
