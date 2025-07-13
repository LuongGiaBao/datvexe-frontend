import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

// Map đơn giản thay vì in-memory DB
const pendingBookings = new Map();
const paymentStatusMap = new Map();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, userId, description, bookingDetails } = req.body;

      if (!amount || !userId || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const transID = Math.floor(Math.random() * 1000000);
      const appTransID = `${moment().format("YYMMDD")}_${transID}`;

      pendingBookings.set(appTransID, bookingDetails);
      paymentStatusMap.set(appTransID, "pending");

      const embed_data = {
        redirecturl: `https://datvexe-frontend.vercel.app/booking-success`,
        appTransID,
      };

      const order = {
        app_id: config.app_id,
        app_trans_id: appTransID,
        app_user: userId,
        app_time: Date.now(),
        item: JSON.stringify([{}]),
        embed_data: JSON.stringify(embed_data),
        amount,
        description,
        bank_code: "zalopayapp",
      };

      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      const result = await axios.post(config.endpoint, null, { params: order });

      if (result.data.return_code === 1) {
        res.json({
          ...result.data,
          appTransID,
          status: "success",
        });
      } else {
        throw new Error(result.data.return_message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      return res.status(500).json({ error: "Payment request failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
