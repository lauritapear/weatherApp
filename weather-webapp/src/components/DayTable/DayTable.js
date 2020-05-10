import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Spinner from '../Spinner';

class DayTable extends React.Component {
  state = {
    height: '400px',
    rowIndex:''
  };

  handleDaySelectionChange(event) {
    this.props.onRestartHourForecastData();
    this.props.handleDayChange(this.props.dayForecastData[event[0]].name);
    this.props.getHourForecastData(this.props.cityName,this.props.dayForecastData[event[0]].name)
  }

  render() {
    let table = null;

    if (this.props.loading) {
      table = <div>
        <Spinner/>
      </div>;
    }else if((!this.props.loading)&&(this.props.error))
    {
      table = <div>
        <br></br>
        <br></br>
        <p>Application is unable to find weather for {this.props.cityName}</p>
        <p>Please double check that {this.props.cityName} is a valid city name.</p>
      </div>;
    }else {
      console.log("table dayForecastData: ", this.props.dayForecastData);
      if(this.props.dayForecastData.length > 0)
      {
        table =<Table
          height={this.state.height}
          fixedHeader={true}
          fixedFooter={true}
          selectable={true}
          onRowSelection ={this.handleDaySelectionChange.bind(this)}
        >
          <TableHeader displaySelectAll={false}>
            <TableRow >
              <TableHeaderColumn colSpan="2" tooltip="Week days table" style={{textAlign: 'left'}}>
                {/* List of week days weather in {this.props.cityName} */}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Day ">Day of Week</TableHeaderColumn>
              <TableHeaderColumn tooltip="Temperature">Temperature</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}
          >
            {this.props.dayForecastData.map( (row, index) => (
              <TableRow selectable={true} key={index}>
                <TableRowColumn>{row.Date}</TableRowColumn>
                <TableRowColumn>{row.Temperature.Minimum.Value}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      }
    }
    return (
      <div>
        {table}
      </div>
    );
  }
}

export default DayTable
