import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { startRemoveAllOptions } from '../actions/options';
import Option from './Option';

export const Options = ({ options, startRemoveAllOptions }) => (
    <Fragment>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button 
                className="button button--link"
                onClick={startRemoveAllOptions}
            >
                Remove All
            </button>
        </div>
        {
            options.length === 0 
            && 
            <p className="widget__message">Please add an option to get started!</p> }
        {
            options.map(({ id, description }, index) => (
                <Option
                    key={id}
                    option={{ id, description }}
                    count={index + 1}
                />
            ))
        }
    </Fragment>
);

const mapStateToProps = ({ options }) => ({
    options
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveAllOptions: () => dispatch(startRemoveAllOptions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);