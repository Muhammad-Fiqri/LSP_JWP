import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    let navigate = useNavigate();

    async function handleForm(e) {
        e.preventDefault();

        let formData = {
            email: email,
            password: password
        }

        let jsonRequest = JSON.stringify(formData);

        try {
            const res = await axios.post('http://localhost:3000/login', jsonRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(res) {
                //create cookie
                let d = new Date()
                document.cookie = "username=fiqri login_date=" + d.getTime();
                navigate("/admin/catalog")
            } else {
                alert("your email and password is wrong, try again!")
            }
        } catch(err) {
            alert(err)
        }
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