import React from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardContent from 'material-ui/Card/CardText';
import Button from '@material-ui/core/Button';
import CardText from 'material-ui/Card/CardText';

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
    // margin: 7,
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
          </CardText>
          <CardText className={styles.pos} color="textSecondary"> 
            Temp F (Max, Min) : {this.props.dayForecastData[0].Value}
          </CardText>
          <CardActions>
          <Button 
          variant="contained"
          size="small"
          color="secondary"
          style={styles.button}
          onClick ={()=>this.handle12HourClick()}
          >12Hrs Forecast</Button>
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