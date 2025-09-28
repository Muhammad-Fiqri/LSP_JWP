import { Outlet, useNavigate } from "react-router-dom"

export default function TopNav() {
    let navigate = useNavigate();

    return(
        <>
            <div id="TopNav" className="text-2xl h-[10vh] [&>button]:h-[100%] [&>button]:w-[200px] bg-[#9A9A9A] *:hover:bg-[#D9D9D9] shadow-2xl">
                <button onClick={() => {navigate("/")}}>
                    Home
                </button>
                <button onClick={() => {navigate("/catalog")}}>
                    Katalog
                </button>
                <button onClick={() => {navigate("/order")}}>
                    Order
                </button>
                <button onClick={() => {navigate("/login")}} className="float-right">
                    Login
                </button>
            </div>
            <Outlet/>
        </>
    )
}