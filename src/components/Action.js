import React from 'react';
import { connect } from 'react-redux';

export const Action = ({ handlePick, hasOptions }) => (
    <div>
        <button
            className="big-button"
            disabled={!hasOptions}
            onClick={handlePick}
        >
            What should I do?
        </button>
    </div>
);

const mapStateToProps = ({ options }) => ({
    hasOptions: options.length > 0
});

export default connect(mapStateToProps)(Action);