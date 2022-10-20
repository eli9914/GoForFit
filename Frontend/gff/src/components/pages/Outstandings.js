import React from 'react'
import axios from 'axios';
import ReactPlayer from 'react-player';
import UserContext from '../../UserContext';
import './Pages.css';

class Outstandings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sportsmans:[],
            coaches:[]
        }
    }

    async fetchSportsmans()
    {
        await axios.get("http://localhost:8080/sportsman/getSportsman")
        .then((res) => {
            this.setState({sportsmans:res.data})
        })
    }

    async fetchCoaches()
    {
        await axios.get("http://localhost:8080/coach/getCoach")
        .then((res) => {
            this.setState({coaches:res.data})
        })
    }

    componentDidMount(){
        this.fetchSportsmans();
        this.fetchCoaches();
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <>
        <div className='best-sportsmans' align="center">
            <br/>
            <h1><u>Best Sportsmans</u></h1>
            <br/>
            <div className='best-sportsmans-container' align="center">
                {this.state.sportsmans.sort((a,b) => {
                                                        if (a.doneWorkouts.length < b.doneWorkouts.length) {
                                                            return 1;
                                                        } else if (b.doneWorkouts.length < a.doneWorkouts.length) {
                                                            return -1;
                                                        } else {
                                                            return 0;
                                                        }
                                                    })
                    .map(
                    sportsman => (
                        <h2>{sportsman.userName} Completed {sportsman.doneWorkouts.length} Workouts</h2>
                    )
                )}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        <div className='best-coaches' align="center">
        <br/>
        <h1><u>Best Coaches</u></h1>
        <br/>
        <div className='best-coaches-container' align="center">
            {this.state.coaches.sort((a,b) => {
                                                    if (a.rating < b.rating) {
                                                        return 1;
                                                    } else if (b.rating < a.rating) {
                                                        return -1;
                                                    } else {
                                                        return 0;
                                                    }
                                                })
                .map(
                coach => (
                    <h2>{coach.userName} Has A Rating Of {coach.rating} Stars</h2>
                )
            )}
        </div>
    </div>
    </div>
    </>
        )
    }
}

Outstandings.contextType = UserContext;

export default Outstandings;