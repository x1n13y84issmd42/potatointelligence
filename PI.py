import tensorflow as tf

class PI:
	def __init__(self, labelsPath, graphPath):
		self.graph = tf.GraphDef()
		f = tf.gfile.FastGFile(graphPath, 'rb')
		self.graph.ParseFromString(f.read())
		tf.import_graph_def(self.graph, name='')

		self.label_lines = [line.rstrip() for line 
                   in tf.gfile.GFile(labelsPath)]

	def classify(self, filePath):
		print('PI Classifier is working')
		# Read in the image_data
		image_data = tf.gfile.FastGFile(filePath, 'rb').read()
		print('PI image', image_data)

		with tf.Session() as sess:
			# Feed the image_data as input to the graph and get first prediction
			softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
			
			predictions = sess.run(softmax_tensor, \
					{'DecodeJpeg/contents:0': image_data})
			
			# Sort to show labels of first prediction in order of confidence
			top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]

			dict = {}

			for node_id in top_k:
				human_string = self.label_lines[node_id]
				score = predictions[0][node_id]
				#print('%s (score = %.5f)' % (human_string, score))
				dict[human_string] = score
		return dict

	def classifyBytes(self, image_data):
		
		with tf.Session() as sess:
			# Feed the image_data as input to the graph and get first prediction
			softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
			
			predictions = sess.run(softmax_tensor, \
					{'DecodeJpeg/contents:0': image_data})
			
			# Sort to show labels of first prediction in order of confidence
			top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]

			dict = {}

			for node_id in top_k:
				human_string = self.label_lines[node_id]
				score = predictions[0][node_id]
				#print('%s (score = %.5f)' % (human_string, score))
				dict[human_string] = score
		return dict

class PredictionAccumulator:
	def __init__(self):
		self.data = {}
		self.length = 0

	def add(self, guesses):
		for k in guesses:
			if k in self.data:
				self.data[k] += float(guesses[k])
			else:
				self.data[k] = float(guesses[k])
		self.length += 1

	def getData(self):
		return self.data
	
	def len(self):
		return self.length