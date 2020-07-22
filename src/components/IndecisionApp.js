import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

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

    handleAddOption = (option) => {
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

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState)=>({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }));
    }

    handleDeleteOptions = () => {
        this.setState(()=>({options:[]}));
    }

    handlePick = () => {
        const options = this.state.options;
        const randomNum = Math.floor(Math.random()*options.length);
        const option = options[randomNum];

        this.setState(()=>({selectedOption: option}));
    }

    handleClearSelectedOption = () => {
        this.setState(()=>({selectedOption: undefined}));
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            handleDeleteOption={this.handleDeleteOption}
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    }
};

export default IndecisionApp;