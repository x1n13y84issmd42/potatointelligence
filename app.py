import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
