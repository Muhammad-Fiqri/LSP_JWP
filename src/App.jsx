import LoginForm from './components/LoginForm'
import TopNav from './components/TopNav'
import Home from './components/Home'
import Catalog from './components/Catalog';
import SideNav from './components/admin_dashboard/SideNav';
import CatalogDashboard from './components/admin_dashboard/CatalogDashboard';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<TopNav/>}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm/>}></Route>
        <Route path="catalog" element={<Catalog/>}></Route>
      </Route>
      <Route path="admin" element={<SideNav/>}>
          <Route path="catalog" element={<CatalogDashboard/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
