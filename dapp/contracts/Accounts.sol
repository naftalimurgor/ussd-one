pragma solidity >=0.5.0 <0.8.0;

contract Accounts {

    mapping(string => uint8) private phoneNumberToPin;
    mapping(uint8 => string) private pinToKey;
    mapping(string => address) private phoneNumberToAddress;
    mapping(address => string) private addressToPhoneNumber;
    mapping(string => string) private phoneNumberToKey;


    event AccountCreated(string indexed phoneNumber, address indexed _address);
    
    modifier AccountNotExists(address _address, string memory _phoneNumber) {
        require(
            _address != phoneNumberToAddress[_phoneNumber] &&
                keccak256(abi.encode(_phoneNumber)) != keccak256(abi.encode(addressToPhoneNumber[_address]))
        );
        _;
    }

    modifier pinIsCorrect(string memory _phoneNumber, uint8 _pin) {
        require(_pin == phoneNumberToPin[_phoneNumber]);
        _;
    }
    
    function createAccount(
        uint8 _pin,
        string memory _key,
        string memory _phoneNumber,
        address _address
    ) public AccountNotExists(_address, _phoneNumber) {
        phoneNumberToPin[_phoneNumber] = _pin;
        pinToKey[_pin] = _key;
        phoneNumberToAddress[_phoneNumber] = _address;
        emit AccountCreated(_phoneNumber, _address);
    }

    function getAccountAddress(string memory _phoneNumber) public view returns (address) {
        return phoneNumberToAddress[_phoneNumber];
    }

    function getAccountPhoneNumber(address _accAddress) view public returns (string memory) {
        return addressToPhoneNumber[_accAddress];    
    }

    function getKey(string memory _phoneNumber, uint8 _pin)
        public
        view
        pinIsCorrect(_phoneNumber, _pin)
        returns (string memory)
    {
        return phoneNumberToKey[_phoneNumber];
    }

  
}
