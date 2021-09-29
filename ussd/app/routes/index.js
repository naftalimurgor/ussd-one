module.exports = class USSDAPP {
  router
  client
  constructor(router, client) {
    this.router = router
    this.client = client
  }

  createWallet = () => {
    return this.router.post('/create-wallet', async (req, res) => {
      const phone = req.body.phone
      const pin = req.body.pin

      try {
        if (pin && phone) {
          throw new Error('One or more fiels is empty')
        }
        const wallet = await this.client.createWallet(phone)
        return res.json({ msg: 'success' })
      } catch (e) {
        return res.json({ msg: 'failed' }).status(401)
      }
    })
  }

  getBalance = () => {
    return this.router.get('/get-balance', async (req, res) => {
      const phone = req.params.phone
      // query the blockchain for balance
      if (phone) {
        const balance = await this.client.getBalance(phone)
        return res.json({ message: 'success', balance })
      }
      return res.json({ msg: 'Failed, phone number invalid' }).status(500)
    })
  }

  sendOne = () => {
    return this.router.post('/send-one', async (req, res) => {
      const toPhoneNumber = req.body.toPhoneNumber
      const fromPhoneNumber = req.body.fromPhoneNumber
      const amount = req.body.amount
      const pin = req.body.pin
      try {
        const txHash = await this.client.sendOne(
          pin,
          fromPhoneNumber,
          toPhoneNumber,
          amount
        )
        if (txHash) {
          return res.json({ msg: `sending ${amount} to ${toPhoneNumber}` })
        }
      } catch (e) {
        return res.json({
          msg: 'failed to send ONE, receive or deposit ONE first',
        })
      }
    })
  }
}
