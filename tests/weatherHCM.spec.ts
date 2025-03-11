import { test, expect } from "@playwright/test";

test("Lấy thông tin thời tiết TP.HCM từ Open-Meteo", async ({ request }) => {
  // Gọi API Open-Meteo để lấy thời tiết TP.HCM
  const response = await request.get(
    "https://api.open-meteo.com/v1/forecast?latitude=10.7769&longitude=106.7009&current_weather=true"
  );
  expect(response.status()).toBe(200);

  const weatherData = await response.json();
  console.log("🌤 Thời tiết TP.HCM:", weatherData.current_weather);

  // Kiểm tra dữ liệu trả về
  expect(weatherData).toHaveProperty("current_weather");
  expect(weatherData.current_weather).toHaveProperty("temperature");
  expect(weatherData.current_weather).toHaveProperty("weathercode");
});
