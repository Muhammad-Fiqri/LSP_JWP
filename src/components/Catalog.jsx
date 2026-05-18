import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Catalog() {

    // 1. Define the data for the three packages
    const packageData = [
      {
        id: 1,
        title: "Paket 1",
        price: "Rp. 69.420",
        imageSrc: "/Post Media Example.png",
        features: ["Tenda", "Foto Prewedding", "Konsumsi", "Dekorasi"]
      },
      {
        id: 2,
        title: "Paket 2",
        price: "Rp. 99.999",
        imageSrc: "/Post Media Example.png", // Assuming the same image for this example
        features: ["Tenda VIP", "Foto Prewedding & Resepsi", "Konsumsi Premium", "Dekorasi Mewah", "Sound System"]
      },
      {
        id: 3,
        title: "Paket 3",
        price: "Rp. 120.000",
        imageSrc: "/Post Media Example.png", // Assuming the same image for this example
        features: ["Tenda VVIP", "All-day Photo/Video", "Catering Eksklusif", "Dekorasi Artistik", "Entertainment"]
      },
    ];

    const [packages,setPackages] = useState([])

    const getPackageData = async () => {
      try {
          const res = await axios.get('http://localhost:3000/allCatalogues');
          if(res.status == 200) {
              alert("All Package Data Retrieved");
              setPackages(res.data);
          }
      } catch(err) {
          alert(err)
      }
    }

    const has_run = useRef(false);
    useEffect(()=>{
      if (has_run.current) return
      getPackageData()
      has_run.current = true
    },[packages]);

    useEffect(() => {console.log(packages)},[packages]);
  
    // 2. Create the reusable PackageCard component
    const PackageCard = ({ package_item }) => {
      return (
        <div id={`package-card-${package_item.package_id}`} className="bg-[#D9D9D9] h-[80vh] grid grid-rows-[1fr_3fr_3fr_1fr]">
          <h1 className="text-center text-2xl py-[10px]">{package_item.package_name}</h1>
          <img
            src={`http://localhost:3000/uploads/${package_item.image}`}
            alt={`${package_item.package_name} media`}
            className="w-[55vh] h-[max-content] mx-[10px] h-[50%] object-cover rounded-[10px]" // Added object-cover for better image handling
          ></img>
          <div id="package-desc" className="ml-[30px] mt-[10px] overflow-y-scroll overflow-x-hidden">
              <p>ID Paket: {package_item.package_id}</p>
              <p className="h-[100%] overflow-y-hidden">{package_item.description} dan berbagai hal lainnya</p>
          </div>
          <div id="price" className="p-[30px] text-center text-3xl font-bold">{package_item.price}</div>
        </div>
      );
    };

    return(
        <div id="Catalog" className="grid grid-cols-3 w-[100vw] gap-[30px] px-[30px] py-[20px] [&>div]:rounded-[10px]">
            {packages.map((package_item) => (
                    <PackageCard key={package_item.package_id} package_item={package_item} className="shadow-2xl"/>
                ))}
        </div>
    );
}