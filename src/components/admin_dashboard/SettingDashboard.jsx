export default function SettingDashboard() {
    function handleForm(e) {
        e.preventDefault();
    }

    return(
        <div id="SettingDashboard">
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