import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {ToolbarTitle} from 'material-ui/Toolbar';

const styles = {

  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  button:{
    margin: 7,
  },

  title: {
    color: "white",
    fontSize: "22px",
  },

  buttons:{
    display: 'flex',
    flexFlow: 'row wrap'
  }
}
class SearchForm extends React.Component {
  state = {
    textFieldValue: ''
  };
  handleKeyDown(event)
  {
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.props.onRestartHourForecastData();
      this.props.onRestartDayForecastData();
      this.props.handleCityNameChange(this.state.textFieldValue);
      this.props.getDayForecastData(this.state.textFieldValue);
    }
  }

  handleSearchClick(cityName)
  {
    this.props.onRestartHourForecastData();
    this.props.onRestartDayForecastData();
    this.props.handleCityNameChange(this.state.textFieldValue);
    this.props.getDayForecastData(cityName);
  }

  handleRestartClick()
  {
    this.setState({textFieldValue: ''});
    this.props.onRestartClick();
  }

  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false}
          style={styles.bar}
          >
          <ToolbarTitle text="Weather Explorer"
            style={styles.title}
            />
        </AppBar>
        <br></br>
        <TextField
          value={this.state.textFieldValue}
          onChange={(event) => {this.setState({textFieldValue: event.target.value})}}
          onKeyDown = {(event)=>this.handleKeyDown(event)}
          hintText="Enter City Name"
        />

        <div>
          <RaisedButton label="Get Weather" secondary={true} 
            style={styles.button}
            onClick ={()=>this.handleSearchClick(this.state.textFieldValue)}
          />
          <RaisedButton label="Cancel" primary={true} 
            style={styles.button}
            onClick={() => this.handleRestartClick()} />
        </div>

      </div>
    )
  }
}



export default SearchForm;
