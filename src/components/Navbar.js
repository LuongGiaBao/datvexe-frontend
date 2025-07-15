// src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.removeItem("jwt");
    setUser(null);
    message.success("Đăng xuất thành công");
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-2 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center p-2">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <h1 className="font-bold text-lg text-gray-700 ml-2">BusTicket</h1>
      </Link>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-4 items-center text-sm md:text-base font-medium text-[#64748B] ">
        <li>
          <Link to="/" className="hover:text-pink-600">
            Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/my-tickets" className="hover:text-pink-600">
            Vé
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-pink-600">
            Liên hệ
          </Link>
        </li>
        <li className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-600 text-lg"
                  />
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg p-2 text-sm">
                  <div className="border-b pb-2 mb-2">
                    <div className="font-semibold">
                      {user.username || "Người dùng"}
                    </div>
                    {user.email && (
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={toggleDropdown}
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={toggleDropdown}
                  >
                    Đơn đặt vé
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 hover:bg-red-100 rounded text-red-600 mt-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-pink-600"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Đăng nhập / Đăng ký</span>
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 text-xl"
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-40 md:hidden">
          <ul className="space-y-3 text-sm font-medium text-gray-700">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/my-tickets" onClick={closeMobileMenu}>
                Vé
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu}>
                Liên hệ
              </Link>
            </li>
            <li className="border-t pt-3">
              {user ? (
                <>
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="block mt-2"
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/my-tickets"
                    onClick={closeMobileMenu}
                    className="block mt-1"
                  >
                    Đơn đặt vé
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block mt-2 text-red-600"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Đăng nhập / Đăng ký</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
