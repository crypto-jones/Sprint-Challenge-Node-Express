import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Projects.css';

export default class ListView extends Component {
  state = {
    projects: [],
    actions: [],
    search: ''
  };

  updateSearch = e => {
    if (e.target.value.length < this.state.search.length) {
      this.getProjects();
      // this.filterAndChange(); // How to refilter at current value?
    }
    this.setState({ search: e.target.value });
    this.filterAndChange();
  };

  //filters the state to match values for onChange event

  filterAndChange = () => {
    let filterposts = this.state.projects.filter(project => {
      if (
        project.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        project.description
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      ) {
        return true;
      }
    });
    this.setState({ projects: filterposts });
  };

  getProjects = () => {
    axios
      .get('http://localhost:5000/api/projects')
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting posts: ${error}`);
      });
  };

  getActions = () => {
    axios
      .get('http://localhost:5000/api/actions')
      .then(response => {
        this.setState({ actions: response.data });
      })
      .catch(error => {
        console.log(`There was an error getting users: ${error}`);
      });
  };

  componentDidMount = () => {
    this.getProjects();
    this.getActions();
  };

  render() {
    console.log(this.state.projects);
    return (
      <div className="container">
        <div className="d-flex align-items-baseline mb-3">
          <h4>Projects:</h4>
          <nav className="navbar navbar-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Projects"
                aria-label="Search"
                value={this.state.search}
                onChange={this.updateSearch}
              />
              <button className="btn my-2 my-sm-0 search-button" type="submit">
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="row">
          {this.state.projects.map(project => {
            return (
              <div className="col-lg-4 col-md-8 col-sm-12" key={project.id}>
                <Link
                  to={`/project/${project.id}`}
                  style={{ textDecoration: 'none' }}
                  className="card"
                >
                  <div className="card-block">
                    <h3 className="card-title">{project.name}</h3>
                    <h5>{project.description}</h5>
                    {this.state.actions.map(action => {
                      if (action.project_id === project.id) {
                        return (
                          <div className="text-truncate card-text">
                            <li>{action.description}</li>
                          </div>
                        );
                      }
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
