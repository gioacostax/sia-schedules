/* Import React & Redux */
import React from 'react';
import { connect } from 'react-redux';

/* Import Libs */
import { reduxUtils, utils } from 'src/lib';

/* --- Redux Optimizer --- */

const states = ['schedule'];

@connect(reduxUtils.statesToProps(states))

/* --- Redux Optimizer --- */

/* Component */
export default class ScheduleGroups extends React.Component {

  handleSelectGroup = () => {
    const stat = this.props.schedule.selected[this.props.code].groups[this.props.values.code].state;

    this.props.selectGroup(this.props.values.code, stat === 1 ? false : true);
  }

  handleOnMouseEnter = () => {
    if (this.props.schedule.selected[this.props.code].groups[this.props.values.code].state !== 1) {
      this.props.previewGroup(this.props.values.code, true);
    }
  }

  handleOnMouseLeave = () => {
    if (this.props.schedule.selected[this.props.code].groups[this.props.values.code].state !== 1) {
      this.props.previewGroup(this.props.values.code, false);
    }
  }

  render = () => {
    const stat = this.props.schedule.selected[this.props.code].groups[this.props.values.code].state;

    const master = utils.add3Dots(utils.ucWords(utils.validMaster(this.props.values.master)), 32);
    const style = { borderColor: this.props.color, boxShadow: `0 1px 2px 0 ${this.props.color}` };
    const percent = (100 * this.props.values.free) / this.props.values.quota;
    const styleBar = { width: `${percent}%` };
    const quota = `${this.props.values.free}/${this.props.values.quota}`;

    if (this.props.schedule.selected[this.props.code].groups[this.props.values.code].show) {
      return (
        <div
          className={`group state-${stat}`}
          onClick={this.handleSelectGroup}
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
          style={stat === 1 ? style : {}}
        >
          <div className="detail">
            <div className="master">{`G${this.props.values.code} - ${master}`}</div>
            <div className="quota">
              <div className="value">{quota}</div>
              <div className="progress">
                <div
                  className={`bar ${percent <= 30 ? 'red' : 'green'}`}
                  style={styleBar}
                ></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

ScheduleGroups.displayName = 'ScheduleGroup';
