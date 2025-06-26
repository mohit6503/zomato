import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
function App() {

  return (
    <>
     <h1>hello</h1>
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
