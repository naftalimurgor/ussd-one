import requests
import json

def create_account(pin, phone_number):
    account_data = {'pin': pin, 'phone': phone_number}
    res = requests.post(url ="http://51.210.198.194:3000/create-account", json=json.dumps(account_data))
    
def send_one(amount, to_number, pin):
    tx_data = {'pin': pin, 'toPhoneNumber':to_number, 'amount': amount}
    res = requests.post(url="http://51.210.198.194:3000/send-one", json=json.dumps(tx_data))
    
def get_balance(phone_number):
    res = requests.post(url=f"http://51.210.198.194:3000/get_balance?phone={phone_number}", json=json.dumps(account_data))
    