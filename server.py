import sys
from PI import PI

pi = PI("./data/retrained_labels.txt", "./data/retrained_graph.pb")
guesses = pi.classify(sys.argv[1])

for label in guesses:
	print("It's %s (score = %.5f)" % (label, guesses[label]))