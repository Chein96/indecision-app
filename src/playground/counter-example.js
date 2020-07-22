class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount(){
        let data = localStorage.getItem('count');
        if(!!data && !isNaN(data)){
            const count = parseInt(data);
            this.setState(()=>({count}));
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.count !== this.state.count){
            localStorage.setItem('count', this.state.count);
        }
    }
    
    handleAddOne() {
        this.setState(({count})=>({count: count+1}));
    }

    handleMinusOne() {
        this.setState(({count})=>({count: count-1}));
    }

    handleReset() {
        this.setState(()=>({count: 0}));
    }

    render() {
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
};

ReactDOM.render(<Counter />, document.getElementById('app'));