import React, { Component } from "react";

const UserContext = React.createContext();

export class UserProvider extends Component{
    state = {
        user : [],
        isAuthenticated: false
    }

    LogIn = (loggedUser) => {
        this.setState({user: loggedUser, isAuthenticated: true}, () => console.log(this.state.user));
    }

    LogOut = () => {
        this.setState({user: [], isAuthenticated: false});
    }

    render(){
        const {user,isAuthenticated} = this.state;
        const {LogIn,LogOut} = this;
        return(
        <UserContext.Provider value={{
            user,
            isAuthenticated,
            LogIn,
            LogOut
        }}>
            {this.props.children}
        </UserContext.Provider>
        )
    }
}

export default UserContext;