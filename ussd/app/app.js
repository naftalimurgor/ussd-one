const express = require('express')
const morgan = require('morgan')
const Web3 = require('web3')
const dotenv = require('dotenv')
const USSDAPP = require('./routes')
const { Client } = require('./client')
const { Router } = require('express')

const main = () => {
  dotenv.config()
  const app = express()
  const router = Router()
  const PORT = process.env.PORT || 3000

  const provider = 'https://api.s0.b.hmny.io' //rpc url
  const PKEY  = process.env.PKEY

  const CONTRACT_ADDRESS = '0x1994B83e049E051870DB906e9bEF9CAdEFf8d698'
  const contractABI = require('./abi/abi.json')
  console.log(contractABI);
  const web3 = new Web3(provider)
  const contractInstance = new web3.eth.Contract(contractABI.abi, CONTRACT_ADDRESS)

  const client = new Client(contractInstance, web3)
  const ussd = new USSDAPP(router, client)

  // enable json parsing
  app.use(express.json())
  app.use(morgan('tiny'))
  // routes
  app.use('/api', ussd.createWallet())
  app.use('/api', ussd.getBalance())
  app.use('/api', ussd.sendOne())

  app.listen(PORT, () => console.log(`listening on PORT: 0.0.0.0:${PORT}`))
}

main()
