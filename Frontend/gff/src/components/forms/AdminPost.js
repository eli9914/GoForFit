import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class AdminPost extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            content: '',
            to: 'General Forum',
            sent: false
        }
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
                sent:true
        })
        );   
}}

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='messages-form-content'>
                {this.state.sent && (<Navigate to="../generalForum" replace={true} />)}
            <form className="messageForm" onSubmit={(e)=>this.submit(e,this.state.content,this.state.to)}>
                 <h1>
                   New Post
                </h1>
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
                    Post
                </button>
            </form>
            </div>
        );
    }
}

AdminPost.contextType=UserContext;

export default AdminPost;