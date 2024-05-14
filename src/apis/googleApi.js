import axios from "axios";

export const apiHelper = axios.create({
  timeout: 1000,
  async: true,
  crossDomain: true,
});

export function submitForm(formData) {
  return apiHelper.post(
    "https://docs.google.com/forms/d/e/1FAIpQLSciKxck0o_t15za1R_sz15i2wP5Nd-8v46hDkciAMb2SUqfWg/formResponse",
    formData,
    {
      crossDomain: true, // 解決跨網域CORS的問題
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // 設置Content-Type為表單格式
      },
    }
  );
}
