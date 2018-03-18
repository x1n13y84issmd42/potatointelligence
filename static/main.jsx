var ProgressImage = React.createClass({
	render: function() {
		return (
			<img src="/static/loading.gif" />
		)
	}
});

var TitleLine = React.createClass({
	render: function() {
		return (
			<h1 className="sc-VigVT mAYMh">{this.props.title}</h1>
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

var Preview = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-12">
				<div id="preview">
					<img id="previewImg" src="" alt=""/>
				</div>
				</div>
			</div>
		)
	}
});

var IngredientList = React.createClass({
	render: function() {

		var ingredients = [];
		if (this.props.ingredients) {
			for (var iI in this.props.ingredients) {
				var ing = this.props.ingredients[iI];
				var s = {zoom:ing.score};
				ingredients.push((<a href={'https://www.dagbladet.no/mat/ingrediens/' + ing.id} style={s}>{ing.name} ({ing.score.toFixed(2)})</a>));
			};
		}

		if (ingredients.length) {
			ingredients = (<div><TitleLine title="Recognized ingredients" /> {ingredients}</div>);
		}

		return (
			<div className="row inglist">
				<div className="col-sm-12">
					{ingredients}
				</div>
			</div>
		)
	}
});

var Form = React.createClass({
	render: function() {
		return (
			<div className="row">
			<div className="col-sm-12">
					<form onSubmit={this.props.submitHandler}>
						<div className="form-group">
						<div className="row">
							<div className="col-sm-10">
								<label htmlFor="imageUpload">Picture of your goods</label>
								<input
									type="file"
									name="image"
									className="form-control"
									id="imageUpload"
									placeholder="Choose Image"
									onChange={this.props.changeHandler}
								/>
							</div>
							<div className="col-sm-2">
								<label htmlFor="numTiles">Details</label>
								<input type="number" name="numTiles" className="form-control" id="numTiles" placeholder="2"/>
							</div>
						</div>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		)    
	}
})

const Data = {
	ingredients: {
		no: {
			'51': 'Salt',
			'78': 'Smør',
			'61': 'Svart pepper',
			'41': 'Hvetemel',
			'38': 'Egg',
			'40': 'Sukker (farin)',
			'52': 'Vann',
			'60': 'Olivenolje',
			'28': 'Hvitløk',
			'43': 'Kremfløte',
			'27': 'Melk',
			'108': 'Sitron',
			'675': 'Løk',
			'552': 'Råsukker',
			'42': 'Bakepulver',
			'174': 'Vaniljesukker',
			'15': 'Gulrot',
			'121': 'Sitronsaft',
			'62': 'Potet',
			'72': 'Rødløk',
			'233': 'Crème fraîche',
			'173': 'Melis',
			'21': 'Paprika',
			'185': 'Timian',
			'186': 'Hvitost (Gulost)',
			'140': 'Gjær',
			'93': 'Eggeplomme',
			'142': 'Sjalottløk',
			'141': 'Tomat',
			'17': 'Ingefær',
			'190': 'Fløte',
			'202': 'Mørk sjokolade',
			'137': 'Eple',
			'54': 'Honning',
			'97': 'Basilikum',
			'187': 'Kruspersille',
			'204': 'Kakaopulver',
			'193': 'Dill',
			'68': 'Lime',
			'172': 'Kremost',
			'36': 'Vårløk',
			'25': 'Rød chili',
			'171': 'Bacon',
			'57': 'Parmesan',
			'59': 'Mandler',
			'169': 'Yoghurt',
			'336': 'Purreløk',
			'44': 'Bringebær',
			'46': 'Jordbær',
			'227': 'Kanel',
		},

		en: {
			'51': 'Salt',
			'78': 'Butter',
			'61': 'Black pepper',
			'41': 'Flour',
			'38': 'Egg',
			'40': 'Sugar',
			'52': 'Water',
			'60': 'Olive oil',
			'28': 'Garlic',
			'43': 'Whipped cream',
			'27': 'Milk',
			'108': 'Lemon',
			'675': 'Onion',
			'552': 'Raw sugar',
			'42': 'Baking powder',
			'174': 'Vanilla sugar',
			'15': 'Carrot',
			'121': 'Lemon juice',
			'62': 'Potato',
			'72': 'Red onions',
			'233': 'Crème fraîche',
			'173': 'Melis',
			'21': 'Paprika',
			'185': 'Timian',
			'186': 'White cheese (Gulost)',
			'140': 'Yeast',
			'93': 'Eggplomme',
			'142': 'Shallot',
			'141': 'Tomato',
			'17': 'Ginger',
			'190': 'Cream',
			'202': 'Dark chocolate',
			'137': 'Apples',
			'54': 'Honey',
			'97': 'Basilicum',
			'187': 'Parsley',
			'204': 'Cocoa powder',
			'193': 'Dill',
			'68': 'Lime',
			'172': 'Cream cheese',
			'36': 'Onions',
			'25': 'Red chili',
			'171': 'Bacon',
			'57': 'Parmesan',
			'59': 'Mandler',
			'169': 'Yoghurt',
			'336': 'Leek',
			'44': 'Raspberry',
			'46': 'Strawberries',
			'227': 'Cinnamon',
		}
	}
};

function convertScores(scores) {
	var res = [];

	for (var sI in scores) {
		res.push({
			name: Data.ingredients.en[sI],
			score: scores[sI],
			id: sI
		});
	}

	res.sort(function(a, b){
		return b.score - a.score;
	});

	return res;
}

var App = React.createClass({
	getInitialState: function() {
		return {
			isDataLoading: false,
			ingredients: [],
			recipes: []
		}
	},

	onFileChange: function(event) {
		var fr = new FileReader();
		fr.onload = function () {
			document.getElementById('previewImg').src = fr.result;
		}
		fr.readAsDataURL(event.target.files[0]);
	},

	parseImage: function(event) {
		event.preventDefault();
		var imageData = event.target.image.files[0];

		this.setState({
			image: imageData
		})

		var numTiles = ~~document.getElementById('numTiles').value;

		var data = new FormData();
		data.append("image", imageData);
		data.append("numTiles", numTiles || 3);

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
					ingredients: convertScores(data)
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
						<TitleLine title="Recipe search" />
					</div>
				</div>

				<Preview />

				<Form submitHandler={this.parseImage} changeHandler={this.onFileChange}/>

				<IngredientList ingredients={this.state.ingredients}/>

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
