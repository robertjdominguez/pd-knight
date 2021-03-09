import axios from "axios";

const url = `https://graph.microsoft.com/v1.0/me/sendMail`;
const token = `eyJ0eXAiOiJKV1QiLCJub25jZSI6IkMxand6cVZ0b18wZk5Oand6OW1wR29PTlVHYkg2WkJTbGVnRXdmLW80VUUiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83N2ZkZWMzYy0wMWRjLTQyZWItOTJjOS1hNTIzYjA4MjU1ZjkvIiwiaWF0IjoxNjE1Mjk4NjY1LCJuYmYiOjE2MTUyOTg2NjUsImV4cCI6MTYxNTMwMjU2NSwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiRTJaZ1lPaVk5VVZOWTdWYnd1VUsxMDFYemwxNDdTc2MxTCt4SWNhZzYvbU5tVUhlVFRjQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoicGQta25pZ2h0IiwiYXBwaWQiOiJiNzk1ZmIxOS00YmI0LTRiMjctYTkwMS0yODhiNjcxMTk4NzkiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IkRvbWluZ3VleiIsImdpdmVuX25hbWUiOiJSb2IiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI2Ny43OC4yMzcuMiIsIm5hbWUiOiJSb2IgRG9taW5ndWV6Iiwib2lkIjoiOTAyN2JiZjItYTdhNC00ZWFkLWI3YTItZmFiMGRmYzFmOGE2Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTg2MTU2NzUwMS0xMTc2MDk3MTAtNzI1MzQ1NTQzLTU0NzMiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzdGRkU4OTY1RDIzQyIsInJoIjoiMC5BU2NBUE96OWQ5d0I2MEtTeWFVanNJSlYtUm43bGJlMFN5ZExxUUVvaTJjUm1Ia25BQlkuIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBNYWlsLlJlYWRXcml0ZSBNYWlsLlNlbmQgVXNlci5SZWFkIHByb2ZpbGUgb3BlbmlkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibVFYV2VONnJUV1lQQkFPVE9ScFdKMktxcmNidEpJaWdnTnhFUzlnTFpRRSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6Ijc3ZmRlYzNjLTAxZGMtNDJlYi05MmM5LWE1MjNiMDgyNTVmOSIsInVuaXF1ZV9uYW1lIjoicmRvbWluZ3VlekBhbHRhbW9udHNjaG9vbC5vcmciLCJ1cG4iOiJyZG9taW5ndWV6QGFsdGFtb250c2Nob29sLm9yZyIsInV0aSI6IlRGdHl4Y0JSSjBDVGVYQndzcmgxQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiYnlHNzFSb003c0tHUUs5Mm53LU5aWlg0UW1VemVkMXVGMmlvUXhTRDVQRSJ9LCJ4bXNfdGNkdCI6MTM5MzI3MDE4Mn0.TaVK8UBJBtIFZkWOtF95ni5U4p8wRzQnOB6Eu2SG2Z1HzLTuGWIbEvVlL8MCwxlkiEXqqjxoeC8nAwsFuBkTo6Li27B-0ZoEQHsJ3M6s_NNyap87ejABEc14hDyZi_lxQdwlLNHFPi6LhXNQjaEE75yExauJDCZPIRhdWeF9YuQky9QAvwA5kD6h4lzVCqmsx71NhoZ0Nao2bE74kawX9_kLlG8OafcmvYW8aRKXboDXJxcRzyW-hKBWEEG0iSLtMrMHpw8CMiX-MG8To_VyA5pWc0azPEwsO4uoXofihJwpdcXbLgCn7bYF-DM_Qmr3goMXy_lswFnesp4uEV7_vA`;

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
