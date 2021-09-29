class Client {
 
  web3
  contractInstance
  
  constructor(contractInstance, web3) {
    this.contractInstance = contractInstance
    this.web3 = web3 
  }

  createAccount = async (phoneNumber, pin) => {
    try {
      const addressExists = (await this._getAddress(phoneNumber)) ? true : false
      if (addressExists) {
        throw new Error('Failed, try again')
      }
      const [privateKey, address] = await this._createWallet()
      const account = await this.contractInstance.methods
        .createAccount(pin, privateKey, phone, address)
        .call()

      if (account) return address
    } catch (error) {
      throw new Error(error.message)
    }
  }

  sendOne = async (pin, fromPhoneNumber, toPhoneNumber, amount) => {
    try {
      const key = await this._getKey(fromPhoneNumber, pin)
      const fromAddress = await this._getAddress(fromPhoneNumber)
      const toAddress = await this._getAddress(toPhoneNumber)

      if (toAddress && fromAddress && key) {
        txObject = {
          // optional fields ommitted
          to: toAddress,
          value: this.web3.utils.toHex(amount),
        }
        // sign a transaction using the key retrieved
        const tx = await this.web3.eth.accounts.signTransaction(txObject, key)
        const txHash = tx.transactionHash
        return txHash
      }
    } catch (e) {
      console.log(e)
    }
  }

  getBalance = async phoneNumber => {
    const address = await this._getAddress(phoneNumber)
    return await this.web3.getBalance(address)
  }

  _getKey = async (phone, pin) => {
    try {
      const key = await this.contractInstance.methods.getKey(phone, pin).call()
      if (key) {
        return key
      } else {
        return null
      }
    } catch (e) {
      return new Error(err.message)
    }
  }

  _getAddress = async phoneNumber => {
    try {
      const address = await this.contractInstance.methods.getAccountAddress(phoneNumber).call()
      return address
    } catch (e) {
      return new Error(err.message)
    }
  }

  _createWallet = async () => {
    const accountObj = await this.web3.eth.accounts.create()
    const privateKey = accountObj.privateKey
    const address = accountObj.address
    return [privateKey, address]
  }
  
}

module.exports = { Client, SMS: require('./SMS') }
