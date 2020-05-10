// import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import * as actionCreators from './store/actions/index';
// import './App.css';
// import { SearchForm } from './components';
// import { RepoTable } from './components';
// import { CommitsTable } from './components';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <SearchForm {...this.props}/>
//         <RepoTable {...this.props}/>
//         <CommitsTable {...this.props}/>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     loading: state.organizationReducer.loading,
//     error: state.organizationReducer.error,
//     repoData: state.organizationReducer.repoData,

//     loadingCommits: state.repoCommitsReducer.loadingCommits,
//     errorCommits: state.repoCommitsReducer.errorCommits,
//     commitsData: state.repoCommitsReducer.commitsData,

//     organizationName: state.formReducer.organizationName,
//     showRepos: state.formReducer.showRepos,
//     formHasBeenRestarted: state.formReducer.formHasBeenRestarted,
//     repoName: state.formReducer.repoName
//   };
// }


// export default connect(mapStateToProps, actionCreators)(App);
