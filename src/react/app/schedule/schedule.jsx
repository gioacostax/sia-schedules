/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { reduxUtils } from 'src/lib';

/* Import Redux Actions */

/* Import Components */
import ScheduleMap from './map/map.jsx';
import ScheduleList from './list/list.jsx';

/* --- Redux Optimizer --- */

const states = ['schedule'];

@connect(reduxUtils.statesToProps(states))

/* --- Redux Optimizer --- */

/* Component */
export default class Schedule extends React.Component {

  handleToggle = () => {
    this.props.toggleView('search');
  }

  render = () => {
    return (
      <div className="main-schedule">
        <div className="ui pointing menu nav">
          <div className="header active item"><i className="calendar icon"></i>{'HORARIO'}</div>
          <a className="item schedule" onClick={this.handleToggle}>
            <i className="search icon --no-margin"></i>
          </a>
          <div className="right menu">

          </div>
        </div>
        <div id="schedule-map"><ScheduleMap map={this.props.schedule.map} /></div>
        <div id="schedule-list" className="--top-pointing">
          <ScheduleList selected={this.props.schedule.selected} />
        </div>
      </div>
    );
  }
}

Schedule.displayName = 'Schedule';
