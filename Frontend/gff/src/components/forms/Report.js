import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class Report extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Coach:[],
            content: 'System Bug',
            otherContent:'',
            to:'Admin',
            sent: false
        }
    }

    FetchCoaches() {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        axios.get("http://localhost:8080/coach/getCoach")
        .then((res) => {
            res.data.map(coach => (
                user.sport===coach.sportKind?this.setState({
                    Coach:coach,
                }):null
            ))
        });
    }

    componentDidMount()
    {
        this.FetchCoaches()
    }

    async submit(event,content,to) {
        event.preventDefault();
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        if(this.state.content!=''){
            if(this.state.content!=="Other")
            {
                await axios.post("http://localhost:8080/messages/saveMessage",{
                    from:user.userName,
                    content:this.state.content,
                    to:this.state.to
                })
                .then(
                    this.setState({
                        content:'',
                        sent:true
                })
                ); 
            }
            else
            {
                await axios.post("http://localhost:8080/messages/saveMessage",{
                    from:user.userName,
                    content:this.state.otherContent,
                    to:this.state.to
                })
                .then(
                    this.setState({
                        content:'',
                        sent:true
                })
                ); 
            }  
    }}

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='reportToAdmin-form-content'>
                {this.state.sent && (<Navigate to="../" replace={true} />)}
            <form className="reportToAdmin" onSubmit={(e)=>this.submit(e,this.state.content,"Admin")}>
                 <h1>
                   Report on:
                </h1>
                <div className="form-inputs">
                    <label htmlFor="to" 
                    className="form-label">
                        To
                    </label>
                    <select
                    value={this.state.to} onChange={(e)=>this.setState({to:e.target.value})} type="text"
                        id='content'
                         name='content'
                         className='form-input'
                    >
                        <option value="Admin">Admin</option>
                        <option value={this.state.Coach.userName}>{this.state.Coach.userName}</option>
                    </select>
                </div>
                <div className="form-inputs">
                    <select
                    value={this.state.content} onChange={(e)=>this.setState({content:e.target.value})} type="text"
                        id='content'
                         name='content'
                         className='form-input'
                    >
                        <option value="System Bug">System Bug</option>
                        <option value="Unable to watch videos">Unable to watch videos</option>
                        <option value="Unable to send message">Unable to send message</option>
                        <option value="Unable to post to my coach forum">Unable to post to my coach forum</option>
                        <option value="Unable to see outstandings page">Unable to see outstandings page</option>
                        <option value="Unable to edit my profile">Unable to edit my profile</option>
                        <option value="Unable to see common injuies">Unable to see common injuies</option>
                        <option value="Other">Other</option>
                    </select>
                    {this.state.content==="Other" &&  <input
                    value={this.state.otherContent} onChange={(e)=>this.setState({otherContent:e.target.value})} type="text"
                        id='content1'
                         name='content1'
                         className='form-input-content1'
                    />}
                </div>
                <button className="form-input-btn"
                    type='submit'>
                    Report
                </button>
            </form>
            </div>
        );
    }
}

Report.contextType=UserContext;

export default Report;