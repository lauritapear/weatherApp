// import React from 'react';
// import { configure, shallow }from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import CommitsTable from './CommitsTable';
// import {List, ListItem} from 'material-ui/List';
// import Spinner from '../Spinner';
// configure({adapter: new Adapter()});

// describe('<RepoTable />', () =>{
//   const dataToTest = [
//         {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} },
//         {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} },
//         {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} }
//   ];

//   it('should render spinner if data is loading', () =>{
//     const wrapper = shallow(<CommitsTable loadingCommits/>);
//     expect(wrapper.find(Spinner)).toHaveLength(1);
//   })

//   it('should render List when receiving commitsData', () =>{
//     const wrapper = shallow(<CommitsTable loadingCommits={false} errorCommits ={false}
//       commitsData = {dataToTest}/>);
//     expect(wrapper.find(List)).toHaveLength(1);
//   })

// });
