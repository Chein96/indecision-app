import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { startAddOption } from '../actions/options';
import optionExists from '../selectors/options';

export const AddOption = ({ options, startAddOption }) => {
    const [ error, setError ] = useState(undefined);

    const handleAddOption = (e) => {
        e.preventDefault();
        const description = e.target.elements.option.value.trim();

        if(description === ''){
            setError('Enter a valid value to add item');
        }
        else if(optionExists(options, description)){
            setError('This option already exists');
        }
        else {
            const option = { description };
            startAddOption(option);
            e.target.elements.option.value = '';
            setError(undefined);
        }
    }

    return (
        <Fragment>
            {
                error
                &&
                <p className="add-option-error">{error}</p>
            }
            <form className="add-option" onSubmit={handleAddOption}>
                <input className="add-option__input" type="text" name="option"/>
                <button className="button">Add Option</button>
            </form>
        </Fragment>
    )
}

const mapStateToProps = ({ options }) => ({
    options
});

const mapDispatchToProps = (dispatch) => ({
    startAddOption: (option) => dispatch(startAddOption(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOption);