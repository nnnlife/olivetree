import React from 'react';


export default class Login extends React.Component {
    render() {
        return (
            <div>
                <form action='/login' method='post'>
                    <input type='text' name='username'></input>
                    <input type='password' name='password'></input>
                    <button type='submit'>Login</button>
                </form>
                <a href='/auth/google'>Login using Google ID</a>
                <form action='/register' method='post'>
                    <input type='text' name='username'></input>
                    <input type='password' name='password'></input>
                    <button type='submit'>Register</button>
                </form>
            </div>
        );
    }
}