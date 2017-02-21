/**
 * Created by osetskiy on 13.02.2017.
 */
/**
 * Created by osetskiy on 02.02.2017.
 */
import React from 'react';
import $ from 'jquery';


import config from '../config'


const javaHost = config.api.hostname+config.api.port;


class AddSecurity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameBLPAPI: "",
            type: "EQUITY",
            name: "",
            securities: []

        };

        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleChangeNameBPLAPI = this.handleChangeNameBPLAPI.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleRemoveSecurity = this.handleRemoveSecurity.bind(this);

    };

    getSecurities = () => {
        return $.getJSON(javaHost + '/Security')
            .then((data) => {
                this.setState({securities: data});

            });


    }


    handleChangeNameBPLAPI(event) {
        this.setState({nameBLPAPI: event.target.value});

    }

    handleChangeName(event) {
        this.setState({name: event.target.value});

    }

    handleChangeType(event) {
        this.setState({type: event.target.value});

    }
    handleRemoveSecurity(id) {
        $.ajax({
            url: javaHost + '/Security',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                nameBLAPI: id
            }),
            type: 'DELETE'


        }).then(this.getSecurities());


    }

    handleAddButton(event) {
        event.preventDefault();
        if (this.state.name && this.state.nameBLPAPI && this.state.type) {
            $.ajax({
                url: javaHost + '/Security',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    nameBLAPI: this.state.nameBLPAPI,
                    name: this.state.name,
                    type: this.state.type
                }),
                type: 'POST',
                success: function (result) {
                    console.log("dsf");
                }
            }).then((data) => {
                this.getSecurities();

            });
        }

    }



    componentDidMount() {
        this.getSecurities();


    }

    render() {

        return (
            <div className="addSecurity">Add Equtity/BOND/FX/CMDT

                <form className="navbar-form navbar-left" role="search" onSubmit={this.handleAddButton}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="BLP API NAME"
                               onChange={this.handleChangeNameBPLAPI} value={this.state.nameBLAPI}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="ALIAS" onChange={this.handleChangeName}
                               value={this.state.name}/>
                    </div>

                    <div className="form-group">
                        <select name="type" placeholder="TYPE" className="form-control"
                                onChange={this.handleChangeType}
                                value={this.state.type}>
                            <option value="EQUITY">EQUITY</option>
                            <option value="BOND">BOND</option>
                            <option value="FX">FX</option>
                            <option value="CMDT">CMDT</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success"> ADD</button>
                </form>


                <div className="panel panel-default" id="IndexUX">
                    <div className="panel-heading"></div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>name</th>
                                <th>name bloomberg</th>
                                <th>type</th>
                                <th>-</th>
                            </tr>

                            {this.state.securities.map((data) => (<ListItem key={data.nameBLAPI} listData={data} onChange={this.handleRemoveSecurity}/>))}

                            </tbody>
                        </table>


                    </div>

                </div>

            </div>
        )
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    };
    handleClick(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <tr>
                <td>{this.props.listData.name}</td>
                <td>{this.props.listData.nameBLAPI}</td>
                <td>{this.props.listData.type}</td>
                <td>
                  <button onClick={this.handleClick} value = {this.props.listData.nameBLAPI}>-</button>
                </td>
            </tr>
        );
    }
}
export default AddSecurity;

