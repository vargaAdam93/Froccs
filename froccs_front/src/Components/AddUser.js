//AddUser.js

import React,{Component} from 'react';
import UserService from '../Components/UserService'

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: ''};

        this.addUserService = new UserService();

        this.NamehandleChange = this.NamehandleChange.bind(this);
        this.EmailhandleChange = this.EmailhandleChange.bind(this);
        this.PasswdhandleChange = this.PasswdhandleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    NamehandleChange(event)
    {
        this.setState({name: event.target.value});
    }

    EmailhandleChange(event)
    {
        this.setState({email: event.target.value});
    }


    PasswdhandleChange(event)
    {
        this.setState({password: event.target.value});
    }

    handleSubmit(event)
    {
        alert(this.state.name);
        event.preventDefault();
        this.addUserService.sendData(this.state);
        this.props.history.push('/');
    }

    render()
    {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.NamehandleChange} className="form-control"/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="text" value={this.state.email} onChange={this.EmailhandleChange} className="form-control"/>
                    </label>
                    <br/>
                    <label>
                        Passwd:
                        <input type="text" value={this.state.password} onChange={this.PasswdhandleChange} className="form-control"/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}

export default AddUser;