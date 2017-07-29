import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>{props.repos.map(repo => <li><a href={repo.url}>{repo.username}</a> &#x1F374; {repo.forkNum} </li>)}</ul>    
  </div>
)

export default RepoList;