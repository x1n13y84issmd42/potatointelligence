import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

app.run(port=os.environ.get('PORT', 5000))
