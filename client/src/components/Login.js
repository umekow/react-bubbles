import React, {useState, useEffect} from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Redirect } from 'react-router-dom'; 
class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 state = {
   credentials: {username: '', 
   password: ''}
  }
  
  onChange = e => {
    this.setState({
     credentials : {
       ...this.state.credentials, 
       [e.target.name] : e.target.value 
     }
    }); 

      
  }

  onSubmit = e => {
    e.preventDefault(); 
    axiosWithAuth
    .post("/api/login",this.state.credentials)
    .then(
      r=> {
        console.log(r.data); 
        localStorage.setItem('token', r.data.payload); 
        this.props.history.push('/protected'); 
      }
    )
  }
  render() {
    
    return(
    <div className="form-container">
      <form onSubmit={this.onSubmit} className="login">
        <input 
          type="text"
          name="username"
          value={this.state.username}
          placeholder="username"
          onChange={this.onChange}
        />

        <input 
          type="password"
          name="password"
          value={this.state.password}
          placeholder="password"
          onChange={this.onChange}
          />

          <button>Login</button>
      </form>
    </div>
  );
    }
}

export default Login;
