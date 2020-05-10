// import React from 'react';
// import { configure, shallow }from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import CommitsTable from './CommitsTable';
// import {List, ListItem} from 'material-ui/List';
import Spinner from '../Spinner';
configure({adapter: new Adapter()});

describe('<HourTable />', () =>{
  const dataToTest = [
        { Hour: 9, Temperature: {Minimun:{Value:40}}},
        { Hour: 9, Temperature: {Minimun:{Value:40}}},
        { Hour: 9, Temperature: {Minimun:{Value:40}}} 
  ];

  it('should render spinner if data is loading', () =>{
    const wrapper = shallow(<HourTable loadingHourForecast/>);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  })

  it('should render List when receiving commitsData', () =>{
    const wrapper = shallow(<HourTable loadingHourForecast={false} errorHourForecast ={false}
        hourForecastData = {dataToTest}/>);
    expect(wrapper.find(List)).toHaveLength(1);
  })

});
