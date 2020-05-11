import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DayTable from './DayTable';
import { Table } from 'material-ui/Table';
import Spinner from '../Spinner';
configure({adapter: new Adapter()});

describe('<DayTable />', () =>{
  const dataToTest = [
        {Day: "Monday", Value:40},
        {Day: "Monday", Value:40},
        {Day: "Monday", Value:40},
        {Day: "Monday", Value:40},
  ];

  it('should render spinner if data is loading', () =>{
    const wrapper = shallow(<DayTable loading/>);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  })

  it('should render table when receiving reposData', () =>{
    const wrapper = shallow(<DayTable loading={false} error ={false}
    dayForecastData = {dataToTest}/>);
    expect(wrapper.find(Table)).toHaveLength(1);
  })

});
