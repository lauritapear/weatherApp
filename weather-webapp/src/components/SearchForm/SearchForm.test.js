import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchForm from './SearchForm';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {ToolbarTitle} from 'material-ui/Toolbar';

configure({adapter: new Adapter()});

describe('<SearchForm />', () =>{
  it('should render form elements', () =>{
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(RaisedButton)).toHaveLength(2);
  })
});
