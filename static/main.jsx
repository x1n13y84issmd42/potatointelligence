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
            <form onSubmit={this.props.submitHandler}>
                <div className="form-group">
                    <label htmlFor="imageUpload">Email address</label>
                    <input type="file" name="image" className="form-control" id="imageUpload" placeholder="Choose Image" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
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

    parseImage: function(event) {
        event.preventDefault();
        var data = new FormData();
        var imageData = event.target.image.files[0];
        data.append("image", imageData);
        fetch('/image', {
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
