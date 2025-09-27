export default function CatalogDashboard() {
    function handleForm(e) {
        e.preventDefault()
    }

    return(
        <div id="catalog-dashboard" className="w-[100%] h-[100vh] p-[25px] overflow-y-scroll">
            <h1 className="text-5xl text-center font-bold pb-[30px]">Manajemen Katalog</h1>
            
            <div className="pb-[20px]">
                <label htmlFor="mode">Mode:</label>
                <select name="mode" id="mode" className="w-[100%] bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                    <option value="create">Create</option>
                    <option value="read">Read</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                </select>
            </div>

            <form onSubmit={handleForm} id="form-package" className="bg-[#D9D9D9] rounded-[10px] p-[20px]">
                <div>
                    <label htmlFor="ID-package">ID Paket:</label>
                    <input type="text" name="ID-package" id="ID-package" className="w-full bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <div>
                    <label htmlFor="name-package">Nama Paket</label>
                    <input type="text" name="name-package" id="name-package" className="w-full p-2 bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <div>
                    <label htmlFor="media-post">Media Post</label>
                    <input type="file" name="media-post" id="media-post" accept="image/*" className="hidden" />
                    <label htmlFor="media-post" className="block w-full p-2 text-center cursor-pointer bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]">
                        Upload Gambar
                    </label>
                </div>

                <div>
                    <label htmlFor="description-package">Deskripsi Paket</label>
                    <textarea 
                        name="description-package" 
                        id="description-package" 
                        rows="5" 
                        className="w-full p-2 border bg-[#9A9A9A] rounded-[10px] pl-[10px]"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="price-package">Harga Paket</label>
                    <input type="number" name="price-package" id="price-package" className="w-full p-2 bg-[#9A9A9A] rounded-[10px] h-[7vh] pl-[10px]" />
                </div>

                <button type="submit" className="w-full p-2 text-black bg-[#FFFFFF] rounded-[10px] h-[7vh] mt-[10px]">
                    Submit
                </button>
            </form>
        </div>
    );
}