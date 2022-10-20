import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";

class AddSportsman extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Sports: [],
            Sportsman: [],
            userName: '',
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            year: 0,
            month: 0,
            day: 0,
            height: 0,
            weight: 0,
            phoneNumber: '',
            level: '',
            sportName: '',
            added:false
        }
    }

    async getSports() {
        await axios.get("http://localhost:8080/sports/getSports")
        .then(res => {
            this.setState({
                Sports:res.data,
                sportName:res.data[0].name
            })
        })
    }

    componentDidMount(){
        this.getSports();
    }

    async submit(event,userName){
        event.preventDefault();
        if(!(userName==='')) {
            await axios.post("http://localhost:8080/sportsman/sign_up",{
                userName:this.state.userName,
                email:this.state.email,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                yearOfBirth:this.state.year,
                monthOfBirth:this.state.month,
                dayOfBirth:this.state.day,
                height:this.state.height,
                weight:this.state.weight,
                phoneNumber:this.state.phoneNumber,
                level:this.state.level,
                sportName:this.state.sportName
            }).then(
                this.setState({
                    userName: '',
                    email: '',
                    password: '',
                    password2: '',
                    firstName: '',
                    lastName: '',
                    year: 0,
                    month: 0,
                    day: 0,
                    height: 0,
                    weight: 0,
                    phoneNumber: '',
                    level: '',
                    sportName: '',
                    added:true
                })
            );
        }
    }

    render(){
        const {user,isAuthenticated,LogIn,LogOut} = this.context;
            return (
            <div className='form-content'>
                {this.state.added && (<Navigate to="/users" replace={true} />)}
            <form className="form" onSubmit={(e)=>this.submit(e,this.state.userName)}>
                <h1>
                   Hey {user.userName}! add a new sportsman to the system by filling out the information below.
                </h1>
                <div className="form-inputs">
                    <label htmlFor="username" 
                    className="form-label">
                        Username
                    </label>
                    <input
                    value={this.state.userName} onChange={(e)=>this.setState({userName:e.target.value})} type="text"
                        id='username'
                         name='username'
                         className='form-input'
                         placeholder="Enter your username"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="email" 
                    className="form-label">
                        Email
                    </label>
                        <input
                        value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} type="text"
                        id='email'
                         name='email'
                         className='form-input'
                         placeholder="Enter your email"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" 
                    className="form-label">
                        Password
                    </label>
                        <input
                        value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} type="password"
                        id='password'
                         name='password'
                         className='form-input'
                         placeholder="Enter your password"
                    />                         
                </div>
                <div className="form-inputs">
                    <label htmlFor="password2" 
                    className="form-label">
                        Confirm Your Password
                    </label>
                        <input
                        value={this.state.password2} onChange={(e)=>this.setState({password2:e.target.value})} type="password"
                        id='password2'
                         name='password2'
                         className='form-input'
                         placeholder="Enter your password"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="firstName" 
                    className="form-label">
                        First Name
                    </label>
                        <input
                        value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})} type="text"
                        id='firstName'
                         name='firstName'
                         className='form-input'
                         placeholder="Enter your first name"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="lastName" 
                    className="form-label">
                        Last Name
                    </label>
                        <input
                        value={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})} type="text"
                        id='lastName'
                         name='lastName'
                         className='form-input'
                         placeholder="Enter your last name"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="yearOfBirth" 
                    className="form-label">
                        Year of Birth
                    </label>
                        <input
                        value={this.state.year} onChange={(e)=>this.setState({year:e.target.value})} type="number"
                        id='yearOfBirth'
                         name='yearOfBirth'
                         className='form-input'
                         placeholder="Enter your year of birth"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="monthOfBirth" 
                    className="form-label">
                        Month of Birth
                    </label>
                        <input
                        value={this.state.month} onChange={(e)=>this.setState({month:e.target.value})} type="number"
                        id='monthOfBirth'
                         name='monthOfBirth'
                         className='form-input'
                         placeholder="Enter your month of birth"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="dayOfBirth" 
                    className="form-label">
                        Day of Birth
                    </label>
                        <input
                        value={this.state.day} onChange={(e)=>this.setState({day:e.target.value})} type="number"
                        id='dayOfBirth'
                         name='dayOfBirth'
                         className='form-input'
                         placeholder="Enter your day of birth"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="height" 
                    className="form-label">
                         Height
                    </label>
                        <input
                        value={this.state.height} onChange={(e)=>this.setState({height:e.target.value})} type="number"
                        id='height'
                         name='height'
                         className='form-input'
                         placeholder="Enter your height"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="weight" 
                    className="form-label">
                         Weight
                    </label>
                        <input
                        value={this.state.weight} onChange={(e)=>this.setState({weight:e.target.value})} type="number"
                        id='weight'
                         name='weight'
                         className='form-input'
                         placeholder="Enter your weight"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="phone" 
                    className="form-label">
                         Phone
                    </label>
                        <input
                        value={this.state.phoneNumber} onChange={(e)=>this.setState({phoneNumber:e.target.value})} type="text"
                        id='phone'
                         name='phone'
                         className='form-input'
                         placeholder="Enter your phone"
                         />
                </div>
                <div className="form-inputs">
                    <label htmlFor="level" 
                    className="form-label">
                         Level
                    </label>
                         <select
                            value={this.state.level} onChange={(e)=>this.setState({level:e.target.value})} type="text"
                            id='level'
                            name='level'
                            className='form-input'>
                            <option value="Beginner">Beginner</option>
                            <option value="Semi-Pro">Semi-Pro</option>
                            <option value="Professional">Professional</option>
                        </select>
                </div>
                <div className="form-inputs">
                    <label htmlFor="level" 
                    className="form-label">
                         Sport
                    </label>
                    <select
                        value={this.state.sportName} onChange={(e)=>this.setState({sportName:e.target.value})} type="text"
                        id='sport'
                        name='sport'
                        className='form-input'>
                        {
                            this.state.Sports.map( Sport => (
                                <option value={Sport['name']}>{Sport['name']}</option>
                            ))
                        }
                    </select>
                </div>
                
          
                <button className="form-input-btn"
                    type='submit'>
                    Add
                </button>
                <span className="form-input-login">
                    Want to sign up as a Coach? click here! 
                    <a href="/coach/sign_up"> here</a>
                </span>
            </form>
            </div>
        );
    }
}

AddSportsman.contextType=UserContext;

export default AddSportsman;