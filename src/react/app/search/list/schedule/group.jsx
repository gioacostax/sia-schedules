/* Import React & Redux */
import React from 'react';

/* Import Components */
import DayPopup from './dayPopup.jsx';

/* Component */
export default class ScheduleGroup extends React.Component {

  componentDidMount = () => {
    $('.td.sche.day').popup({
      on: 'click',
      position: 'top center',
      transition: 'fade'
    });
  }

  render = () => {
    const percent = (100 * this.props.values.free) / this.props.values.quota;
    const styleBar = { width: `${percent < 0 ? 0 : percent}%` };
    const quota = `${this.props.values.free}/${this.props.values.quota}`;
    const schedule = this.props.values.schedule;
    const fixedHour = [];

    for (let x = 0; x < 7; x++) {
      if (schedule[x]) {
        if (schedule[x].hour.length > 1) {
          const start = schedule[x].hour[0].split('-')[0];
          const end = schedule[x].hour[schedule[x].hour.length - 1].split('-')[1];

          fixedHour[x] = `${start}-${end}*`;
        } else {
          fixedHour[x] = schedule[x].hour[0];
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
        <DayPopup values={this.props.values.schedule[0] || {}} />
        <div className="td sche day">{fixedHour[1]}</div>
        <DayPopup values={this.props.values.schedule[1] || {}} />
        <div className="td sche day">{fixedHour[2]}</div>
        <DayPopup values={this.props.values.schedule[2] || {}} />
        <div className="td sche day">{fixedHour[3]}</div>
        <DayPopup values={this.props.values.schedule[3] || {}} />
        <div className="td sche day">{fixedHour[4]}</div>
        <DayPopup values={this.props.values.schedule[4] || {}} />
        <div className="td sche day">{fixedHour[5]}</div>
        <DayPopup values={this.props.values.schedule[5] || {}} />
        <div className="td sche day">{fixedHour[6]}</div>
        <DayPopup values={this.props.values.schedule[6] || {}} />
        <div className="td master">
          {this.props.values.master !== '  ' ? this.props.values.master : '[Información Pendiente]'}
        </div>
      </div>
    );
  }
}

ScheduleGroup.displayName = 'ScheduleGroup';
