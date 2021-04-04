"use strict";

const axios = require("axios");
const { format, subDays } = require("date-fns");

module.exports.criptoreport = async (event) => {
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const API_KEY = process.env.API_KEY;
  const CHAT_ID = process.env.CHAT_ID;
  const CRIPTOS = process.env.CRIPTOS;

  const actualDate = new Date();
  const sevenDaysDate = subDays(actualDate, 7);

  const apiDateFormatted = format(sevenDaysDate, "yyyy-MM-dd'T'HH:00:00XXX");
  const API_BASE_URL = `https://api.nomics.com/v1/currencies/sparkline?key=${API_KEY}&ids=${CRIPTOS}&start=${apiDateFormatted}`;

  const { data } = await axios.get(API_BASE_URL);

  const content = data
    .map(({ currency, prices }) => {
      const [sevenDaysPrice] = prices;
      const actualPrice = prices[prices.length - 1];

      const percentual = (
        ((actualPrice - sevenDaysPrice) / sevenDaysPrice) *
        100
      ).toFixed(2);

      const sevenDaysPriceFixed = Number(sevenDaysPrice).toFixed(3);
      const actualPriceFixed = Number(actualPrice).toFixed(3);

      const hasWarning = percentual < -10;

      const warningEmoji = hasWarning ? "[WARNING]" : "";

      return `<b>${currency}${warningEmoji}</b>\nUSD ${sevenDaysPriceFixed} -> ${percentual}% -> USD ${actualPriceFixed}`;
    })
    .join("\n");

  const fromDateFormated = format(sevenDaysDate, "dd/MM/yyyy");

  const toDateFormated = format(actualDate, "dd/MM/yyyy");

  const response = `<b>RELATÓRIO CRIPTOAMIGOS</b>\n<b>${fromDateFormated} -> ${toDateFormated}</b>\n \n${content}`;

  const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  await axios.post(TELEGRAM_API_BASE, {
    chat_id: CHAT_ID,
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
