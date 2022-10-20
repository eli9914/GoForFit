import React from "react";
import './Form.css';
import axios from "axios";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";


class CoachForumPost extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Coaches: [],
            coachUserName:'',
            content: '',
            to: '',
            sent: false
        }
    }

    FetchCoaches() {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        axios.get("http://localhost:8080/coach/getCoach")
        .then((res) => {
            res.data.map(coach => (
                user.type==="Sportsman" && coach.sportKind===user.sport?this.setState({
                    Coaches:res.data,
                    coachUserName:coach.userName,
                    to:coach.userName + " Forum"
                }):this.setState({
                    Coaches:res.data,
                })
            ))
        });
    }

    componentDidMount(){
        this.FetchCoaches();
    }

    async submit(event,content,to) {
        event.preventDefault();
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        if(this.state.content!='' && user.type==="Sportsman"){
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
        if(this.state.content!='' && user.type==="Coach"){
            await axios.post("http://localhost:8080/messages/saveMessage",{
                from:user.userName,
                content:this.state.content,
                to:user.userName + " Forum"
            })
            .then(
                this.setState({
                    content:'',
                    sent:true
            })
            );   
        }
    }

    render(){
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        return (
            <div className='messages-form-content'>
                {this.state.sent && (<Navigate to="../coach/profile" replace={true} />)}
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

CoachForumPost.contextType=UserContext;

export default CoachForumPost;