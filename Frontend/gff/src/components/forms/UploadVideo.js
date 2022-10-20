import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class UploadVideo extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            type:'Beginner',
            url: '',
            description: '',
            uploaded: false
        }
    }

    async submit(event,userName,type,url,description) {
        event.preventDefault();
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        if(!(description==='' && url==='')){
            if(type==="Beginner")
            {
                await axios.post(`http://localhost:8080/coach/uploadBeginnerWeeklySessions/${userName}/${description}`,url)
                .then((res) => {
                    LogIn(res.data)
                    this.setState({
                        uploaded:true
                    })
                })
            }
            else if(type==="Semi-Pro")
            {
                await axios.post(`http://localhost:8080/coach/uploadSemiProWeeklySessions/${userName}/${description}`,url)
                .then((res) => {
                    LogIn(res.data)
                    this.setState({
                        uploaded:true
                    })
                })
            }
            else if(type==="Professional")
            {
                await axios.post(`http://localhost:8080/coach/uploadProfessionalWeeklySessions/${userName}/${description}`,url)
                .then((res) => {
                    LogIn(res.data)
                    this.setState({
                        uploaded:true
                    })
                })
            }
            else if(type==="Motivation")
            {
                await axios.post(`http://localhost:8080/coach/uploadWeeklyMotivation/${userName}`,url)
                .then((res) => {
                    LogIn(res.data)
                    this.setState({
                        uploaded:true
                    })
                })
            }
        }
    }

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='upload-vid-form-content'>
                {this.state.uploaded && (<Navigate to="/coach/profile" replace={true} />)}
            <form className="upload-vid-form" onSubmit={(e)=>this.submit(e,user.userName,this.state.type,this.state.url,this.state.description)}>
                <h1>
                   Hey {user['userName']}! Upload Weekly Video:  
                </h1>
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Choose Type
                    </label>
                    <select
                        value={this.state.type} onChange={(e)=>this.setState({type:e.target.value})} type="text"
                        id='type'
                        name='type'
                        className='form-input'>
                        <option value="Beginner">Beginner</option>
                        <option value="Semi-Pro">Semi-Pro</option>
                        <option value="Professional">Professional</option>
                        <option value="Motivation">Motivation</option>
                    </select>
                    </div>
                <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Url
                    </label>
                        <input
                        value={this.state.url} onChange={(e)=>this.setState({url:e.target.value})} type="text"
                        id='url'
                         name='url'
                         className='form-input'
                         placeholder="Url"
                    />  
                </div>  
                {this.state.type!="Motivation" && <div className="form-inputs">
                    <label htmlFor="usertype" 
                    className="form-label">
                        Description
                    </label>
                    <input
                    value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})} type="text"
                        id='description'
                         name='description'
                         className='form-input'
                         placeholder="Please Add A Description/Explanation"
                    />
                </div>}                     
                <button className="form-input-btn"
                    type='submit'>
                    Upload
                </button>
            </form>
            </div>
        );
    }
}

UploadVideo.contextType = UserContext;

export default UploadVideo;