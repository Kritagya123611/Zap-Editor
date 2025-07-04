import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FlowEdit from './FlowEdit.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlowEdit/>
  </StrictMode>,
)
