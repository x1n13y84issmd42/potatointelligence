var Form = React.createClass({

    handleSubmit: function(event) {
        event.preventDefault();
        var data = new FormData();
        var imageData = event.target.image.files[0];
        data.append("image", imageData);
        fetch('/image', {
            mode: 'no-cors',
            method: "POST",
            body: data
        }).then(res => console.log)

        console.log('handle submit function!');
        console.log(event.target.image.files[0])
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
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
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="main-heading text-primary">Recipe Search</h1>
                    </div>
                </div>
                <div className="row">
                    <Form />
                </div>
            </div>
        )
    }
})


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
