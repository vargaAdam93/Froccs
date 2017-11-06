//TableRowFroccs.js
import React, { Component} from 'react';

class TableRowFroccs extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
        window.location.reload();
    }



    render()
    {
        return(
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.wine}
                </td>
                <td>
                    {this.props.obj.water}
                </td>
                <td>
                    {this.props.obj.total_dl}
                </td>
                <td>
                    {this.props.obj.other_name.map(function (object) {
                        return <p>{object} </p>
                    })}
                </td>
                <td>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Delete" className="btn btn-danger"/>
                    </form>
                </td>
            </tr>

        );
    }

}
export  default TableRowFroccs;