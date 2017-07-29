import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  search (term) {
    axios.post('/repos/import', {
      term: term
    })
      .then(result => {
        console.log('POST successfull: ')
        this.getRepos();
      })
      .catch(err => {
        console.log(err);
      }) 

    console.log(`${term} was searched`);
    
  }

  getRepos() {
    axios.get('/repos')
      .then(result => {
        console.log(result);
        result.data.forEach(item => this.state.repos.push(item));
        this.setState({ repos: result.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));