import React, {Component} from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import Index from './Tables/Index';
import AddSecurity  from './Tables/AddSecurity';
const javaHost = 'http://localhost:8090';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {indexUX: [],indexPFTS: [],indexSPX: []};
    }

    indexUX = () => {
        return $.getJSON(javaHost + '/IndexUX')
            .then((data) => {
                this.setState({indexUX: data});

            });


    }

    indexPFTS = () => {
        return $.getJSON(javaHost + '/IndexPFTS')
            .then((data) => {
                this.setState({indexPFTS: data});

            });


    }

    indexSPX = () => {
        return $.getJSON(javaHost + '/IndexSPX')
            .then((data) => {
                this.setState({indexSPX: data});

            });


    }

    componentDidMount() {
        this.indexUX();
        this.indexPFTS();
        this.indexSPX();
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>

                <Router>
                    <div>

                        <ul className="nav nav-tabs">
                            <li role="presentation"><Link to="/">IndexUX</Link></li>
                            <li role="presentation"><Link to="/IndexPFTS">IndexPFTS</Link></li>
                            <li role="presentation"><Link to="/IndexSPX">IndexSPX</Link></li>
                            <li role="presentation"><Link to="/AddSecurity">Equtity/BOND/FX/CMDT</Link></li>
                        </ul>

                        <Route exact path="/" render={() => (
                            <Index index={this.state.indexUX} uploadPath="/IndexUX"/>
                        )}/>
                        <Route path="/IndexPFTS" render={() => (
                            <Index index={this.state.indexPFTS} uploadPath="/IndexPFTS"/>

                        )}/>

                        <Route path="/IndexSPX" render={() => (
                            <Index index={this.state.indexSPX} uploadPath="/IndexSPX"/>

                        )}/>
                        <Route path="/AddSecurity" render={() => (
                            <AddSecurity/>
                        )}/>
                    </div>

                </Router>


            </div>
        );
    }
}

export default App;
