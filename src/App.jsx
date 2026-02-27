import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ingredients from './pages/Ingredients'
import Cooking from './pages/Cooking'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ingredients" element={<Ingredients />} />
      <Route path="cooking" element={<Cooking />} />
    </Routes>
  )
}

export default App