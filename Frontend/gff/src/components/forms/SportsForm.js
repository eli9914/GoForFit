import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class SportsForm extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            name: '',
            description: '',
            coach: '',
            added: false
        }
    }

async submit(event,name,description,coach) {
    event.preventDefault();
    if(!(name==='' && description==='' && coach==='')){
        await axios.post("http://localhost:8080/sports/add",{
            name:this.state.name,
            description:this.state.description,
            coach:this.state.coach
        })
        .then(
            this.setState({
                name:'',
                description:'',
                coach:'',
                added:true
        })
        );
    
}}

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='sport-form-content'>
                {this.state.added && (<Navigate to="../editSports" replace={true} />)}
            <form className="sportform" onSubmit={(e)=>this.submit(e,this.state.name,this.state.description,this.state.coach)}>
                 <h1>
                   Hey! {user.userName} Please Add Sport
                </h1>
                <div className="form-inputs">
                    <label htmlFor="name" 
                    className="form-label">
                        Sports Name
                    </label>
                    <input
                    value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="text"
                        id='name'
                         name='name'
                         className='form-input'
                         placeholder="Enter Sports Name"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="description" 
                    className="form-label">
                        Description
                    </label>
                    <input
                    value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})} type="text"
                        id='description'
                         name='description'
                         className='form-input'
                         placeholder="Enter Description"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="coach" 
                    className="form-label">
                        Coach In Charge
                    </label>
                    <input
                    value={this.state.coach} onChange={(e)=>this.setState({coach:e.target.value})} type="text"
                        id='coach'
                         name='coach'
                         className='form-input'
                         placeholder="Enter Coach Name"
                    />
                </div>
                <button className="form-input-btn"
                    type='submit'>
                    Add
                </button>
            </form>
            </div>
        );
    }
}

SportsForm.contextType=UserContext;

export default SportsForm;