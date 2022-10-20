import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class MessageForm extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            admins:[],
            coaches:[],
            sportsmans:[],
            users:[],
            content: '',
            to: '',
            sent: false
        }
    }

    
async fetchAdmins()
{
    await axios.get("http://localhost:8080/admin/getAdmin")
    .then((res) => {
        this.setState({admins:res.data,users: this.state.users.concat(res.data),to:res.data[0].userName
        })
    })
}

async fetchCoaches()
{
    await axios.get("http://localhost:8080/coach/getCoach")
    .then((res) => {
        this.setState({coaches:res.data,users: this.state.users.concat(res.data)})
    })
}

async fetchSportsmans()
{
    await axios.get("http://localhost:8080/sportsman/getSportsman")
    .then((res) => {
        this.setState({sportsmans:res.data,users: this.state.users.concat(res.data)})
    })
}

componentDidMount()
{
    this.fetchAdmins();
    this.fetchCoaches();
    this.fetchSportsmans();
}

async submit(event,content,to) {
    event.preventDefault();
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    if(this.state.content!=''){
        await axios.post("http://localhost:8080/messages/saveMessage",{
            from:user.userName,
            content:this.state.content,
            to:this.state.to
        })
        .then(
            this.setState({
                content:'',
                to:'',
                sent:true
        })
        );   
}}

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='messages-form-content'>
                {this.state.sent && (<Navigate to="../messages" replace={true} />)}
            <form className="messageForm" onSubmit={(e)=>this.submit(e,this.state.content,this.state.to)}>
                 <h1>
                   New Message
                </h1>
                <div className="form-inputs">
                    <label htmlFor="to" 
                    className="form-label">
                        To
                    </label>
                    <select
                        value={this.state.to} onChange={(e)=>this.setState({to:e.target.value})} type="text"
                        id='to'
                        name='to'
                        className='form-input'>
                        {
                            this.state.users.map( _user => (_user.userName != user.userName &&
                                <option value={_user.userName}>{_user.userName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-inputs">
                    <label htmlFor="content" 
                    className="form-label">
                        Content
                    </label>
                    <input
                    value={this.state.content} onChange={(e)=>this.setState({content:e.target.value})} type="text"
                        id='content'
                         name='content'
                         className='form-input-content'
                    />
                </div>
                <button className="form-input-btn"
                    type='submit'>
                    Send
                </button>
            </form>
            </div>
        );
    }
}

MessageForm.contextType=UserContext;

export default MessageForm;