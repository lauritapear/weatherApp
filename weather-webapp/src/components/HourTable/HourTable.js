import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Spinner from '../Spinner';

class HourTable extends React.Component {
  state = {
    height: '80%',
    rowIndex: ''
  };

  render() {
    let table = null;

    if (this.props.loadingHourForecast) {
      table = <div>
        <Spinner/>
      </div>;
    } else if ((!this.props.loadingHourForecast) && (this.props.errorHourForecast)) {
      table = <div>
        <br></br>
        <br></br>
        <p>Application is unable to find weather for {this.props.dayName}</p>
        <p>Please double check that {this.props.dayName}
          is a valid city</p>
      </div>;
    } else {
      if (this.props.hourForecastData.length > 0) {
        console.log(this.props.hourForecastData);
        table = <List >
          <Subheader>Forecast for today</Subheader>
          <Divider inset={true}/> {this.props.hourForecastData.map((element, index) => (
            
            <ListItem key={index} leftAvatar={< Avatar src = {
              element.Icon
                ? element.Icon
                : require("../../images/placeHolder.png")
            } />} 
            primaryText={element.Time} secondaryText={element.Value}
            />
          ))}

        </List>
      }
    }
    return (
      <div>
        {table}
      </div>
    );
  }
}

export default HourTable
