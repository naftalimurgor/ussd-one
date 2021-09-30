# ussd-one
Monorepo for ussd-one dapp that serves to Allow Harmony One blockchain users to:-
1. Create Wallets
2. Check  balance
3. Make Payments
4. Send ONE(Native "currency" for the Harmony blockchain network)
All through USSD (Unstructured Supplementary Service Data) short codes like `*144#` etc on their phone application.

## Development
This project is part of ongoing  Bridging TradFi and DeFi [hackathon](https://gitcoin.co/hackathon/harmony-defi/projects/9607/ussd-one/summary/)

# set up
1. run the ussd app under `ussd/app`
-install dependencies:
`npm install`
`npm start` # to start the backend server
 
2. Deploy `ussd.py` and register callback url with ussd app provisioned by provider
or a provider like https://africastalking.com/

3. Access the application through the simulator(see demo video). Functionalities provided include:
  -create a wallet
  - send ONE
  - check wallet balance


1. ### USSD application (wip)
This is the dapp portion should drive all the user actions through interactive menu on the phone. USSD application is currently hosted by https://africastalking.com/ and is 
runnable through an "in-page" simulator.

2. ### Smart Contracts
Smart contracts are be deployed on the Harmony Testnet and users can interact with the Smart contract throught the ussde application

## Demo video
Be sure to checkout the demo video of how the final dApp should work, here [demo](https://www.youtube.com/watch?v=j4f1lZXuISY&t=1s&ab_channel=NaftaliMurgor)

