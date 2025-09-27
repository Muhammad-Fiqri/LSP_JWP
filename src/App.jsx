import LoginForm from './components/LoginForm'
import TopNav from './components/TopNav'
import Home from './components/Home'
import Catalog from './components/Catalog';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
     <TopNav/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm/>}></Route>
      <Route path="/catalog" element={<Catalog/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
