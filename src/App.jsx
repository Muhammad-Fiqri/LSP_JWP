import LoginForm from './LoginForm'
import TopNav from './TopNav'
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
     <TopNav/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
