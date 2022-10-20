import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = 
        {
            Coach: [],
            Sportsman: [],
        }
    }

    refreshPage() {
        window.location.reload(false);
    }

    async deleteCoach(userName)
    {
        await axios.delete(`http://localhost:8080/coach/deleteCoach/${userName}`).
        then(this.componentDidMount());
    }
    async deleteSportsman(userName)
    {
        await axios.delete(`http://localhost:8080/sportsman/deleteSportsman/${userName}`).
        then(this.componentDidMount());
    }


    FetchCoaches() {
        axios.get("http://localhost:8080/coach/getCoach")
        .then((res) => {
            this.setState({
                Coach: res.data
            })
        });
    }

    FetchSportsmans() {
        axios.get("http://localhost:8080/sportsman/getSportsman")
        .then((res) => {
            this.setState({
                Sportsman: res.data
            })
        });
    }

    componentDidMount(){
        this.FetchCoaches();
        this.FetchSportsmans();
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='users'>
            <h1 align="center"><u>System Users</u></h1>
            <br/>
            <div className='users-container' align="center">
                <h2 align="center">Coaches</h2>
                <table border="1">
                    <tr>
                        <th className='header1'>&thinsp; Name &thinsp;</th>
                        <th className='header1'>&thinsp; User Name &thinsp;</th>
                        <th className='header1'>&thinsp; Email &thinsp;</th>
                        <th className='header1'>&thinsp; License Number &thinsp;</th>
                        <th className='header1'>&thinsp; Work Place ID &thinsp;</th>
                        <th className='header1'>&thinsp; Options &thinsp;</th>

                    </tr>
                    {this.state.Coach.map(coach => (
                    <>
                    <tr>
                    
                    <th>&thinsp;{coach['firstName']} {coach['lastName']}&thinsp;</th>
                    <th>&thinsp;{coach['userName']}&thinsp;</th>
                    <th>&thinsp;{coach['email']}&thinsp;</th>
                    <th>&thinsp;{coach['licenseNumber']}&thinsp;</th>
                    <th>&thinsp;{coach['workPlaceId']}&thinsp;</th>
                    <th>&thinsp;<button className='deleteButton' onClick={() => this.deleteCoach(coach['userName']) && this.refreshPage()}>Delete</button>&thinsp;</th>
                    </tr>
                    </> ))}

                   
               
                </table>
                
                <br/><br/>
                <h2 align="center">Sportsmans</h2>
                <table border="1">
                    <tr>
                        <th className='header1'>&thinsp; Name &thinsp;</th>
                        <th className='header1'>&thinsp; User Name &thinsp;</th>
                        <th className='header1'>&thinsp; Email &thinsp;</th>
                        <th className='header1'>&thinsp; Options &thinsp;</th>
                    </tr>
                    {this.state.Sportsman.map(sportsman => (
                    <>
                    <tr>
                    
                    <th>&thinsp;{sportsman['firstName']} {sportsman['lastName']}&thinsp;</th>
                    <th>&thinsp;{sportsman['userName']}&thinsp;</th>
                    <th>&thinsp;{sportsman['email']}&thinsp;</th>
                    <th>&thinsp;<button className='deleteButton' onClick={() => this.deleteSportsman(sportsman['userName']) && this.refreshPage()}>Delete</button>&thinsp;</th>

                    </tr>
                    </> ))}

                   
               
                </table>
                <br/>
                <br/>
                <br/>

                <Link className='addCoach' to="../addCoach" >&thinsp;Add New Coach&thinsp;</Link>&emsp;&emsp;
                <Link className='addSportsman' to="../addSportsman" >&thinsp;Add New Sportsman&thinsp;</Link>&emsp;&emsp;               
            </div>
        </div>
    )
    }
}

Users.contextType = UserContext

export default Users