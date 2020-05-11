import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardContent from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import Spinner from '../Spinner';

const styles = {
  root: {
    minWidth: 275,
    display: 'flex',
    flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button:{
    margin: 7,
  },
};

class InfoCard extends React.Component {
  handle12HourClick()
  {
    this.props.onRestartHourForecastData();
    this.props.getHourForecastData(this.props.cityName)
  }
  render() {
    let infoCard = null;
  
    if(this.props.dayForecastData.length > 0)
    {
      infoCard = 
      <Card className={styles.root} variant="outlined">
        <CardContent>
          <CardText variant="h5" component="h2">
            {this.props.infoCardData}
            {/* Berlin, Germany */}
          </CardText>
          <CardText className={styles.pos} color="textSecondary"> 
            {this.props.dayForecastData[0].Value}
          </CardText>
          {/* <CardText className={styles.pos} color="textSecondary">
            Min Temperature: 50F
          </CardText> */}
          <CardActions>
          <RaisedButton 
          size="small"
          style={styles.button}
          onClick ={()=>this.handle12HourClick()}
          >12Hrs Forecast</RaisedButton>
        </CardActions>
        </CardContent>
        
      </Card>
    }
    return (
      <div>
        {infoCard}
      </div>
    );
  }
  
}
export default InfoCard;