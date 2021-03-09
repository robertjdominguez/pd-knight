import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const axios = require("axios");

// Heroku api key and postgres instance
const herokuApiKey = `9c3b31e3-9674-458e-93aa-51de1896decf`;
const herokuPostgres = `postgresql-opaque-41309`;

// Connection to Heroku API
const herokuApi = axios.create({
  baseURL: `https://api.heroku.com`,
  headers: {
    Authorization: `Bearer ${herokuApiKey}`,
    Accept: "application/vnd.heroku+json; version=3",
  },
});

// Async function to get database uri
const getCredentials = async () => {
  const response = await herokuApi.get(`addons/${herokuPostgres}/config`);
  const pgConnStr = response.data[0].value + "?ssl=no-verify";
  return pgConnStr;
};

export default async (req, res) =>
  NextAuth(req, res, {
    providers: [
      {
        id: "msal",
        name: "Microsoft Login",
        type: "oauth",
        version: "2.0",
        scope:
          "https://graph.microsoft.com/user.read https://graph.microsoft.com/calendars.readwrite https://graph.microsoft.com/mail.send https://graph.microsoft.com/mail.readwrite offline_access",
        params: { grant_type: "authorization_code" },
        accessTokenUrl: process.env.MSAL_TOKEN_ACCESS,
        requestTokenUrl: process.env.MSAL_TOKEN_REQUEST,
        authorizationUrl: process.env.MSAL_TOKEN_AUTHORIZE,
        profileUrl: "https://graph.microsoft.com/v1.0/me/",
        profile: (profile) => {
          console.log(profile);
          return {
            id: profile.id,
            name: profile.displayName,
            last_name: profile.surname,
            first_name: profile.givenName,
            email: profile.mail,
          };
        },
        clientId: process.env.APPLICATION_ID,
        clientSecret: process.env.AUTH_SECRET,
      },
    ],
    database: await getCredentials(),
  });
