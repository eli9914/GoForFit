import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

class CommonInjuries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            injuries: [],
            sportType:''
        }
    }

    refreshPage() {
        window.location.reload(false);
    }

    async FetchInjuries() {
        const {user, isAuthenticated, LogIn, LogOut} = this.context;
        if(user.type === "Sportsman")
        {
            await axios.get("http://localhost:8080/coach/getCoach")
            .then((res) => {
                res.data.map(coach => (
                    coach['sportKind']===user.sport && this.setState({injuries: coach['commonInjuries'],sportType: user.sport})
                ))
            });
        }
        else if(user.type === "Coach")
        {
            this.setState({injuries: user.commonInjuries,sportType: user.sportKind})
        }
    }

    componentDidMount(){
        this.FetchInjuries();
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='injuries'>
            <br/>
            <h1>{this.state.sportType} Most Common Injuries</h1>
            <br/>
            <br/>
            <div className='injuries-container' align="center">
                <table className='ci-table' border="1" >
                        {this.state.injuries.map(row => (row!=null &&
                        <>
                        <tr>
                        <th>&thinsp;{row[0]}&thinsp;</th>
                        <th>&thinsp;{row[1]}&thinsp;</th>
                        <th>&thinsp;{row[2]}&thinsp;</th>
                        </tr>
                        </> ))}
                </table>
                <br/>
                <br/>
                {user.type==="Coach" &&
                <Link className='adInjury' to="../addInjury" >Add/Update Injuries</Link>}
            </div>
        </div>
    )
    }
}

CommonInjuries.contextType = UserContext;

export default CommonInjuries;