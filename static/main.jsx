var ProgressImage = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-2 offset-sm-5">
					<img src="/static/loading.gif" width="200" height="200" id="preloadergif"/>
				</div>
			</div>
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
		
		if (this.props.isLoading) {
			return <div><TitleLine title="Looking for related recipes" /><ProgressImage /></div>
		} else if (this.props.recipes) {
			var contents = this.props.recipes.map((r) => {
				return (
				<div class="row">
					<div class="col-sm-6">
						<a href="http://dagbladet.no/mat/oppskrifter"><img src={r.image} alt=""/></a>
					</div>
					<div class="col-sm-6">
						<a href="http://dagbladet.no/mat/oppskrifter">{r.name}</a>
					</div>
				</div>
				);
			});

			return (
				<div className="row">
					<div className="col-sm-12">
						<TitleLine title="Related recipes" />
						{contents}
					</div>
				</div>
			)
		}

		return (<div className="row inglist"><div className="col-sm-12"></div></div>);
	}
});

var Preview = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-sm-12">
				<div id="preview" onClick={() => {document.getElementById('imageUpload').click()}}>
					<img id="previewImg" src="" alt=""/>
				</div>
				</div>
			</div>
		)
	}
});

var IngredientList = React.createClass({
	render: function() {
		
		if (this.props.isLoading) {
			return <div><TitleLine title="Recognizing ingredients" /><ProgressImage /></div>
		} else if (this.props.ingredients.length) {
			var ingredients = '';
			var ingrs = [];
			for (var iI in this.props.ingredients) {
				var ing = this.props.ingredients[iI];
				var s = {zoom:1/*ing.score*/};
			//	ingrs.push((<a href={'https://www.dagbladet.no/mat/ingrediens/' + ing.id} style={s}>{ing.name} ({ing.score.toFixed(2)})</a>));
				ingrs.push((<a href={'https://www.dagbladet.no/mat/ingrediens/' + ing.id} style={s} key={ing.id}>{ing.name}</a>));
			};

			ingrs.push((<div className="clear"></div>));

			if (ingrs.length) {
				ingredients = (<div><TitleLine title="Recognized ingredients" />{ingrs}</div>);
			}
			return (
				<div className="row inglist">
					<div className="col-sm-12">
						{ingredients}
					</div>
				</div>
			)
		}

		return (<div className="row inglist"><div className="col-sm-12"></div></div>);
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
								<div className="col-sm-8">
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
									<input type="number" name="numTiles" className="form-control" id="numTiles" placeholder="3"/>
								</div>
								<div className="col-sm-2">
									<label></label>
									<button type="submit" className="btn btn-primary">Submit</button>									
								</div>
							</div>
						</div>
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

	var topPerc = 0.6;
	var threshold = res[res.length - 1].score + (res[0].score - res[res.length - 1].score) * (1.0 - topPerc);

	res = res.filter((v) => {
		return v.score >= threshold;
	});

	return res;
}

var App = React.createClass({
	getInitialState: function() {
		return {
			recipesLoading: false,
			ingredientsLoading: false,
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

	loadRecipes: function(ingredients) {
		this.setState({
			recipesLoading: true
		});

		var pRecipes = [];

		for (var ing of ingredients) {
			console.log(`Fetching https://www.dagbladet.no/mat/api/ingredients/${ing.id}`);
			pRecipes.push(fetch(`https://www.dagbladet.no/mat/api/ingredients/${ing.id}`, {mode: 'no-cors', method: "GET"}));
		}

		
		Promise.all(pRecipes).then((responses) => {
			var jsons = [];

			for (var resp of responses) {
				resp.json().then(data => {
					jsons.push(data);
				}).catch(err => {
					console.log('RESP err', err);
				})
			}

			setTimeout(() => {
				console.log('TIMEOUT', jsons)
			}, 500);
		}).catch(err => {
			console.log('RECIPES err', err)
		});
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

		this.setState({ingredientsLoading: true});

		fetch('/imagex', {
			mode: 'no-cors',
			method: "POST",
			body: data
		}).then(res => {
			this.setState({ingredientsLoading: false});

			res.json().then(data => {
				/* fetch(`https://www.dagbladet.no/mat/api/ingredients/15`, {mode: 'no-cors', method: "GET"}).then(res => {
					console.log(res)
				}).catch(console.log) */

				var ingredients = convertScores(data);
				this.loadRecipes(ingredients);

				this.setState({
					ingredients: ingredients
				});
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

				<Form submitHandler={this.parseImage} changeHandler={this.onFileChange} />

				<IngredientList isLoading={this.state.ingredientsLoading} ingredients={this.state.ingredients} />

				<RecipesData isLoading={this.state.recipesLoading} ingredients={this.state.ingredients} />
				<div id="preloadergif" className="hidden"></div>
			</div>
		)
	}
})


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
