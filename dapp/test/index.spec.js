const AccountsContract = artifacts.require('Accounts')

contract('Accounts', accounts => {
  let address
  let phone
  let key

  beforeEach(() => {
    address = accounts[0]
    pin = 8004
    phone = '0791294251'
    key = '58f67034ab83b41980bdc8ecaee089a800b9568c721b2addae002fc832a93914'
  })
  
  it('creates new a account', async() => {

    let instance = await AccountsContract.new()
    let account = await instance.createAccount(pin, key, phone, address)
    // assert getAddress?
    assert(await instance.getAccountAddress(phone), address)
  })

  it('gets key of account', async() => {
    let instance = await AccountsContract.new()
    let account = await instance.createAccount(pin, key, phone, address)
    let expectedKey = await instance.getKey(phone, pin)
    assert(key, expectedKey )
  })

  it('gets phone number associated with an address', async() => {
    let instance = await AccountsContract.new()
    let account = await instance.createAccount(pin, key, phone, address)
    let expectedPhoneumber = await instance.getAccountPhoneNumber(address)
    assert(key, expectedPhoneumber )
  })
})
