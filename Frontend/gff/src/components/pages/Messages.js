import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state = 
        {
            messages_fromMe:[],
            messages_toMe:[]
        }
    }

    async fetchMessages_toMe()
    {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        await axios.get(`http://localhost:8080/messages/getReceiver/${user.userName}`)
        .then((res) => {this.setState({
            messages_toMe:res.data
        })})
    }

    async fetchMessages_toAdmin()
    {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        const admin = "Admin"
        await axios.get(`http://localhost:8080/messages/getReceiver/${admin}`)
        .then((res) => {this.setState({
            messages_toMe:this.state.messages_toMe.concat(res.data)
        })})
    }

    async fetchMessages_fromMe()
    {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        await axios.get(`http://localhost:8080/messages/getSender/${user.userName}`)
        .then((res) => {this.setState({
            messages_fromMe:res.data
        })})
    }

    async deleteMessage()
    {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        const admin = "Admin"
        await axios.delete(`http://localhost:8080/messages/deleteMessage/${user.userName}`).
        then(this.componentDidMount())
        if(user.type==="Admin")
        {
            await axios.delete(`http://localhost:8080/messages/deleteMessage/${admin}`).
            then(this.componentDidMount())
        }
    }

    componentDidMount()
    {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        this.fetchMessages_toMe();
        this.fetchMessages_fromMe();
        if(user.type==="Admin")
        {
            this.fetchMessages_toAdmin();
        }
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='messages-container' align="center">
        <div className='newMessage'>
            <Link className='postButton' to='/newMessage'>Send Message</Link>
        </div>
        <div className='messages-container1' align="center">
                <br/>
                <h1><u>Inbox</u></h1>
                <br/>
                {this.state.messages_toMe.map(message => (
                <>
                    <u>From: {message.from}</u>
                    <br/>
                    <br/>
                    {message.content}
                    <br />
                    <br/>
                </>))}
                <button className='emptyButton' onClick={() => this.deleteMessage()}>&thinsp;Empty Inbox&thinsp;</button>
                </div>
                <div className='messages-container2' align="center">
                <br/>
                <h1><u>Sent</u></h1>
                <br/>
                {this.state.messages_fromMe.map(message => (
                !message.to.includes("Forum")  && <>
                    <u>To: {message.to} </u>
                    <br/>
                    <br/>
                    {message.content}
                    <br/>
                    <br/>
                    <br/>
                </>))}
                </div>
    </div>
        )
    }
}

Messages.contextType = UserContext;

export default Messages;
