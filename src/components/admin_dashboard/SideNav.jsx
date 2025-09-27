import { Outlet, useNavigate } from "react-router-dom"

let button_list = [
    {
        name: "Post",
        link: "/admin/post"
    },
    {
        name: "Katalog",
        link: "/admin/catalog"
    },
    {
        name: "Order",
        link: "/admin/order"
    },
    {
        name: "Profile",
        link: "/admin/profile"
    },
    {
        name: "Setting",
        link: "/admin/setting"
    },
    {
        name: "Logout",
        link: "/admin/logout"
    }
]


export default function SideNav() {
    let navigate = useNavigate();

    return(
        <div className="grid grid-cols-[1fr_9fr]">
            <div id="side-nav" className="h-[100vh] w-[100%] bg-[#9A9A9A]">
                {
                    button_list.map((item) => {
                        return(<button onClick={() => {navigate(item.link)}} className="w-[10vw] h-[50px] hover:bg-[#D9D9D9] text-left pl-[15px]">{item.name}</button>);
                    })
                }
            </div>
            <Outlet/>
        </div>
    );
}