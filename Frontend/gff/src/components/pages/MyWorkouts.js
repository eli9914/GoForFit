import React from 'react'
import ReactPlayer from 'react-player';
import UserContext from '../../UserContext';
import './Pages.css';

class MyWorkouts extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='sportsman-workouts' align="center">
            <br/>
            <h1>{user.firstName}&thinsp;{user.lastName} Workouts:</h1>
            <br/>
            <div className='coach-private-container' align="center">
                <div className='coach-private-videos' align="center">
                    <h1><u> {user.doneWorkouts.length} Done Workouts:</u></h1>
                    <br/>
                <table border="1">
                {user.doneWorkouts.length > 0 && user.doneWorkouts.map(workout => (
                <>
                <tr>
                        <th><ReactPlayer height='600px' width='900px' controls url={workout}/></th>
                    </tr>
                </>))}
                </table>
                </div>
            </div>
        </div>
        )
    }
}

MyWorkouts.contextType = UserContext;

export default MyWorkouts;