import axios from "axios";
import CryptoJS from "crypto-js";

const config = {
  app_id: "255322",
  key1: "your_key1",
  endpoint: "https://sb-openapi.zalopay.vn/v2/query",
};

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { appTransID } = req.query;

  try {
    const data = `${config.app_id}|${appTransID}|${config.key1}`;
    const mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const result = await axios.post(config.endpoint, null, {
      params: {
        app_id: config.app_id,
        app_trans_id: appTransID,
        mac,
      },
    });

    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: "Query failed" });
  }
}
