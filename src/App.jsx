//import React from 'react' // Default export, gets the whole thing. We do not need it when using jsx (App.jsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Named export, gets only that element
import Order from "./Order"


const App = () => {
  return (
    <StrictMode>
      <div>
        <h1>Carl's Pizza - Order now!</h1>
        <Order />
      </div>
    </StrictMode>

  )
}

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<App />);
