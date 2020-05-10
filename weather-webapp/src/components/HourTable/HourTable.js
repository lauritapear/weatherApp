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

    if (this.props.loadingCommits) {
      table = <div>
        <Spinner/>
      </div>;
    } else if ((!this.props.loadingCommits) && (this.props.errorCommits)) {
      table = <div>
        <br></br>
        <br></br>
        <p>Application is unable to find weather for {this.props.dayName}</p>
        <p>Please double check that {this.props.dayName}
          is a valid city</p>
      </div>;
    } else {
      if (this.props.hourForecastData.length > 0) {
        table = <List >
          <Subheader>Forecast for {this.props.dayName}</Subheader>
          <Divider inset={true}/> {this.props.hourForecastData.map((commit, index) => (
            <ListItem key={index} leftAvatar={< Avatar src = {
              commit.author
                ? commit.author['avatar_url']
                : require("../../images/placeHolder.png")
            } />} primaryText={commit.commit['message']} secondaryText={commit.commit.author['name']}/>
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
