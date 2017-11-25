//IndexFroccs.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import FroccsService from './FroccsService';

class IndexFroccs extends Component
{

    constructor(prop)
    {
        super(prop);
        this.state = {  froccsok : '',
                        loaded : 0,
                        delete_id : 0,
                        delete_request:0,
                        email: '',
                        password: ''
        };

        this.FroccsService = new FroccsService();

        this.DeletehandleSubmit = this.DeletehandleSubmit.bind(this);
        this.LoginhandleSubmit = this.LoginhandleSubmit.bind(this);
        this.EmailhandleChange = this.EmailhandleChange.bind(this);
        this.PasswordhandleChange = this.PasswordhandleChange.bind(this);
    }

    LoginhandleSubmit()
    {

        this.FroccsService.delete(this.state);
    }

    componentDidMount()
    {
        if(this.state.froccsok == '')
        {
            axios.get('http://localhost:4200/froccs')
                .then(response =>{
                    this.setState({froccsok: response.data,loaded: 1});
                })
                .catch(function (error) {
                    alert(error);
                })
        }
    }
    EmailhandleChange(event)
    {
        this.setState({email: event.target.value});
    }

    PasswordhandleChange(event)
    {
        this.setState({password: event.target.value});
    }
    DeletehandleSubmit(event)
    {
        this.setState({delete_id: event.target.name,delete_request:1});
    }

    render()
    {

      


        if(this.state.delete_request == 1)
        {
            return(
                <div  style={{padding: 50,margin: 10,  justifyContent: 'center',display: 'flex',}}>
                    <label>{this.state.delete_id}</label>
                    <form onSubmit={this.LoginhandleSubmit}>
                        <label>
                            Email:
                            <input type="text" value={this.state.email} onChange={this.EmailhandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="password" value={this.state.password} onChange={this.PasswordhandleChange} className="form-control"/>
                        </label>
                        <br/>
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </form>
                </div>
            );
        }

        if (this.state.loaded == 1) {
            var froccs_with_perc = this.state.froccsok;
            for(var k =0 ; k < froccs_with_perc.length; k++)
            {
                var water_plus_wine = froccs_with_perc[k].water + froccs_with_perc[k].wine;
                var one_part = froccs_with_perc[k].total_dl / water_plus_wine;
                var water_dl = froccs_with_perc[k].water * one_part;
                froccs_with_perc[k].water_inperc = ((water_dl/froccs_with_perc[k].total_dl) *100 );
            }
            const froccsok = froccs_with_perc;
            return (
                <div  style={{padding: 50,margin: 10,  justifyContent: 'center',display: 'flex',}}>
                    <p>
                        <p>
                            <div align="center">
                                <Link to="/add-user">Register</Link>
                            </div>
                        </p>
                        <p>
                            <div align="center">
                                <Link to="/add-froccs">Add froccs</Link>
                            </div>
                        </p>

                        <ReactTable
                            data={froccsok}
                            columns={[
                                {
                                    Header: "Name",
                                    accessor: "name"
                                },
                                {
                                    Header: "Wine",
                                    accessor: "wine",
                                    Cell: row =>(
                                        <div>
                                            <font color={'#f6ae96'}>
                                                {row.value}
                                            </font>
                                        </div>
                                    )

                                },
                                {
                                    Header: "Water",
                                    accessor: "water",
                                    Cell: row =>(
                                        <div>
                                            <font color={'#7dd2ee'}>
                                                {row.value}
                                            </font>
                                        </div>
                                    )
                                },
                                {
                                    Header: "Total in dl",
                                    accessor: "total_dl"
                                },
                                {
                                    Header: "Rate",
                                    accessor: "water_inperc",
                                    Cell: row =>(
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#dadada',
                                                borderRadius: '2px'
                                            }}
                                        >
                                            <label
                                                style={{
                                                    width: `${row.value}%`,
                                                    height: '100%',
                                                    backgroundColor:'#7dd2ee',
                                                    borderRadius: '2px',
                                                    transition: 'all .2s ease-out'
                                                }}
                                            />
                                            <label style={{
                                                width: `${100-row.value}%`,
                                                height: '100%',
                                                backgroundColor:'#f6ae96',
                                                borderRadius: '2px',
                                                transition: 'all .2s ease-out'
                                            }}/>

                                        </div>
                                    )
                                },
                                {
                                    Header: "Other Names",
                                    accessor: "other_name"
                                },
                                {
                                    Header: "Delete",
                                    accessor: "_id",
                                    filterable: false,
                                    Cell: row => (
                                        <div align="center">
                                            <form>
                                                <input type="submit" value="Delete" className="btn btn-danger"
                                                       name={row.value} onClick={this.DeletehandleSubmit}/>
                                            </form>
                                        </div>
                                    )
                                }
                            ]}
                            defaultPageSize={10}
                            filterable
                            className="-striped -highlight"
                        />
                        <br/>
                    </p>
                </div>
            );
        }
        else {
            return (
                <div  style={{padding: 50,margin: 10,  justifyContent: 'center',display: 'flex',}}>
                    LOADING...
                </div>
            );
        }
    }

}

        


export default IndexFroccs;