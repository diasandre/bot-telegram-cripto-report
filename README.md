# bot-telegram-cripto-report

[![deploy to lambda](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml/badge.svg)](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml)

Telegram bot that reports cryptocurrency prices everyday using `serveless framework` and `AWS LAMBDA`

```
Relatório diário das criptomoedas - 04/04/2021
 
BNB - USD 336.28592237
BTC - USD 57910.48561641
ETH - USD 2036.68128614
XRP - USD 0.60052391
XVS - USD 54.51555715
```

### Environment variables:
- `TELEGRAM_TOKEN` - talk to @botfather.
- `API_KEY` - register and get api key from [NOMICS](https://nomics.com/docs/)
- `CHAT_ID` - add @getidsbot to your group that you want to receive reports, this bot helps you to find your chat id.
- `CRIPTOS` - BTC,ETH,XRP,BNB,XVS is a example
