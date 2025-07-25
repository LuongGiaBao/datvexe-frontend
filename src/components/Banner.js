import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button, Form, message } from "antd";
import dayjs from "dayjs";
import { fetchAllLocations } from "../api/LocationApi";
import { fetchAllSchedules } from "../api/ScheduleApi"; // Giả định bạn đã có hàm này
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
const TripSearchPage = () => {
  const [locations, setLocations] = useState([]); // Danh sách các địa điểm
  const [departureId, setDepartureId] = useState(""); // ID địa điểm khởi hành
  const [arrivalId, setArrivalId] = useState(""); // ID địa điểm đến
  const [date, setDate] = useState(null); // Ngày đi
  const [schedules, setSchedules] = useState([]); // Danh sách lịch trình

  const navigate = useNavigate();

  useEffect(() => {
    loadLocations(); // Gọi hàm để tải địa điểm
    fetchSchedules(); // Gọi hàm để tải lịch trình
  }, []);

  const loadLocations = async () => {
    try {
      const locationsData = await fetchAllLocations();
      setLocations(locationsData.data);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetchAllSchedules(); // Lấy tất cả lịch trình

      if (response && response.data) {
        // Log từng lịch trình để kiểm tra

        setSchedules(response.data); // Lưu vào state nếu có dữ liệu hợp lệ
      } else {
        console.error("Dữ liệu lịch trình không hợp lệ:", response);
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch trình:", error);
    }
  };

  const onSearch = async () => {
    if (!departureId || !arrivalId || !date) {
      message.error("Vui lòng nhập đầy đủ điểm đi, điểm đến và ngày đi.");
      return;
    }
    if (departureId === arrivalId) {
      message.error("Điểm đi và điểm đến không được trùng nhau.");
      return;
    }

    try {
      if (!Array.isArray(schedules) || schedules.length === 0) {
        message.error("Không có lịch trình nào để tìm kiếm.");
        return;
      }

      const selectedDate = dayjs(date).startOf("day");

      const tripData = schedules
        .map((schedule) => {
          const routeData = schedule.attributes.MaTuyen.data.attributes;
          const departureLocation = routeData.departure_location_id?.data;
          const arrivalLocation = routeData.arrival_location_id?.data;

          if (!departureLocation || !arrivalLocation) return null;

          const scheduleDate = dayjs(schedule.attributes.ngaydi).startOf("day");
          if (!scheduleDate.isSame(selectedDate, "day")) return null;

          return {
            scheduleId: schedule.id,
            departureId: departureLocation.id,
            departureName: departureLocation.attributes.name,
            arrivalId: arrivalLocation.id,
            arrivalName: arrivalLocation.attributes.name,
            formattedTime: schedule.attributes.ngaydi,
            pickupPoint: routeData.MaDiemDon.data.attributes.location,
            dropOffPoint: routeData.MaDiemTra.data.attributes.location,
            price: routeData.detai_prices.data[0]?.attributes.Gia,
            expectedTime: routeData.ExpectedTime,
            totalSeats: routeData.totalSeats,
            status: schedule.attributes.status,
          };
        })
        .filter(
          (item) =>
            item !== null &&
            String(item.departureId) === String(departureId) &&
            String(item.arrivalId) === String(arrivalId) &&
            item.status === "Hoạt động"
        );

      if (tripData.length > 0) {
        navigate(`/search-results/${departureId}/${arrivalId}`, {
          state: { schedules: tripData },
        });
      } else {
        message.info("Không tìm thấy lịch trình nào phù hợp.");
      }
    } catch (error) {
      message.error("Lỗi khi tìm kiếm lịch trình.");
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="relative">
      {/* Banner Background */}
      <div
        className="h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Overlay */}

        {/* Text Overlay */}
        <div className="relative z-10 text-center text-orange-700 px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Đặt vé xe khách trực tuyến
          </h1>
          <p className="text-2xl text-green-500 mt-4">
            Nhanh chóng, tiện lợi, an toàn với hàng ngàn chuyến xe mỗi ngày
          </p>
        </div>
      </div>

      {/* Tìm chuyến xe - Floating Box */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative -top-16 bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-center text-xl font-semibold mb-4">
            Tìm chuyến xe
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Điểm đi */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label className="mb-1 font-medium">Điểm đi</label>
              <select
                onChange={(e) => setDepartureId(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">Chọn điểm đi</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.attributes.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Điểm đến */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label className="mb-1 font-medium">Điểm đến</label>
              <select
                onChange={(e) => setArrivalId(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">Chọn điểm đến</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.attributes.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ngày đi */}
            <div className="flex flex-col w-full lg:w-1/4">
              <label className="mb-1 font-medium">Ngày đi</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>

            {/* Button */}
            <div className="w-full lg:w-auto">
              <button
                onClick={onSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full lg:w-auto"
              >
                Tìm chuyến
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSearchPage;
