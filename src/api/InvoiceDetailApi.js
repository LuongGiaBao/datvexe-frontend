import { apiClient } from "../services/apiservices";

// Lấy tất cả chi tiết hóa đơn
export const fetchAllInvoiceDetails = async () => {
  try {
    const response = await apiClient.get(
      "/detail-invoices?populate=trip,invoice,detai_price"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    throw error;
  }
};

// Tạo chi tiết hóa đơn mới
export const createInvoiceDetail = async (invoiceDetail) => {
  try {
    const requestData = {
      data: {
        MaChiTietHoaDon: invoiceDetail.detailCode,
        invoice: invoiceDetail.invoiceCode,
        trip: invoiceDetail.ticketCode,
        detai_price: invoiceDetail.priceDetailCode,
        soluong: invoiceDetail.quantity,
        tongTien: invoiceDetail.totalAmount,
      },
    };

    const response = await apiClient.post(
      "/detail-invoices?populate=*",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating invoice detail:", error);
    throw error;
  }
};

// Cập nhật chi tiết hóa đơn
export const updateInvoiceDetail = async (id, invoiceDetail) => {
  try {
    const requestData = {
      data: {
        MaChiTietHoaDon: invoiceDetail.detailCode,
        invoice: invoiceDetail.invoiceCode,
        trip: invoiceDetail.ticketCode,
        detai_price: invoiceDetail.priceDetailCode,
        soluong: invoiceDetail.quantity,
        tongTien: invoiceDetail.totalAmount,
      },
    };
    const response = await apiClient.put(`/detail-invoices/${id}`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice detail:", error);
    throw error;
  }
};

// Xóa chi tiết hóa đơn
export const deleteInvoiceDetail = async (id) => {
  try {
    const response = await apiClient.delete(`/detail-invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting invoice detail:", error);
    throw error;
  }
};
