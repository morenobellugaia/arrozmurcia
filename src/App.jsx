import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ingredients from './pages/Ingredients'
import Cooking from './pages/Cooking'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/cooking" element={<Cooking />} />
      </Routes>
    </Router>
  )
}

export default App
