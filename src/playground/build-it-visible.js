class VisibilityToggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visibility: false
        }
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    }

    handleToggleVisibility(){ 
        this.setState(({visibility}) => ({visibility:!visibility}));
    }

    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>
                    {this.state.visibility ? 'Hide details' : 'Show details'}
                </button>
                {
                    this.state.visibility && <p>These are the details!</p>
                }
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'));