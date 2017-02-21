/**
 * Created by osetskiy on 02.02.2017.
 */
import React from 'react';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import config from '../config'


const javaHost = config.api.hostname+config.api.port;


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date1: "",
            date2: ""
        };

        this.HandleButtonIndexUX = this.HandleButtonIndexUX.bind(this);
        this.handleChangeDate1 = this.handleChangeDate1.bind(this);
        this.handleChangeDate2 = this.handleChangeDate2.bind(this);


    };

    handleChangeDate1(date) {
        this.setState({date1: date});

    }

    handleChangeDate2(date) {
        this.setState({date2: date});

    }


    HandleButtonIndexUX(event) {
        //'/uploadIndexUX'
        $.post(javaHost + this.props.uploadPath + '?date1=' + this.state.date1.format('YYYYMMDD') + '&date2=' + this.state.date2.format('YYYYMMDD'))
            .then((data) => {

                //this.setState({indexUX: data});
            });

        event.preventDefault();


    }

    componentDidMount() {



    }


render()
{
    return (
        <div>
            <form className="navbar-form navbar-left" role="search" onSubmit={this.HandleButtonIndexUX}>
                <div className="form-group">
                    load index
                    from <DatePicker
                    dateFormat="YYYY-MM-DD"
                    selected={this.state.date1}
                    onChange={this.handleChangeDate1}/> to
                    <DatePicker
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.date2}
                        onChange={this.handleChangeDate2}/>


                </div>
                <button type="submit" className="btn btn-default">Load index</button>
            </form>


            {/* this.state.indexUX ? (<AreaChart  data={this.state.indexUX}    width={300}  ratio={1} type="svg" />):(<div/>)*/}


            <div className="panel panel-default" id="IndexUX">
                <div className="panel-heading">{this.props.uploadPath}</div>
                <div className="panel-body">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Index</th>
                        </tr>

                        {this.props.index.map((data) => (<Content key={data.date} listData={data}/>))}
                        </tbody>
                    </table>


                </div>

            </div>

        </div>
    );
}
}

class Content extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.listData.date}</td>
                <td>{this.props.listData.last}</td>
            </tr>
        );
    }
}


export default Index;