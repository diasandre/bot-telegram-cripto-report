# bot-telegram-cripto-report

[![deploy to lambda](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml/badge.svg)](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml)

Telegram bot that **reports cryptocurrency prices everyday** using `serveless framework` and `AWS LAMBDA`

```
DAILY CRIPTOCURRENCY REPORT
04/04/2021 - 15pm

BNB 🤑
💰Price: $352.97
📈Price(1d): $325.64 (8.39%)
📈Price(7d): $274.21 (28.72%)

BTC
💰Price: $58489.04
📉Price(1d): $59185.64 (-0.52%)
📈Price(7d): $57628.67 (1.49%)

ETH 🤑
💰Price: $2071.78
📈Price(1d): $2048.22 (1.15%)
📈Price(7d): $1815.76 (14.10%)

XRP 🚨
💰Price: $0.62
📉Price(1d): $0.80 (-15.53%)
📈Price(7d): $0.57 (9.21%)

XVS
💰Price: $57.96
📈Price(1d): $53.20 (8.94%)
📈Price(7d): $56.02 (3.46%)
```

### How to deploy to AWS Lambda locally:
- run `npm install -g serverless` to install serverless framework
- if you dont have AWS CLI logged, run `serverless config credentials --provider aws --key X --secret Y`
- now, it's time to deploy: `serverless deploy -v`

### How to deploy to AWS Lambda via github actions:
- go to settings -> secrets and add environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
- push some code or run github action `deploy to lambda`

### Configure cloudwatch cron
- go to [AWS CLOUDWATCH RULES](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#rules:)
- create rule schedule (fixed rate or cron expression)
- select your AWS LAMBDA function

### Environment variables:
- `TELEGRAM_TOKEN` - talk to @botfather.
- `API_KEY` - register and get api key from [NOMICS](https://nomics.com/docs/)
- `CHAT_ID` - add @getidsbot to your group that you want to receive reports, this bot helps you to find your chat id.
- `CRIPTOS` - BTC,ETH,XRP,BNB,XVS is a example
