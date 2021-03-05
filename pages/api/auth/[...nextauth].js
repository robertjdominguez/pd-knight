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
      Providers.AzureADB2C({
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        scope: "offline_access User.Read",
        tenantId: process.env.AZURE_TENANT_ID,
      }),
    ],
    database: await getCredentials(),
  });
