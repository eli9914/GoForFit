import axios from 'axios';
import React from 'react'
import './Pages.css';

class OurCoaches extends React.Component {

    constructor(props){
        super(props);
        this.state = 
        {
            Coach: [],
        }
    }

    FetchCoaches() {
        axios.get("http://localhost:8080/coach/getCoach")
        .then((res) => {
            this.setState({
                Coach: res.data
            })
        });
    }

    componentDidMount(){
        this.FetchCoaches();
    }

    render() {
    return (
        <div className='coaches'>
            <div className='coaches-container'>
                <h1><u>GoForFit - Coaches</u></h1>
                <br/>
                {this.state.Coach.map(coach => (
                    <>
                    <div><u>Name:</u> {coach['firstName']} {coach['lastName']}&emsp;
                    <u>User Name:</u> {coach['userName']}&emsp;
                    <u>Email:</u> {coach['email']}&emsp;
                    <u>Born In:</u> {coach['dayOfBirth']}/{coach['monthOfBirth']}/{coach['yearOfBirth']}&emsp;
                    <u>Height:</u> {coach['height']}&emsp;
                    <u>Weight:</u> {coach['weight']}&emsp;
                    <br/>
                    <u>Phone Number:</u> {coach['phoneNumber']}&emsp;
                    <u>Profession:</u> {coach['sportKind']} Coach&emsp;
                    <u>License Number:</u> {coach['licenseNumber']}&emsp;
                    <u>Work Place ID:</u> {coach['workPlaceId']}&emsp;
                    <u>Rating:</u> {coach['rating']} Stars</div>
                    <br/>
                    <br/>
                    </>
                ))}
            </div>
        </div>
    )
    }
}

export default OurCoaches
