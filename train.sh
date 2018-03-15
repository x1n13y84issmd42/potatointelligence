python train.py \
--bottleneck_dir=./data/bottlenecks \
--model_dir=./data/inception \
--saved_model_dir=./data/model \
--how_many_training_steps 200 \
--output_graph=./data/retrained_graph.pb \
--output_labels=./data/retrained_labels.txt \
--image_dir ./data/train_images