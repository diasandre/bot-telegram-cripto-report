"use strict";

const axios = require("axios");
const { format, subDays } = require("date-fns");
const { format: formatTimeZone, utcToZonedTime } = require("date-fns-tz");

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
      const oneDayPrice = prices[prices.length - 2];

      const sevenDaysPercentual = (
        ((actualPrice - sevenDaysPrice) / sevenDaysPrice) *
        100
      ).toFixed(2);

      const oneDayPercentual = (
        ((actualPrice - oneDayPrice) / oneDayPrice) *
        100
      ).toFixed(2);

      const sevenDaysPriceFixed = Number(sevenDaysPrice).toFixed(2);
      const oneDayPriceFixed = Number(oneDayPrice).toFixed(2);
      const actualPriceFixed = Number(actualPrice).toFixed(2);

      const warningEmoji =
        sevenDaysPercentual <= -10 || oneDayPercentual <= -10 ? " π¨" : "";
      const greatProfitEmoji =
        sevenDaysPercentual >= 10 || oneDayPercentual >= 10 ? " π€" : "";

      const oneDayPercentageEmoji = oneDayPercentual >= 0 ? "π" : "π";
      const sevenDayPercentageEmoji = sevenDaysPercentual >= 0 ? "π" : "π";

      return [
        `<b>${currency}${warningEmoji}${greatProfitEmoji}</b>`,
        `π°Price: $${actualPriceFixed}`,
        `${oneDayPercentageEmoji}Price<i>(1d)</i>: $${oneDayPriceFixed} <b>(${oneDayPercentual}%)</b>`,
        `${sevenDayPercentageEmoji}Price<i>(7d)</i>: $${sevenDaysPriceFixed} <b>(${sevenDaysPercentual}%)</b>`,
      ].join("\n");
    })
    .join("\n\n");

  const timeZone = "America/Sao_Paulo";

  const actualDateFormatted = format(actualDate, "dd/MM/yyyy");
  const atualHour = formatTimeZone(
    utcToZonedTime(actualDate, timeZone),
    "HHaaa",
    {
      timeZone,
    }
  );

  const response = `<b>DAILY CRIPTOCURRENCY REPORT</b>\n${actualDateFormatted} - ${atualHour}\n\n${content}`;

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
