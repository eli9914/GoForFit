import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Pages.css';

class EditSports extends React.Component {
    constructor(props){
        super(props);
        this.state = 
        {
            Sports: [],
        }
    }

    refreshPage() {
        window.location.reload(false);
    }

    async deleteSport(name)
    {
        await axios.delete(`http://localhost:8080/sports/deleteSport/${name}`).
        then(this.componentDidMount());
    }

    async FetchSports() {
        await axios.get("http://localhost:8080/sports/getSports")
        .then((res) => {
            this.setState({
                Sports: res.data
            })
        });
    }

    componentDidMount(){
        this.FetchSports();
    }

    render() {
    const {user, isAuthenticated, LogIn, LogOut} = this.context;
    return (
        <div className='sports'>
            <h1><u>System Sports</u></h1>
            <br/>
            <div className='sports-container' align="center">
                <table border="1" >
                    <tr>
                        <th className='header1'>&thinsp;Name&thinsp;</th>
                        <th className='header1'>&thinsp;Description&thinsp;</th>
                        <th className='header1'>&thinsp;Coach&thinsp;</th>
                        <th className='header1'>&thinsp;Options&thinsp;</th>
                    </tr>
                        {this.state.Sports.map(sport => (
                        <>
                        <tr>
                        <th>&thinsp;{sport['name']}&thinsp;</th>
                        <th>&thinsp;{sport['description']}&thinsp;</th>
                        <th>&thinsp;{sport['coach']}&thinsp;</th>
                        <th><button className='deleteButton' onClick={() => this.deleteSport(sport['name']) && this.refreshPage()}>Delete</button></th>
                        </tr>
                        </> ))}
                </table>
                <br/>
                <br/>
                <br/>

                <Link className='addSport' to="../addSport" >&thinsp;Add Sport&thinsp;</Link>&emsp;&emsp;<Link className='updateSport' to="../updateSport" >&thinsp;Update Sport&thinsp;</Link>
            </div>

        </div>
    )
    }
}

EditSports.contextType = UserContext;

export default EditSports