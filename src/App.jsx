import { createRoutesFromElements, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import Readme from './components/Readme'

function App() {

  return createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/readme.md" element={<Readme />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
}

export default App
