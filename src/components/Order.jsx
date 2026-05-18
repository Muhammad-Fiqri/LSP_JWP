import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Order() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        package: 'Paket 1',
        message: '',
        weddingDate: ''
    });

    const [packageOptions, setPackageOptions] = useState(["Tak Ada Paket Ditemukan"])

    const getAllPackage = async () => {
        try {
            const res = await axios.get('http://localhost:3000/allCatalogues');
            if(res.status == 200) {
                alert("All Package Retrieved!")
                const package_data = res.data
                const package_id_only_array = package_data.map(item => item.package_id)
                setPackageOptions(package_id_only_array);
                setFormData(prev => ({ ...prev, ["package"]: package_id_only_array[0]}))
            }
        } catch(err) {
            alert(err)
        }
    }
    
    const is_rendered = useRef(false);
    useEffect(() => {
        if (is_rendered.current) return
        getAllPackage();
        is_rendered.current = true
    },[packageOptions])

    useEffect(() => {
        console.log(formData);
    },[formData])
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            fData.append(key, value);
        });

        try {
            const res = await axios.post('http://localhost:3000/orders', formData, {
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
    };

    return (
        <div id="Order" className="w-[100vw] h-[100vh] overflow-y-scroll">
            <div id='Form-Box' className="w-[90vw] mt-[2.5vw] bg-[#D9D9D9] rounded-[10px] shadow-2xl m-[auto]">
                <h2 className="text-xl font-bold text-center py-4">
                    Pesan Paket Wedding Organizer JeWePe
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 p-10">
                    <div>
                        <label htmlFor="name" className="block text-sm">
                            Nama:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-[10px] p-3 bg-[#9A9A9A]"
                            placeholder=""
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm">
                            E-mail:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-[10px] p-3 bg-[#9A9A9A]"
                            placeholder=""
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="package" className="block text-sm">
                            ID Paket yang dipilih:
                        </label>
                        <select
                            id="package"
                            value={formData.package}
                            onChange={handleChange}
                            className="appearance-none mt-1 block w-full rounded-[10px] p-3 bg-[#9A9A9A]"
                            required
                        >
                            {packageOptions.map(pkg => (
                                <option key={pkg} value={pkg}>{pkg}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm">
                            Pesan:
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="appearance-none mt-1 block w-full rounded-[10px] p-3 bg-[#9A9A9A]"
                            placeholder=""
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="weddingDate" className="block text-sm">
                            Tanggal Wedding:
                        </label>
                        <input
                            type="date"
                            id="weddingDate"
                            value={formData.weddingDate}
                            onChange={handleChange}
                            className="appearance-none mt-1 block w-full rounded-[10px] p-3 bg-[#9A9A9A]"
                            placeholder="DD/MM/YYYY"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-white text-gray-800 font-semibold rounded-md border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition duration-150"
                    >
                        Kirim
                    </button>
                </form>
            </div>
        </div>
    )
}
