var ProgressImage = React.createClass({
	render: function() {
		return (
			<img src="/static/loading.gif" />
		)
	}
});

var RecipesData = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-6 offset-sm-3">
					{this.props.isLoading ? <ProgressImage /> : ''}
				</div>
			</div>
		)
	}
});


var Form = React.createClass({
	render: function() {
		return (
			<div>
				<div id="image-editor">
					<img src="" alt="" id="placeholder"/>
					<canvas id="canvas"></canvas>
				</div>
				<form onSubmit={this.props.submitHandler}>
					<div className="form-group">
						<label htmlFor="imageUpload">Email address</label>
						<input type="file" name="image" className="form-control" id="imageUpload" placeholder="Choose Image" />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)    
	}
})

var App = React.createClass({
	getInitialState: function() {
		return {
			isDataLoading: false,
			ingredients: [],
			recipes: []
		}
	},

	segmentImage: function(image, pcs) {
	//	let img = document.createElement('img');
		let img = document.getElementById('placeholder');
		let canvas = document.getElementById('canvas');
		let C = canvas.getContext('2d');
		let fr = new FileReader();
		let that = this;
		fr.onload = function(e) {
			img.src = e.target.result;
		}
		img.onload = function(e) {
			let md = Math.min(img.width, img.height);
			canvas.width = md;
			canvas.height = md;
			C.drawImage(img, md/2 - img.width/2, md/2 - img.height/2);
			var tiles = that.prepareTiles(C, pcs);
			that.postTiles(tiles);
		}
		fr.readAsDataURL(image);
	},

	prepareTiles(C, numTiles) {
		var tiles = [];
		var tileSize = Math.floor(C.canvas.width / numTiles);
		var i = 0;
		var editor = document.getElementById('image-editor');

		for(var y=0; y<numTiles; y++) {
			for(var x=0; x<numTiles; x++) {
				var tileData = C.getImageData(x * tileSize, y * tileSize, tileSize, tileSize);
				var tileCanvas = document.createElement('canvas');
				tileCanvas.width = tileCanvas.height = tileSize;
				tileCanvas.getContext('2d').putImageData(tileData, 0, 0);
				editor.appendChild(tileCanvas);
				tiles.push({
					id: x+':'+y,
					data: tileCanvas.toDataURL(),
					size: tileSize
				});
			}
		}

		return tiles;
	},

	postTiles(tiles) {
		for (var tile of tiles) {

			var data = new FormData();
			data.append("image", tile.data);
			data.append("tileSize", tile.size);

			fetch('/imagex', {
			//	mode: 'no-cors',
				method: "POST",
				body: data
			}).then(res => {
				
			});
		}
	},

	parseImage: function(event) {
		event.preventDefault();
		var imageData = event.target.image.files[0];
		//return this.segmentImage(imageData, 3);
		
		var data = new FormData();
		data.append("image", imageData);
		fetch('/imagex', {
			mode: 'no-cors',
			method: "POST",
			body: data
		}).then(res => {
			res.json().then(data => {
				// var promises = []
				
				// for(var key in data) {
				//     console.log('key: ', key);
				//     promises.push(new Promise(fetch(`https://www.dagbladet.no/mat/api/ingredients/${key}`, {mode: 'no-cors', method: "POST"}).then(console.log)))
				// }

				//Promise.all(promises).then(console.log).catch(console.log);

				fetch(`https://www.dagbladet.no/mat/api/ingredients/15`, {mode: 'no-cors', method: "GET"}).then(res => {
					console.log(res)
				}).catch(console.log)

				this.setState({
					ingredients: data
				})
			}).catch(err => {
				if(err) console.log(err)
			})
		})
	},

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1 className="main-heading text-primary">Recipe Search</h1>
					</div>
				</div>
				<div className="row">
					<Form submitHandler={this.parseImage} />
				</div>
				<div className="row">
					<RecipesData isLoading={this.isDataLoading}/>
				</div>
			</div>
		)
	}
})


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
