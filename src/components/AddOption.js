import React from 'react';
import { connect } from 'react-redux';
import { startAddOption } from '../actions/options';
import optionExists from '../selectors/options';

export class AddOption extends React.Component {
    state = {
        error: undefined
    }

    handleAddOption = (e) => {
        e.preventDefault();
        const description = e.target.elements.option.value.trim();

        if(description === ''){
            this.setState(() => ({ error: 'Enter a valid value to add item' }));
        }
        else if(optionExists(this.props.options, description)){
            this.setState(() => ({ error: 'This option already exists' }));
        }
        else {
            const option = { description };
            this.props.startAddOption(option);
            e.target.elements.option.value = '';
            this.setState(()=>({error: undefined}));
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.error
                    &&
                    <p className="add-option-error">{this.state.error}</p>
                }
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        )
    }
};

const mapStateToProps = ({ options }) => ({
    options
});

const mapDispatchToProps = (dispatch) => ({
    startAddOption: (option) => dispatch(startAddOption(option))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOption);