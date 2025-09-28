import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    let navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        navigate("/admin/catalog")
    }

    return(
        <div id="LoginForm" className="w-[60%] h-[100%] mx-auto mt-[30px] bg-[#D9D9D9] rounded-[10px] shadow-2xl">
            <form onSubmit={handleForm} className="flex flex-col p-[30px]">
                <h1 className="text-3xl text-center">Login</h1>

                <label htmlFor="email" className="mt-[30px]">E-mail:</label>
                <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="bg-[#9A9A9A] rounded-[10px] h-[7vh] p-[10px]"/>

                <label htmlFor="password" className="mt-[30px]">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="bg-[#9A9A9A] rounded-[10px] h-[7vh] p-[10px]"/>

                <input type="Submit" value="Submit" className="bg-[#FFFFFF] h-[7vh] rounded-[10px] mt-[30px]"></input>
            </form>
        </div>
    );
}