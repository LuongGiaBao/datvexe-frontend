import React from "react";
import { FaTwitter, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#1c2431] text-white py-10 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cột 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">BusTicket</h3>
          <p className="text-sm mb-4 text-[#94A3B8]">
            Nền tảng đặt vé xe khách hàng đầu Việt Nam
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Dịch vụ</h3>
          <ul className="text-sm space-y-1 text-[#94A3B8]">
            <li>Đặt vé xe khách</li>
            <li>Thuê xe du lịch</li>
            <li>Vận chuyển hàng hóa</li>
            <li>Bảo hiểm xe</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Hỗ trợ</h3>
          <ul className="text-sm space-y-1 text-[#94A3B8]">
            <li>Trung tâm trợ giúp</li>
            <li>Chính sách hoàn vé</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Liên hệ</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2 text-[#94A3B8]">
              <FaPhoneAlt /> 1900 1234
            </li>
            <li className="flex items-center gap-2 text-[#94A3B8]">
              <MdEmail /> support@busticket.vn
            </li>
            <li className="flex items-center gap-2 text-[#94A3B8]">
              <FaMapMarkerAlt /> 123 Đường ABC, Quận 1, TP.HCM
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
        © 2024 BusTicket. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
