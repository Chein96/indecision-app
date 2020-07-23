import React from 'react';
import { connect } from 'react-redux';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Login from './Login';
import OptionModal from './OptionModal';
import Options from './Options';

class IndecisionApp extends React.Component {
    state = {
        selectedOption: undefined
    };

    handlePick = () => {
        const options = this.props.options;
        const randomNum = Math.floor(Math.random()*options.length);
        const option = options[randomNum];

        this.setState(() => ({
            selectedOption: option.description
        }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    render() {
        return (
            this.props.uid ?
            (
                <div>
                    <Header />
                    <div className="container">
                        <Action
                            handlePick={this.handlePick}
                        />
                        <div className="widget">
                            <Options />
                            <AddOption />
                        </div>
                    </div>
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                    />
                </div>
            )
            :
            (
                <Login />
            )
        )
    }
};

const mapStateToProps = ({ options, auth }) => ({
    options,
    uid: auth.uid
});

export default connect(mapStateToProps)(IndecisionApp);