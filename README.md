# bot-telegram-cripto-report

[![deploy to lambda](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml/badge.svg)](https://github.com/diasandre/bot-telegram-cripto-report/actions/workflows/main.yml)

Telegram bot that **reports cryptocurrency prices everyday** using `serveless framework` and `AWS LAMBDA`

```
RELATÓRIO CRIPTOAMIGOS
28/03/2021 -> 04/04/2021

BNB
USD 274.213 -> 23.58% -> USD 338.860
BTC
USD 57628.674 -> 0.85% -> USD 58116.037
ETH
USD 1815.757 -> 12.60% -> USD 2044.619
XRP
USD 0.567 -> 6.45% -> USD 0.604
XVS
USD 56.018 -> -2.49% -> USD 54.621
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
