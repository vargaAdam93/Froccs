//AddFroccs.js

import React,{Component} from 'react';
import UserService from '../Components/UserService'
import FroccsService from "./FroccsService";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: '',
            name : '',
            wine : '',
            water : '',
            total_dl : '',
            other_name : [],
            uploaded_by : '',
            email: '',
            password: ''};

        this.logged_in = 0;
        this.UserId = '';

        this.addFroccsService = new FroccsService();
        this.addUserService = new UserService();

        this.EmailhandleChange = this.EmailhandleChange.bind(this);
        this.PasswordhandleChange = this.PasswordhandleChange.bind(this);
        this.NamehandleChange = this.NamehandleChange.bind(this);
        this.WinehandleChange = this.WinehandleChange.bind(this);
        this.WaterhandleChange = this.WaterhandleChange.bind(this);
        this.Total_dlhandleChange = this.Total_dlhandleChange.bind(this);
        this.Other_namehandleChange = this.Other_namehandleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.LoginhandleSubmit = this.LoginhandleSubmit.bind(this);
    }

    EmailhandleChange(event)
    {
        this.setState({email: event.target.value});
    }

    PasswordhandleChange(event)
    {
        this.setState({password: event.target.value});
    }

    Other_namehandleChange(event)
    {
        this.setState({other_name: event.target.value});
    }


    Total_dlhandleChange(event)
    {
        this.setState({total_dl: event.target.value});
    }

    NamehandleChange(event)
    {
        this.setState({name: event.target.value});
    }

    WinehandleChange(event)
    {
        this.setState({wine: event.target.value});
    }

    WaterhandleChange(event)
    {
        this.setState({water: event.target.value});
    }

    handleSubmit(event)
    {
        alert(this.state.email);
        event.preventDefault();
        this.addFroccsService.sendData(this.state);
        this.props.history.push('/add-froccs');
    }

    LoginhandleSubmit(event)
    {
        var LoginData = {email: this.state.email,
            password: this.state.password};
        event.preventDefault();
        this.setState({UserId : this.addUserService.login(LoginData)});
        this.logged_in = 1;
    }
    render()
    {
        if (this.logged_in == 0)
        {
           return(
               <div>
                   <form onSubmit={this.LoginhandleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={this.state.email} onChange={this.EmailhandleChange} className="form-control"/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" value={this.state.password} onChange={this.PasswordhandleChange} className="form-control"/>
                    </label>
                    <br/>
                       <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
               </div>
           );
        }
        else
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
                            Wine:
                            <input type="text" value={this.state.wine} onChange={this.WinehandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <label>
                            Water:
                            <input type="text" value={this.state.water} onChange={this.WaterhandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <label>
                            Total (in dl):
                            <input type="text" value={this.state.total_dl} onChange={this.Total_dlhandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <label>
                            Other name:
                            <input type="text" value={this.state.other_name} onChange={this.Other_namehandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                </form>
                </div>
            );
        }
    }
}

export default AddUser;