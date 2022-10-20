import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class AddInjury extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            row: 1,
            name: '',
            causedBy: '',
            treatment: '',
            added: false
        }
    }

componentDidMount()
{
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    if(user.commonInjuries[this.state.row][0] && user.commonInjuries[this.state.row][1] && user.commonInjuries[this.state.row][2])
    {
        this.setState({name: user.commonInjuries[this.state.row][0], causedBy:user.commonInjuries[this.state.row][1], treatment:user.commonInjuries[this.state.row][2]})
    }
}

async submit(event,userName,row,name,causedBy,treatment) {
    event.preventDefault();
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    if(!(name==='' && causedBy==='' && treatment==='')){
        await axios.get(`http://localhost:8080/coach/addCommonInjury/${userName}/${name}/${causedBy}/${treatment}/${row}`)
        .then((res) => {
            this.setState({
                row: 1,
                name: '',
                causedBy: '',
                treatment: '',
                added:true
        })
        LogIn(res.data);
    });
}}

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='sport-form-content'>
                {this.state.added && (<Navigate to="../commonInjuries" replace={true} />)}
            <form className="sportform" onSubmit={(e)=>this.submit(e,user['userName'],this.state.row,this.state.name,this.state.causedBy,this.state.treatment)}>
                 <h1>
                   Hey! {user.userName} Please Add Injury
                </h1>
                <div className="form-inputs">
                    <label htmlFor="row" 
                    className="form-label">
                        Injury Number (Only 3 In Total)
                    </label>
                    <select
                    value={this.state.row} onChange={(e)=>this.setState({row:e.target.value,name:user.commonInjuries[e.target.value][0],
                        causedBy:user.commonInjuries[e.target.value][1],treatment:user.commonInjuries[e.target.value][2]})} type="number"
                        id='name'
                         name='name'
                         className='form-input'
                         placeholder="Enter Injury Name"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        </select>
                </div>
                <div className="form-inputs">
                    <label htmlFor="name" 
                    className="form-label">
                        Name
                    </label>
                    <input
                        value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="text"
                        id='name'
                         name='name'
                         className='form-input'
                         placeholder="Enter Injury Name"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="causedBy" 
                    className="form-label">
                        Caused By
                    </label>
                    <input
                    value={this.state.causedBy} onChange={(e)=>this.setState({causedBy:e.target.value})} type="text"
                        id='causedBy'
                         name='causedBy'
                         className='form-input'
                         placeholder="Caused By?"
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="treatment" 
                    className="form-label">
                        Treatment
                    </label>
                    <input
                    value={this.state.treatment} onChange={(e)=>this.setState({treatment:e.target.value})} type="text"
                        id='treatment'
                         name='treatment'
                         className='form-input'
                         placeholder="Recommended Treatment"
                    />
                </div>
                <button className="form-input-btn"
                    type='submit'>
                    Add/Update
                </button>
            </form>
            </div>
        );
    }
}

AddInjury.contextType=UserContext;

export default AddInjury;