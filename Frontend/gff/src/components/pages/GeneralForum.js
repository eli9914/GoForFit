import axios from 'axios';
import React from 'react'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

class GeneralForum extends React.Component {
    constructor(props){
        super(props);
        this.state = 
        {
            messages_toGeneralForum:[]
        }
    }

    refreshPage() {
        window.location.reload(false);
    }

    async fetchMessages_toGeneralForum()
    {
        const to = "General Forum"
        await axios.get(`http://localhost:8080/messages/getReceiver/${to}`)
        .then((res) => {this.setState({
            messages_toGeneralForum:res.data
        })})
    }

    componentDidMount()
    {
        this.fetchMessages_toGeneralForum();
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='forum-container'>
        {user.type === "Admin" && 
        <>
        <div className='newpost'>
            <Link className='postButton' to='/newPost'>&thinsp;New Post&thinsp;</Link>
        </div> 
        <div className='forum-container1'>
                <br/>
                <h1>General Forum</h1>
                <br/>
                {this.state.messages_toGeneralForum.map(message => (
                <>
                    <u>From: {message.from}</u>
                    <br/>
                    <br/>
                    {message.content}
                    <br />
                    <br/>
                </>))}
                </div>
                </>}
        {user.type !== "Admin" && 
        <div className='forum-container2'>
                <br/>
                <h1>General Forum</h1>
                <br/>
                {this.state.messages_toGeneralForum.map(message => (
                <>
                    <u>From: {message.from}</u>
                    <br/>
                    <br/>
                    {message.content}
                    <br />
                    <br/>
                </>))}
                </div>}
        </div>
        )
    }
}

GeneralForum.contextType = UserContext;

export default GeneralForum;