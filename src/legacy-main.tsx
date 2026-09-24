import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LegacyApp from './LegacyApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegacyApp />
  </StrictMode>,
)

