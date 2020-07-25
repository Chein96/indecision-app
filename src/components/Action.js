import React, { Fragment } from 'react';
import { connect } from 'react-redux';

export const Action = ({ handlePick, hasOptions }) => (
    <Fragment>
        <button
            className="big-button"
            disabled={!hasOptions}
            onClick={handlePick}
        >
            What should I do?
        </button>
    </Fragment>
);

const mapStateToProps = ({ options }) => ({
    hasOptions: options.length > 0
});

export default connect(mapStateToProps)(Action);