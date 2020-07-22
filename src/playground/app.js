class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: []
        }
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if(options) {
                this.setState(()=>({options}));
            }
        }
        catch(e) {
            // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item';
        }
        else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState(({options})=>({
            options: [
                ...options,
                option
            ]
        }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState)=>({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }));
    }

    handleDeleteOptions() {
        this.setState(()=>({options:[]}));
    }

    handlePick() {
        const options = this.state.options;
        const randomNum = Math.floor(Math.random()*options.length);
        const option = options[randomNum];

        alert(option);
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    handleDeleteOption={this.handleDeleteOption}
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        )
    }
};

const Header = (props) => (
    <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
);

Header.defaultProps = {
    title: 'Indecision App'
};

const Action = (props) => (
    <div>
        <button
            disabled={!props.hasOptions}
            onClick={props.handlePick}
        >
            What should I do?
        </button>
    </div>
);

const Options = (props) => (
    <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started!</p> }
        {
            props.options.map((option) => (
                <Option
                    key={option}
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
    </div>
);

const Option = (props) => (
    <div>
        {props.optionText}
        <button onClick={() => props.handleDeleteOption(props.optionText)}>Remove</button>
    </div>
);

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: undefined
        }
        this.handleAddOption = this.handleAddOption.bind(this);
    }

    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(()=>({error}));
        
        if(!error){
            e.target.elements.option.value = '';
        }
    }

    render() {
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));