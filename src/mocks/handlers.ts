import { http, delay, HttpResponse } from "msw";

const baseUrl = "https://localhost";

const handlers = [
  http.post(`${baseUrl}/files`, async () => {
    return HttpResponse.json({
      task_id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
    });
  }),

  http.get(`${baseUrl}/status/c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d`, async ({ request }) => {
    await delay(1000);

    return HttpResponse.json({
      isSuccess: true,
    });
  }),
];

export default handlers;
