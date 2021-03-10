import axios from "axios";
import qs from "querystring";

const url = process.env.MSAL_TOKEN_ACCESS;
const storedToken = `0.AScAPOz9d9wB60KSyaUjsIJV-Rn7lbe0SydLqQEoi2cRmHknABY.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P__vRbTOV07Q98cpszKL9nRNyd7dR0xqWhCwigopKnSMy0D_q0gCJ_2wRveUosNfaRq_itUIQCNMBdWycQjqKHATnYZ27px_WZhm8UlDC6eMSTW5u0oNd5emwlSynnsHgVGyM9UvVGj0oDCA7fSdC1v51P5bgMEUlQsp2AR_Xbo1Tpg5-faT3kWugZeT-qOv1xlJRwO3-ysdnqGmneA7DqJ_Tq5hQfMG8xKzI6S4Nlg9-BmJfInUw8ldvh44oZUKywjk8GK8Ovrlmy6cibZyYZmfr14XZKRWbNS6r6sspv1sYl0J6XMFMghDJcYpQF6Svei-EKpNgv-xsVjszis0Vy0O-6GS8XZGFPqWQ5Ru8GExF26wyaqbXC55zFgaCIsBLlrqD-fdLVihRgiLc73ZtHqFn_J2qYYU999yOvtVQG5FQ_iYB_GSyI6-q3t4S4yh_1hfj61ql89Z8yUNV59M4CQRB7EGEoHCXEcG0U2mRoi7LO96UCQ9VDX4Rq4CaIOcVC4rPdqqrqMt_4xHzc8DKSHhZgt7ea3yIPdp279YjsNkHUIxYKN7gZbEQ-0H1gYx1IugTbXiCOtv1PSaTld6QC6_kl4OB3W2W_AzjJcAdoBoh1YnZMtdbhl6egAWbc01waVefCKD4fn1wuqmVswGbhuS-Xc6wCLYN3Gb5leTTIC8BZN6MLoyBR-YhV2X5KZjjh7aRp6zkfXXyaktGQpY_k4YecPP1A5auyRl94p5VEQSk88v1ibhMZ353wDbnK37011IJAiS0vvC7tRg08tOUDlZPSchEvxLlCxeAP-C6FP070Kp93gEQQIZWXzEqMsOtPU-vjXT1SmzolaWbi0uAvtdigZuf0vb4Yt49kHRcR2gFm9QRxrPxiVn0wWuWGKAko-gIPuCQeRNF8WIsGPdPhy3CqZYOYsa_n1Uasi`;

export async function refreshToken() {
  // Refresh the token
  const accessToken = await axios({
    method: "POST",
    url: url,
    data: qs.stringify({
      client_id: process.env.APPLICATION_ID,
      scope:
        "https://graph.microsoft.com/user.read https://graph.microsoft.com/calendars.readwrite https://graph.microsoft.com/mail.send https://graph.microsoft.com/mail.readwrite offline_access",
      refresh_token: storedToken,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "refresh_token",
      client_secret: process.env.AUTH_SECRET,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then(({ data }) => data.access_token);

  return accessToken;
}
