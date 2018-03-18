import os
import json

import numpy

from flask import Flask, request, render_template, Response
from werkzeug.utils import secure_filename
from PI import PI, PredictionAccumulator
from PIL import Image
from io import BytesIO, StringIO
import base64
import re
from math import floor
import urllib.request
import json

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

@app.route("/ingredients/<ingID>")
def ingredient(ingID):
	contents = urllib.request.urlopen("https://www.dagbladet.no/mat/api/ingredients/%d" % int(ingID))
	contents = json.load(contents)
	response = Response(json.dumps(contents))
	response.headers["Content-Type"] = "application/json"
	return response

@app.route("/recipes/<ingID>")
def recipes(ingID):
	contents = urllib.request.urlopen("https://www.dagbladet.no/mat/api/recipes/%d" % int(ingID))
	contents = json.load(contents)
	response = Response(json.dumps(contents))
	response.headers["Content-Type"] = "application/json"
	return response

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

@app.route("/imagex", methods=['POST'])
def imagex():
	image = request.files['image']
	numTiles = int(request.form['numTiles'])
	if image and allowed_image(image.filename):

		filename = secure_filename(image.filename)
		pi = PI("./data/retrained_labels.txt", "./data/retrained_graph.pb")
		accum = PredictionAccumulator()

		tiles = makeTiles(image.stream, numTiles)
		print('Got %d tiles.' % len(tiles))

		for tile in tiles:
			print('Examining tile %d/%d...' % (accum.len(), len(tiles)))
			accum.add(pi.classifyBytes(tile))

		print('Final scores:')
		print(accum.getData())
		response = Response(json.dumps(accum.getData()))
		response.headers["Content-Type"] = "application/json"
		return response
	else:
		return 'Error'

def makeTiles(imageData, numTiles):
	#	First, cropping the image to square shape.
	image = Image.open(imageData)
	md = min(image.size[0], image.size[1])
	#image = image.crop((image.size[0]/2-md/2, image.size[1]/2-md/2, image.size[0]/2+md/2, image.size[1]/2+md/2))
	#image.save('D:/rectImage.jpg', 'JPEG')

	tileSize = floor(md / numTiles)
	tileSizeX = floor(image.size[0] / numTiles)
	tileSizeY = floor(image.size[1] / numTiles)
	tiles = []
	#	Then cutting the square image into numTiles*numTiles square tiles.
	#	They will be given to the classifier later, hope that will improve accuracy.
	for y in range(0, numTiles):
		for x in range(0, numTiles):
			tileImage = image.crop((x*tileSizeX, y*tileSizeY, x*tileSizeX+tileSizeX, y*tileSizeY+tileSizeY))
			#tileImage = image.crop((x*tileSize, y*tileSize, x*tileSize+tileSize, y*tileSize+tileSize))
			with BytesIO() as f:
				tileImage.save(f, 'JPEG')
				f.seek(0)
				#print('BytesIO image', f.getvalue())
				tiles.append(f.getvalue())
	
	return tiles

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
 