// import React from 'react';
// import { configure, shallow }from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import RepoTable from './RepoTable';
// import { Table } from 'material-ui/Table';
// import Spinner from '../Spinner';
// configure({adapter: new Adapter()});

// describe('<RepoTable />', () =>{
//   const dataToTest = [
//         {name: "repo",  forks: 2 },
//         {name: "repo",  forks: 5},
//         {name: "repo",  forks: 3},
//         {name: "repo",  forks: 20},
//   ];

//   it('should render spinner if data is loading', () =>{
//     const wrapper = shallow(<RepoTable loading/>);
//     expect(wrapper.find(Spinner)).toHaveLength(1);
//   })

//   it('should render table when receiving reposData', () =>{
//     const wrapper = shallow(<RepoTable loading={false} error ={false}
//       repoData = {dataToTest}/>);
//     expect(wrapper.find(Table)).toHaveLength(1);
//   })

// });
