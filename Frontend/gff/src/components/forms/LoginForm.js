import React, { useContext } from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            User: [],
            userType: 'Admin',
            userName: '',
            password: '',
            errMsg: ''
        }
    }

    checkFields = (userName,password) => (userName&&password)? this.setState({errMsg:''}):this.setState({
        errMsg:"Username and password are required! Please fill them in",
        userName:'',
        password:''
    });
    checkUser(User){
        if(User) {
            this.setState({errMsg:''});
            return true;
        }
        else {
            this.setState({errMsg: "User does not exsits! please try again"});
            return false;
        }
    }

    async submit(event,userName,password,userType) {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        event.preventDefault();
        this.checkFields(userName,password);
        if(!(userName==='')){
                if(userType==="Admin")
                {
                    await axios.get(`http://localhost:8080/admin/auth/${userName}/${password}`)
                    .then((res) => {
                        this.setState({
                            User: res.data
                        })
                        {this.checkUser(this.state.User) && LogIn(this.state.User)};
                    });
                }
                else if(userType==="Coach")
                {
                    await axios.get(`http://localhost:8080/coach/auth/${userName}/${password}`)
                    .then((res) => {
                        this.setState({
                            User: res.data
                        })
                        {this.checkUser(this.state.User) && LogIn(this.state.User)};
                    });
                }
                else if(userType==="Sportsman")
                {
                    await axios.get(`http://localhost:8080/sportsman/auth/${userName}/${password}`)
                    .then((res) => {
                        this.setState({
                            User: res.data
                        })
                        {this.checkUser(this.state.User) && LogIn(this.state.User)};
                    });
                }
        }
        return isAuthenticated;
    }

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='form-content'>
                {isAuthenticated && (<Navigate to="/" replace={true} />)}
            <form className="form" onSubmit={(e)=>this.submit(e,this.state.userName,this.state.password,this.state.userType)}>
                <div className="logImg" />
                <p aria-live="assertive">{this.state.errMsg}</p>
                <h1>
                   Hey! Login to GoForFit
                </h1>
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        User Type
                    </label>
                    <select
                    value={this.state.userType} onChange={(e)=>this.setState({userType:e.target.value,
                    errMsg:''})} type="number"
                        id='usertype'
                         name='usertype'
                         className='form-input'
                         placeholder="Choose Type"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Coach">Coach</option>
                        <option value="Sportsman">Sportsman</option>
                    </select>
                    </div>
                <div className="form-inputs">
                    <label htmlFor="username" 
                    className="form-label">
                        Username
                    </label>
                    <input
                    value={this.state.userName} onChange={(e)=>this.setState({userName:e.target.value,
                        errMsg:''})} type="text"
                        id='username'
                         name='username'
                         className='form-input'
                         placeholder="Enter your username"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" 
                    className="form-label">
                        Password
                    </label>
                        <input
                        value={this.state.password} onChange={(e)=>this.setState({password:e.target.value,
                        errMsg:''})} type="password"
                        id='password'
                         name='password'
                         className='form-input'
                         placeholder="Enter your password"
                    />  
                </div>                       
                <button className="form-input-btn"
                    type='submit'>
                    Login
                </button>
            </form>
            </div>
        );
    }
}

LoginForm.contextType = UserContext

export default LoginForm;