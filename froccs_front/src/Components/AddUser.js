//AddUser.js

import React,{Component} from 'react';
import UserService from '../Components/UserService'

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: '',type:'1'};

        this.addUserService = new UserService();

        this.NamehandleChange = this.NamehandleChange.bind(this);
        this.EmailhandleChange = this.EmailhandleChange.bind(this);
        this.PasswdhandleChange = this.PasswdhandleChange.bind(this);
        this.selectChangedHandleEvent = this.selectChangedHandleEvent.bind(this);
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
    selectChangedHandleEvent(event)
    {
        this.setState({type:event.target.value});
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.addUserService.sendData(this.state);
        this.props.history.push('/');
    }

    render()
    {
        return(
            <div className="container"  style={{padding: 50,margin: 10,  justifyContent: 'center',display: 'flex',}}>
                <form onSubmit={this.handleSubmit} >

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
                        Password:
                        <input type="password" value={this.state.password} onChange={this.PasswdhandleChange} className="form-control"/>
                    </label>
                    <br/>
                    <select onChange={this.selectChangedHandleEvent} value={this.state.type}>
                        <option value="1">User</option>
                        <option value="2">Admin</option>
                    </select>
                    <br/>
                    <input type="submit" value="Submit"  style={{ justifyContent: 'center',   alignItems: 'center', marginTop:20}} className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}

export default AddUser;