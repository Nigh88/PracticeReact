import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './components/Register'
import UserContext from './user'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CreateModifi from './components/CreateModifi'
import './index.css'
import Advert from './components/Advert';
import { createAdvert, updateAdvert } from './Services/NodepopApi'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component{
    constructor(props) {
      super(props);
      const userData = localStorage.getItem('user');
      if (userData) {
        var user = JSON.parse(userData)
        this.state = {
          name: user.name,
          surname: user.surname,
          tags: user.tags
        };
      }
      else{
        // props.history.push('/Register')
      }
    }

    handleRegister = (user) => {
        this.setState({
          name: user.name,
          surname: user.surname,
          tags: user.tags
        });
        localStorage.setItem('user', JSON.stringify(user));
      };
    
    handleCreate = (advert) => {
      createAdvert(advert)
    }

    handleUpdate = (advert, _id) => {
      updateAdvert(advert, _id)
    }


      
    render() {

        return (
            <UserContext.Provider value={this.state}>
            <Router>
                <Navbar />
                <Switch>
                <Route path='/register'>
                    <Register onRegister={this.handleRegister} />
                </Route>
                <Route path='/Home' component={Home} />
                <Route path='/Advert/:id' component={Advert} />
                <Route path='/Create'>
                    <CreateModifi onSubmit={this.handleCreate}/>
                </Route>
                <Route path='/Update/:id'>
                  <CreateModifi onSubmit={this.handleUpdate}/>
                </Route>
                </Switch>
            </Router>
            </UserContext.Provider>
      );
    }
  }

  render(<App />, document.getElementById('root'));
