import axios from "axios";

const url = `https://graph.microsoft.com/v1.0/me/sendMail`;
const token = `eyJ0eXAiOiJKV1QiLCJub25jZSI6InJTa1pDX3VOa0p1THJYQ1ZEdXdMUjRwbExxNTJ5YWVqbExpa2Q1WWFnclEiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83N2ZkZWMzYy0wMWRjLTQyZWItOTJjOS1hNTIzYjA4MjU1ZjkvIiwiaWF0IjoxNjE1MjU1MjgzLCJuYmYiOjE2MTUyNTUyODMsImV4cCI6MTYxNTI1OTE4MywiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiQVNRQTIvOFRBQUFBcCtyNitqK28rSHE0cHhCV1ptS1MxdDg0OHRueDVRSWRYZEV0dnhxUHBsOD0iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6InBkLWtuaWdodCIsImFwcGlkIjoiYjc5NWZiMTktNGJiNC00YjI3LWE5MDEtMjg4YjY3MTE5ODc5IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJEb21pbmd1ZXoiLCJnaXZlbl9uYW1lIjoiUm9iIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiNzEuNDUuMTAzLjg4IiwibmFtZSI6IlJvYiBEb21pbmd1ZXoiLCJvaWQiOiI5MDI3YmJmMi1hN2E0LTRlYWQtYjdhMi1mYWIwZGZjMWY4YTYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtODYxNTY3NTAxLTExNzYwOTcxMC03MjUzNDU1NDMtNTQ3MyIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzN0ZGRTg5NjVEMjNDIiwicmgiOiIwLkFTY0FQT3o5ZDl3QjYwS1N5YVVqc0lKVi1SbjdsYmUwU3lkTHFRRW9pMmNSbUhrbkFCWS4iLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIE1haWwuUmVhZFdyaXRlIE1haWwuU2VuZCBVc2VyLlJlYWQgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzdWIiOiJtUVhXZU42clRXWVBCQU9UT1JwV0oyS3FyY2J0SklpZ2dOeEVTOWdMWlFFIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiNzdmZGVjM2MtMDFkYy00MmViLTkyYzktYTUyM2IwODI1NWY5IiwidW5pcXVlX25hbWUiOiJyZG9taW5ndWV6QGFsdGFtb250c2Nob29sLm9yZyIsInVwbiI6InJkb21pbmd1ZXpAYWx0YW1vbnRzY2hvb2wub3JnIiwidXRpIjoiZUJmRWZwWXltMGVlWGhOSGFzSjFBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJieUc3MVJvTTdzS0dRSzkybnctTlpaWDRRbVV6ZWQxdUYyaW9ReFNENVBFIn0sInhtc190Y2R0IjoxMzkzMjcwMTgyfQ.J2QeWJu3xNxOEH3MgvCeoNPqPDscVJ1KIUwemlrtQPGuvjgVfYnReOcYGb6ti0YJZoZbiWDKA-R90OGAAKM2ufbg7OjcUoWEXLiyuqu0bi_GUtD8t3_fvRNrrzLsmXg9nMQGA9Efhy7pEa2Li4NfTuuStTR0DCV6WUNeM9PBIaC1yuxiSR-D6COkciwsYAa93RtG-Flg4tON5ulrHmmt6oAs-aoEGtiY0l1wqzJXR_ASqS70Q9k5scZUTO469_bDxr3UhvWCNmasxAG-3ajywxrLQMn3ObZq0ettartNxlkXf0Y8HwtXKAkFx8UayMfibckIG8-GUhCMVUX6dQnqUw`;

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  },
};

export default (req, res) => {
  // Get the information from the request
  const stringVers = JSON.stringify(req.body);
  console.log(stringVers);

  // Do something with it
  axios
    .post(
      url,
      {
        message: {
          subject: "API Testing",
          body: {
            contentType: "Text",
            content: "Hello world",
          },
          toRecipients: [
            {
              emailAddress: {
                address: "rdominguez@altamontschool.org",
              },
            },
          ],
        },
        saveToSentItems: "true",
      },
      options
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.status(200).json({ message: `Hooray` });
};
