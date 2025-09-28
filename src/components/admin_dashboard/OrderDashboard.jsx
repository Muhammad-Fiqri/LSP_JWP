let order_list = [
    {
        ID_Order: "123125",
        Nama_Pengorder: "Bapak Mulyono",
        Email_Pengorder: "JokowiGanteng123@gmail.com",
        Paket_Yang_Dipilih: "Paket 3",
        Tanggal_Wedding: "69/69/420",
        Pesan: "Halo, saya pesan Paket 3 untuk anak saya Gibran ya."
    },
    {
        ID_Order: "123125",
        Nama_Pengorder: "Bapak Mulyono",
        Email_Pengorder: "JokowiGanteng123@gmail.com",
        Paket_Yang_Dipilih: "Paket 3",
        Tanggal_Wedding: "69/69/420",
        Pesan: "Halo, saya pesan Paket 3 untuk anak saya Gibran ya."
    },
    {
        ID_Order: "123125",
        Nama_Pengorder: "Bapak Mulyono",
        Email_Pengorder: "JokowiGanteng123@gmail.com",
        Paket_Yang_Dipilih: "Paket 3",
        Tanggal_Wedding: "69/69/420",
        Pesan: "Halo, saya pesan Paket 3 untuk anak saya Gibran ya."
    },
]

export default function OrderDashboard() {
    return(
        <div id="OrderDashboard" className="w-[100%] h-[100vh] overflow-y-scroll px-10 pt-5">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Order</h1>

            {
                order_list.map((orders) => {
                    return(
                        <div className="order-cards  grid grid-cols-[2fr_8fr] grid-rows-6 bg-[#D9D9D9] p-5 rounded-[10px] mb-5 space-y-3">
                            <p className="order-id">ID Orderan: </p><p>{orders.ID_Order}</p>
                            <p className="orderer-name">Nama Pengorder: </p><p>{orders.Nama_Pengorder}</p>
                            <p className="orderer-email">Email Pengorder: </p><p>{orders.Email_Pengorder}</p>
                            <p className="chosen-package">Paket Yang Dipilih:</p><p>{orders.Paket_Yang_Dipilih}</p>
                            <p className="wedding-date">Tanggal Wedding:</p><p>{orders.Tanggal_Wedding}</p>
                            <p className="message">Pesan:</p><p>{orders.Pesan}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}