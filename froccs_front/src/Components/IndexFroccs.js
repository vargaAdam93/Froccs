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
                        delete_request:0
        };

        this.FroccsService = new FroccsService();

        this.DeletehandleSubmit = this.DeletehandleSubmit.bind(this);
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

    DeletehandleSubmit(event)
    {
        //console.log(event);
        //alert(event.target.name);
        this.setState({delete_id: event.target.name,delete_request:1});
        //this.FroccsService.delete(event.target.name);
        window.location.reload();

    }

    render()
    {

        if (this.state.loaded == 1) {
            const froccsok = this.state.froccsok;
            return (
                <div>
                    <p>
                        <p>
                            <div align="center">
                                <Link to="/add-froccs">Add froccs</Link>
                            </div>
                        </p>
                        <p>
                            <Link to="/add-user">Register</Link>
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

                                },
                                {
                                    Header: "Water",
                                    accessor: "water",
                                },
                                {
                                    Header: "Total in dl",
                                    accessor: "total_dl"
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
                <div>
                    LOADING...
                </div>
            );
        }
    }
 /*       return (
            <div>
                <br/>
                <div align="center">
                    <label>Order by:</label>
                    <select onChange={this.selectChangedHandleEvent} value={this.orderby}>
                        <option value="name">Name</option>
                        <option value="wine">Wine</option>
                        <option value="water">Water</option>
                        <option value="total">Total_dl</option>
                    </select>
                </div>
                <br/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>No.</td>
                        <td>Name</td>
                        <td>Wine</td>
                        <td>Water</td>
                        <td>All</td>
                        <td>Other names</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }*/
}

export default IndexFroccs;