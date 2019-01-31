/* Import React & Redux */
import React from 'react';

/* Component */
export default class ScheduleGroup extends React.Component {
  render = () => {
    const percent = (100 * this.props.values.free) / this.props.values.quota;
    const styleBar = { width: `${percent < 0 ? 0 : percent}%` };
    const quota = `${this.props.values.free}/${this.props.values.quota}`;
    const week = this.props.values.week;
    const fixedHour = [];

    for (let x = 0; x < 7; x++) {
      if (week[x]) {
        if (week[x].length > 1) {
          const start = week[x][0].split('-')[0];
          const end = week[x][week[x].length - 1].split('-')[1];

          fixedHour[x] = `${start}-${end}*`;
        } else {
          fixedHour[x] = week[x][0];
        }
      } else {
        fixedHour[x] = '\x20\xA0';
      }
    }

    return (
      <div className="schedule-item">
        <div className="td group">{this.props.values.code}</div>
        <div className="td quota">
          <div className="value">{quota}</div>
          <div className="progress">
            <div className={`bar ${percent <= 30 ? 'red' : 'green'}`} style={styleBar}></div>
          </div>
        </div>
        <div className="td sche day">{fixedHour[0]}</div>
        <div className="td sche day">{fixedHour[1]}</div>
        <div className="td sche day">{fixedHour[2]}</div>
        <div className="td sche day">{fixedHour[3]}</div>
        <div className="td sche day">{fixedHour[4]}</div>
        <div className="td sche day">{fixedHour[5]}</div>
        <div className="td sche day">{fixedHour[6]}</div>
        <div className="td master">
          {this.props.values.master !== '  ' ? this.props.values.master : '[Información Pendiente]'}
        </div>
      </div>
    );
  }
}

ScheduleGroup.displayName = 'ScheduleGroup';
