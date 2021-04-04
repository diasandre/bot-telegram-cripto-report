"use strict";

const axios = require("axios");
const { format } = require("date-fns");

module.exports.criptoreport = async (event) => {
  // const TOKEN_TELEGRAM = process.env.TOKEN_TELEGRAM;
  const API_KEY = process.env.API_KEY;

  const criptos = ["BTC", "ETH", "BNB", "XVS", "XRP"].join(",");

  const date = new Date();

  const formatedDate = format(date, "YYYY-MM-DDTHH:00:00Z");

  const API_BASE = `https://api.nomics.com/v1/currencies/sparkline?key=${API_KEY}&ids=${criptos}&start=${formatedDate}`;

  axios
    .get(API_BASE)
    .then((data) => {
      const response = data.map(
        ({ currency, timestamps: [timestamp], prices: [price] }) => {
          return `${currency} - USD ${price}}`;
        }
      );

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: response.join(","),
          },
          null,
          2
        ),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(
          {
            message: error,
          },
          null,
          2
        ),
      };
    });
};
