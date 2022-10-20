import React from "react";
import './Form.css';
import axios from "axios";
import { Navigate } from "react-router-dom";

class CoachForm extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Coach: [],
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
            licenseNumber: '',
            workPlaceId: '',
            sportKind: '',
            signed:false
        }
    }

    submit(event,userName){
        event.preventDefault();
        if(!(userName==='')){
            axios.post("http://localhost:8080/coach/sign_up",{
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
                licenseNumber:this.state.licenseNumber,
                workPlaceId:this.state.workPlaceId,
                sportKind:this.state.sportKind
            }).then(()=>{
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
                                licenseNumber: '',
                                workPlaceId: '',
                                sportKind: '',
                                signed:true
                            })
            });
        }
    }

    render(){
        return (
            <div className='form-content'>
                {this.state.signed && (<Navigate to="/" replace={true} />)}
            <form className="form" onSubmit={(e)=>this.submit(e,this.state.userName)}>
                <h1>
                   Hey Coach! get started with us today! Create your
                   account by filling out the information below.
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
                    <label htmlFor="license-number" 
                    className="form-label">
                         License Number
                    </label>
                        <input
                        value={this.state.licenseNumber} onChange={(e)=>this.setState({licenseNumber:e.target.value})} type="text"
                        id='license-number'
                         name='license-number'
                         className='form-input'
                         placeholder="Enter your License Number"
                         />
                </div>
                <div className="form-inputs">
                    <label htmlFor="workPlaceId" 
                    className="form-label">
                         Work Place ID
                    </label>
                        <input
                        value={this.state.workPlaceId} onChange={(e)=>this.setState({workPlaceId:e.target.value})} type="text"
                        id='workPlaceId'
                         name='workPlaceId'
                         className='form-input'
                         placeholder="Enter your Work Place ID"
                         />
                </div>
                <div className="form-inputs">
                    <label htmlFor="sport-kind" 
                    className="form-label">
                         Sports Profession
                    </label>
                        <input
                        value={this.state.sportKind} onChange={(e)=>this.setState({sportKind:e.target.value})} type="text"
                        id='sport-kind'
                         name='sport-kind'
                         className='form-input'
                         placeholder="Enter your Sports Profession"
                         />
                </div>
                <button className="form-input-btn"
                    type='submit'>
                    Sign up
                </button>
            </form>
            </div>
        );
    }
}

export default CoachForm;