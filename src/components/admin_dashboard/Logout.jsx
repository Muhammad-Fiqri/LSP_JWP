import { useNavigate } from "react-router-dom"

export default function Logout() {
    let navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate("/login")
    }

    return(
        <div id="Logout" className="bg-[#D9D9D9] m-5 p-5 rounded-[10px] grid grid-rows-[9fr_1fr]">
            <h1 className="font-bold text-3xl text-center my-auto">Yakin ingin Logout? anda hanya bisa mengakses Dashboard ini hanya jika anda mengigat email dan password anda!</h1>
            <button onClick={handleLogout} className="bg-red-600 text-white w-full rounded-[10px]">Logout</button>
        </div>
    );
}