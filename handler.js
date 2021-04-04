"use strict";

const axios = require("axios");
const { format } = require("date-fns");

module.exports.criptoreport = async (event) => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const API_KEY = process.env.API_KEY;

  const criptos = ["BTC", "ETH", "BNB", "XVS", "XRP"].join(",");

  const date = new Date();

  const formatedDate = format(date, "yyyy-MM-dd'T'HH:00:00XXX");

  const API_BASE = `https://api.nomics.com/v1/currencies/sparkline?key=${API_KEY}&ids=${criptos}&start=${formatedDate}`;

  const { data } = await axios.get(API_BASE);

  const content = data
    .map(({ currency, timestamps: [timestamp], prices: [price] }) => {
      return `<b>${currency}</b> - USD ${price}`;
    })
    .join("\n");

  const response = `<b>Relatório criptomoedas - ${format(
    date,
    "dd/MM/yyyy"
  )}</b>\n \n${content}`;

  const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await axios.post(TELEGRAM_API_BASE, {
    chat_id: "-474599700",
    text: response,
    parse_mode: "html",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      response,
    }),
  };
};
