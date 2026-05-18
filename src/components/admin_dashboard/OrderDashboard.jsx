import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function OrderDashboard() {

    const [orders,setOrders] = useState([])

    const getOrders = async () => {
        console.log("retrieving orders from database..")
        try {
            const res = await axios.get('http://localhost:3000/orders');

            if(res.status == 200) {
                setOrders(res.data)
            }
        } catch(err) {
            alert(err)
        }
    }
    
    const has_run  = useRef(false);
    useEffect(() => {
        if (has_run.current) return
        getOrders()
        has_run.current = true
    },[])

    const handleApproval = async (e,order_id) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("order_id",order_id);

        try {
            const res = await axios.put('http://localhost:3000/order-status', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(res.status == 200) {
                alert(res.data.message)
                getOrders()
            }
        } catch(err) {
            alert(err)
        }
    }

    return(
        <div id="OrderDashboard" className="w-[100%] h-[100vh] overflow-y-scroll px-10 pt-5">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Order</h1>

            {
                orders.length != 0 ?
                orders.map((order) => {
                    return(
                        <div className="order-cards  grid grid-cols-[2fr_8fr] grid-rows-7 bg-[#D9D9D9] p-5 rounded-[10px] mb-5 space-y-3">
                            <p className="order-id">ID Orderan: </p><p>{order.order_id}</p>
                            <p className="orderer-name">Nama Pengorder: </p><p>{order.name}</p>
                            <p className="orderer-email">Email Pengorder: </p><p>{order.email}</p>
                            <p className="chosen-package">ID Paket Yang Dipilih:</p><p>{order.package_id}</p>
                            <p className="wedding-date">Tanggal Wedding:</p><p>{order.wedding_date}</p>
                            <p className="message">Pesan:</p><p>{order.message}</p>
                            <p className="message">Status:</p><p>{order.status}</p>
                            <button className="approval-buttons bg-slate-500 hover:bg-slate-400 p-3 text-white rounded-lg" onClick={(e) => {handleApproval(e,order.order_id)}}>Setujui</button>
                        </div>
                    )
                })
                :
                <p>Tidak Ada Orderan</p>
            }
        </div>
    );
}