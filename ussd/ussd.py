from flask import Flask
from flask import request
from flask import make_response
import hooks

app = Flask(__name__)
amount = ""
to_phone = ""
pin = ""

@app.route('/', methods=['POST'])
def ussd_callback():
    session_id = request.values.get("sessionId", None)
    serviceCode = request.values.get("serviceCode", None)
    phoneNumber = request.values.get("phoneNumber", None)
    text = request.values.get("text", None)
    

    #serve menus based on text
    if text == "":
        menu_text = "CON Welcome to Harmony! \n"
        menu_text += "1. Create Wallet \n"
        menu_text += "2. Send ONE \n"
        menu_text += "3. Check my balance"

    elif text =="1":
         menu_text = "CON To create a wallet, enter a four digit pin,this is a SECRET \n"
         menu_text += "1. Enter a four digit pin\n"
                

    elif text =="2":
        menu_text += "CON Enter a Receiver phone number\n"

    elif text =="1*1":
        pin = text
        acount = hooks.create_account(pin, phone_number)
        menu_text = "END Your account has been created and you can now send and receive ONe."

    elif text =="1*2":
        menu_text += "CON Enter the amount of ONE to send\n"
        amount = text
    elif text == "2*1":
        to_phone = text
        menu_text += "CON Enter Pin\n"
    elif text == "2*2":
        tx = hooks.send_one(amount, to_phone, pin)
        menu_text += "End sent amount" + amount + "to" + to_phone + "pending \n you wil be notified through sms"   
    
    elif text == "3":
        balance = hooks.get_balance(phone_number)
        menu_text=+"End your Balance is " + balance
        
    resp = make_response(menu_text, 200)
    resp.headers['Content-Type'] = "text/plain"
    return resp

if __name__ == "__main__":
        app.run(host='0.0.0.0')

