import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import UserContext from '../user';
import { searchTags } from '../Services/NodepopApi'
import Select from 'react-dropdown-select';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
            name: '',
            surname: '',
            tags: [],
            options: []
        } 
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    setValues = (event) => {
        this.setState({tags:event[0].label});
      };

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.state.name || this.state.name.trim().length < 3) {
            alert("Name is too short. At least 3 characters");
            return;
        }

        if (!this.state.surname || this.state.surname.trim().length < 3) {
            alert("Surmane is too short. At least 3 characters")
        }

        this.props.onRegister({
            name: this.state.name,
            surname: this.state.surname,
            tags: this.state.tags,
        });

        this.props.history.push("/Home");
    }

    componentWillMount() {    
        searchTags().then(tags => {
            var i;
            var tempTags = [];
            for (i = 0; i < tags.length; i++) {
                tempTags[i] = {label: tags[i], value: tags[i]}
            }
            this.setState (
                { options : tempTags }
            )
        });
    }

    render() {
        const { name, surname, options} = this.state;
        const cardStyle = {
            margin: '1rem'
          };

        return(
            <React.Fragment>
                <div className="container" style={cardStyle}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={this.onInputChange}
                            placeholder="Write your name"
                            />
                        </div>

                        <div className="form-group">
                            <label for="surname">Surname</label>
                            <input
                            className="form-control"
                            id="surname"
                            name="surname"
                            type="text"
                            value={surname}
                            onChange={this.onInputChange}
                            placeholder="Write your surname"
                            />
                        </div>

                        <div className="form-group">
                            <label for="tags">Tag</label>
                            <Select id="tags" options={options} onChange={(values) => this.setValues(values)} />
                        </div>

                        <button type='submit' className="btn btn-primary">Register</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

Register.contextType = UserContext;
export default withRouter(Register); 