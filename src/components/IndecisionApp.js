import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Login from './Login';
import OptionModal from './OptionModal';
import Options from './Options';

export const IndecisionApp = ({ options, uid }) => {
    const [ selectedOption, setSelectedOption ] = useState(undefined);

    const handlePick = () => {
        const randomNum = Math.floor(Math.random()*options.length);
        const option = options[randomNum];

        setSelectedOption(option.description);
    }

    const handleClearSelectedOption = () => {
        setSelectedOption(undefined);
    }

    return (
        uid ?
        (
            <div>
                <Header />
                <div className="container">
                    <Action
                        handlePick={handlePick}
                    />
                    <div className="widget">
                        <Options />
                        <AddOption />
                    </div>
                </div>
                <OptionModal
                    selectedOption={selectedOption}
                    handleClearSelectedOption={handleClearSelectedOption}
                />
            </div>
        )
        :
        (
            <Login />
        )
    )
}

const mapStateToProps = ({ options, auth }) => ({
    options,
    uid: auth.uid
});

export default connect(mapStateToProps)(IndecisionApp);