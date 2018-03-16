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
                    <form>
                        <div className="form-group">
                            <label for="imageUpload">Email address</label>
                            <input type="file" className="form-control" id="imageUpload" placeholder="Choose Image" />
                            <input type="file" className="form-control" id="takePicture" placeholder="Take a picture" accept="image/*" capture="camera" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
})


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
