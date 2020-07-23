import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({startLogout}) => (
    <div className="header">
        <div className="container header__content">
            <div>
                <h1 className="header__title">Indecision</h1>
                <h2 className="header__subtitle">
                    Put your life in the hands of a computer
                </h2>
            </div>
            <button className="button button--link" onClick={startLogout}>Logout</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);