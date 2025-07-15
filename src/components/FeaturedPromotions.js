// // src/components/FeaturedPromotions.js
// import React from 'react';
// import Slider from 'react-slick';
// import '../assets/FeaturedPromotions.css'; // Ensure this CSS file exists and is correctly imported
// import promotion from '../assets/image/promotional_image_bus_ticket_booking.png';
// import promotion2 from '../assets/image/promotion2.webp';
// import promotion3 from '../assets/image/promotion.webp';
// const FeaturedPromotions = () => {
//     const promotions = [
//       {
//         image: promotion,
//       },
//       {
//         image: promotion2,
//       },
//       {
//         image: promotion3,
//       },
//     ];

//     return (
//       <div className="featured-promotions">
//         <h2>Khuyến Mãi Nổi Bật</h2>
//         <div className="promotions-container">
//           {promotions.map((promo, index) => (
//             <div key={index} className="promo-card">
//               <img src={promo.image} alt={`Promotion ${index + 1}`} className="promo-image" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
// export default FeaturedPromotions;

import React from "react";

const promotions = [
  {
    title: "Giảm 20%",
    description: "Cho khách hàng mới đặt vé lần đầu",
    badge: "HOT",
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Mua 2 tặng 1",
    description: "Áp dụng cho nhóm từ 3 người trở lên",
    badge: "NEW",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Cashback 50k",
    description: "Cho đơn hàng từ 500k trở lên",
    badge: "VIP",
    color: "from-purple-500 to-indigo-500",
  },
];

const FeaturedPromotions = () => {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 bg-white">
      <h1 className="text-2xl font-bold text-center mb-8">Khuyến mãi hot</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl text-white bg-gradient-to-r ${promo.color} relative shadow-md`}
          >
            <span className="absolute top-3 right-3 bg-white text-xs text-gray-800 px-2 py-0.5 rounded-full font-semibold">
              {promo.badge}
            </span>
            <h2 className="text-xl font-bold mb-2">{promo.title}</h2>
            <p className="mb-4">{promo.description}</p>
            <button className="bg-white text-black rounded-md px-4 py-2 font-medium hover:bg-gray-100 transition">
              Sử dụng ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPromotions;
