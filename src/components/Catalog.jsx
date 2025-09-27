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
  
  // 2. Create the reusable PackageCard component
  const PackageCard = ({ packageItem }) => {
    return (
      <div id={`package-card-${packageItem.id}`} className="bg-[#D9D9D9] h-[80vh]">
        <h1 className="text-center text-2xl py-[10px]">{packageItem.title}</h1>
        <img
          src={packageItem.imageSrc}
          alt={`${packageItem.title} media`}
          className="w-[93%] mx-[10px] h-[50%] object-cover rounded-[10px]" // Added object-cover for better image handling
        ></img>
        <div id="package-desc" className="pl-[30px] pt-[10px]">
          <ul className="list-disc">
            {packageItem.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div id="price" className="p-[30px] text-center text-3xl font-bold">{packageItem.price}</div>
      </div>
    );
  };

    return(
        <div id="Catalog" className="grid grid-cols-3 w-[100vw] gap-[30px] px-[30px] py-[20px] [&>div]:rounded-[10px]">
            {packageData.map((packageItem) => (
                    <PackageCard key={packageItem.id} packageItem={packageItem} />
                ))}
        </div>
    );
}