import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin } from '../actions/auth';

export const Login = ({ startGoogleLogin }) => (
    <main className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout-title">Indecision</h1>
            <p>Put your life in the hands of a computer.</p>
            <button className="button" onClick={startGoogleLogin}>Login with Google</button>
        </div>
    </main>
);

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(Login);