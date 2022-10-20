import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class UpdateSport extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Sports: [],
            Sport: [],
            name: '',
            description: '',
            coach: '',
        }
    }

    async FetchSports() {
        await axios.get("http://localhost:8080/sports/getSports")
        .then((res) => {
            this.setState({
                Sports:res.data,
            })
        });
    }

    async FetchSportById(name) {
        await axios.get(`http://localhost:8080/sports/getSport/${name}`)
        .then((res) => {
            this.setState({
                Sport: res.data,
                name:res.data['name'],
                description:res.data['description'],
                coach:res.data['coach']
            })
        });
    }
    

    componentDidMount(){
        this.FetchSports()
    }

    async submit(event,name,description,coach) {
        event.preventDefault();
        if(!(description==='' && coach==='')){
            await axios.get(`http://localhost:8080/sports/updateSport/${name}/${description}/${coach}`)
            .then(
                this.setState({
                    added:true
                })
            )
        }
    }

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='update-sport-form-content'>
                {this.state.added && (<Navigate to="/editSports" replace={true} />)}
            <form className="update-sportform" onSubmit={(e)=>this.submit(e,this.state.name,this.state.description,this.state.coach)}>
                <h1>
                   Hey {user['userName']}! Update Sport:  
                </h1>
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Choose Sport
                    </label>
                    <select
                        value={this.state.name} onChange={(e)=>this.FetchSportById(e.target.value)} type="text"
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
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Description
                    </label>
                    <input
                    value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})} type="text"
                        id='description'
                         name='description'
                         className='form-input'
                         placeholder=""
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Coach In Charge
                    </label>
                        <input
                        value={this.state.coach} onChange={(e)=>this.setState({coach:e.target.value})} type="text"
                        id='coach'
                         name='coach'
                         className='form-input'
                         placeholder=""
                    />  
                </div>                       
                <button className="form-input-btn"
                    type='submit'>
                    Update
                </button>
            </form>
            </div>
        );
    }
}

UpdateSport.contextType = UserContext;

export default UpdateSport;
