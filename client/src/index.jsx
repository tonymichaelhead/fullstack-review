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

  }

  search (term) {
    axios.post('/repos/import', {
      term: term
    })
      .then(result => {
        console.log('POST successfull: ')
        // console.log(result);
        result.data.forEach(item => this.state.repos.push(item));
        this.setState({ repos: this.state.repos });
      })
      .catch(err => {
        console.log(err);
      }) 


    console.log(`${term} was searched`);
    
  }

  componentDidMount() {
    axios.get('/repos')
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
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