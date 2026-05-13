import { useState, useEffect } from "react";
import axios from "axios";


export default function CatalogDashboard() {
    const [mode, setMode] = useState("create");
    const [id_package, setId_package] = useState("");
    const [name_package, setName_package] = useState("");
    const [media_post, setMedia_post] = useState();
    const [description_package, setDescription_package] = useState("");
    const [price_package, setPrice_package] = useState("");

    useEffect(() => {
        console.log(mode);
        console.log(id_package);
        console.log(name_package);
        console.log(media_post);
        console.log(description_package);
        console.log(price_package);
    }, [mode, id_package, name_package, media_post, description_package, price_package]);

    async function handleForm(e) {
        e.preventDefault()

        const formData = new FormData();
        switch(mode) {
            case "create":
                if (media_post == undefined) {
                    alert("Media Post must not be empty!")
                    return
                }
                formData.append('mode', mode);
                formData.append('id_package', id_package);
                formData.append('name_package', name_package);
                formData.append('media_post', media_post);
                formData.append('description_package', description_package);
                formData.append('price_package', price_package);

                try {
                    const res = await axios.post('http://localhost:3000/catalogues', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
        
                    if(res.status == 200) {
                        alert(res.data.message)
                    }
                } catch(err) {
                    alert(err)
                }

                break;
        }
    }

    return(
        <div id="catalog-dashboard" className="w-[100%] h-[100vh] p-[25px] overflow-y-scroll">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Katalog</h1>
            
            <div className="pb-[20px]">
                <label htmlFor="mode">Mode:</label>
                <select onChange={(e) => setMode(e.target.value)} name="mode" id="mode" className="w-[100%] bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                    <option value="create">Create</option>
                    <option value="read">Read</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                </select>
            </div>

            <form onSubmit={handleForm} id="form-package" className="bg-[#D9D9D9] rounded-[10px] p-[20px]">
                <div>
                    <label htmlFor="ID-package">ID Paket:</label>
                    <input onChange={(e) => setId_package(e.target.value)} disabled={mode == "create" ? true : false} placeholder={mode == "create" ? "ID Catalogue tidak di perlukan saat mode create" : "Gunakan ID Catalogue untuk memilih post yang ingin di edit"} type="text" name="ID-package" id="ID-package" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <div>
                    <label htmlFor="name-package">Nama Paket</label>
                    <input onChange={(e) => setName_package(e.target.value)} type="text" name="name-package" id="name-package" className="w-full p-2 bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <div>
                    <label htmlFor="media-post">Media Post</label>
                    <input onChange={(e) => setMedia_post(e.target.files[0])} type="file" name="media-post" id="media-post" accept="image/*" className="hidden" />
                    <label htmlFor="media-post" className="block w-full p-2 text-center cursor-pointer bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                        Upload Gambar
                    </label>
                </div>

                <div>
                    <label htmlFor="description-package">Deskripsi Paket</label>
                    <textarea 
                        onChange={(e) => setDescription_package(e.target.value)}
                        name="description-package" 
                        id="description-package" 
                        rows="5" 
                        className="w-full p-2 border bg-[#9A9A9A] rounded-[10px] pl-[10px]"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="price-package">Harga Paket</label>
                    <input onChange={(e) => setPrice_package(e.target.value)} type="number" name="price-package" id="price-package" className="w-full p-2 bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <button type="submit" className="w-full p-2 text-black bg-[#FFFFFF] rounded-[10px] h-[7vh] mt-[10px]">
                    Submit
                </button>
            </form>
        </div>
    );
}