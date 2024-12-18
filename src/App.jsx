import { createRoutesFromElements, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'

function App() {

  return createRoutesFromElements(
    <>
     <Route path="/" element={<Dashboard />} />
     <Route path="*"  element={<NotFound />} />
    </>
  )
}

export default App
