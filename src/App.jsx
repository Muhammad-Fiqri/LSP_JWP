import LoginForm from './components/LoginForm'
import TopNav from './components/TopNav'
import Home from './components/Home'
import Catalog from './components/Catalog';
import Order from './components/Order';
import SideNav from './components/admin_dashboard/SideNav';
import CatalogDashboard from './components/admin_dashboard/CatalogDashboard';
import PostDashboard from './components/admin_dashboard/PostDashboard';
import OrderDashboard from './components/admin_dashboard/OrderDashboard';
import ProfileDashboard from './components/admin_dashboard/ProfileDashboard';
import SettingDashboard from './components/admin_dashboard/SettingDashboard';
import Logout from './components/admin_dashboard/Logout';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<TopNav/>}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm/>}></Route>
        <Route path="catalog" element={<Catalog/>}></Route>
        <Route path="order" element={<Order/>}></Route>
      </Route>
      <Route path="admin" element={<SideNav/>}>
          <Route path="catalog" element={<CatalogDashboard/>}></Route>
          <Route path="post" element={<PostDashboard/>}></Route>
          <Route path="order" element={<OrderDashboard/>}></Route>
          <Route path="profile" element={<ProfileDashboard/>}></Route>
          <Route path="setting" element={<SettingDashboard/>}></Route>
          <Route path="logout" element={<Logout/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
