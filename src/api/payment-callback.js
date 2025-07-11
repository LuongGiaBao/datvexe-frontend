import CryptoJS from "crypto-js";

const config = {
  key2: "your_key2",
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { data: dataStr, mac: reqMac } = req.body;

  try {
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

    if (mac !== reqMac) {
      return res.json({
        return_code: -1,
        return_message: "MAC not match",
      });
    }

    const data = JSON.parse(dataStr);

    // TODO: cập nhật DB nếu cần
    console.log("✅ Zalo callback OK for:", data.app_trans_id);

    return res.json({
      return_code: 1,
      return_message: "success",
    });
  } catch (err) {
    return res.json({
      return_code: 0,
      return_message: "error",
    });
  }
}
