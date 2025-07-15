import React, { useState } from "react";
import "../assets/AdminLoginPage.css";
import backgroundImage from "../assets/image/banner2.jpg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { loginAdminUser } from "../api/AdminUserApi";
import { apiClient } from "../services/apiservices";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // 👉 trạng thái đang quên mật khẩu
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { jwt } = await loginAdminUser(formData.email, formData.password);
      localStorage.setItem("token", jwt);

      const res = await apiClient.get("/users/me?populate=role");
      const user = res.data;
      localStorage.setItem("adminName", user.username);

      const role = user.role?.type || "";
      if (role !== "adminstaff") {
        message.error("Tài khoản không phải tài khoản admin.");
        return;
      }

      if (!user.confirmed) {
        message.warning("Tài khoản chưa được xác nhận.");
        return;
      }

      message.success(`Đăng nhập thành công! Xin chào, ${user.username}`);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      const status = error.response?.status;
      const msg =
        status === 401
          ? "Email hoặc mật khẩu không đúng."
          : status === 403
          ? "Bạn không có quyền truy cập."
          : status === 500
          ? "Lỗi hệ thống. Vui lòng thử lại sau."
          : error.response?.data?.error?.message || "Đăng nhập thất bại.";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gửi yêu cầu quên mật khẩu
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post("/auth/forgot-password", { email: formData.email });
      message.success(
        "Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email."
      );
      setIsForgotPassword(false); // trở lại form login
    } catch (error) {
      const errMsg =
        error.response?.data?.error?.message ||
        "Gửi yêu cầu thất bại. Vui lòng thử lại.";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="admin-login-container">
        <h2>VESXE - Quản trị viên</h2>

        <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin}>
          <div className="admin-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isForgotPassword && (
            <div className="admin-input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? isForgotPassword
                ? "Đang gửi yêu cầu..."
                : "Đang đăng nhập..."
              : isForgotPassword
              ? "Gửi yêu cầu"
              : "Đăng nhập"}
          </button>
        </form>

        {/* Link chuyển đổi */}
        <div className="admin-toggle-mode">
          {isForgotPassword ? (
            <span
              onClick={() => setIsForgotPassword(false)}
              style={{ color: "#1890ff", cursor: "pointer" }}
            >
              ← Quay lại đăng nhập
            </span>
          ) : (
            <div className="admin-forgot-password">
              <span
                onClick={() => setIsForgotPassword(true)}
                style={{ color: "#1890ff", cursor: "pointer" }}
              >
                Quên mật khẩu?
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
