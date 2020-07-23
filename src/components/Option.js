import React from 'react';
import { connect } from 'react-redux';
import { startRemoveOption } from '../actions/options';

export const Option = ({ option, count, startRemoveOption }) => (
    <div className="option">
        <p className="option__text">{count}. {option.description}</p>
        <button
            className="button button--link"
            onClick={
                () => startRemoveOption({ id: option.id })
            }
        >
            Remove
        </button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startRemoveOption: ({ id }) => dispatch(startRemoveOption({ id }))
});

export default connect(undefined, mapDispatchToProps)(Option);