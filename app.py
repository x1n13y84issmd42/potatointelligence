import os
import json

import numpy

from flask import Flask, request, render_template, Response
from werkzeug.utils import secure_filename
from PI import PI


UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['jpeg', 'jpg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_image(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/image", methods=['POST'])
def image():
    image = request.files['image'] 
    print('image filename', image.filename)
    if image and allowed_image(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        pi = PI("./data/retrained_labels.txt", "./data/retrained_graph.pb")
        guesses = pi.classify(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        for k in guesses:
            if isinstance(guesses[k], numpy.float32):
                guesses[k] = float(guesses[k])
        response = Response(json.dumps(guesses))
        response.headers["Content-Type"] = "application/json"
        return response
    else:
        return 'Error'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
 