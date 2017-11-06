//IndexFroccs.js

import React, {Component} from 'react';
import TableRowFroccs from './TableRowFroccs'
import axios from 'axios';

class IndexFroccs extends Component
{

    constructor(prop)
    {
        super(prop);
        this.state = {froccsok : '',
                      order_by : ''};
        this.selectChangedHandleEvent = this.selectChangedHandleEvent.bind(this);
        this.orderby = 'name';
    }

    componentDidMount()
    {
        if(this.state.froccsok == '')
        {
            axios.get('http://localhost:4200/froccs')
                .then(response =>{
                    this.setState({froccsok: response.data});
                })
                .catch(function (error) {
                    alert(error);
                })
        }
    }

    selectChangedHandleEvent(event)
    {
        alert(event.target.value);
        event.preventDefault();
        this.setState({orderby : event.target.value});
        this.orderby = event.target.value;
    }

    tabRow()
    {
        if(this.state.froccsok instanceof Array)
        {
            if(this.orderby == 'name') {
                this.state.froccsok.sort(function (a, b) {
                    return a.name > b.name;
                });
            }
            else
            {
                if(this.orderby == 'wine')
                {

                    this.state.froccsok.sort(function (a,b) {
                        return a.wine - b.wine;
                    });
                }
                if(this.orderby == 'water')
                {

                    this.state.froccsok.sort(function (a,b) {
                        return a.water - b.water;
                    });
                }
                if(this.orderby == 'total')
                {

                    this.state.froccsok.sort(function (a,b) {
                        return a.total_dl - b.total_dl;
                    });
                }
            }
            return this.state.froccsok.map(function (object,i) {
                return <TableRowFroccs obj={ object } key = {i} />
            })
        }

    }

    render()
    {
        return (
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
    }
}

export default IndexFroccs;