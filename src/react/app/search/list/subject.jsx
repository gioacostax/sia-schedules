/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { sia, utils, reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { addSubject, removeSubject } from 'src/redux/schedule';
import { saveLocalStore } from 'src/redux/config';

/* Import Components */
import SubjectSchedule from './schedule/schedule.jsx';

/* --- Redux Optimizer --- */

const states = ['schedule'];
const actions = [{ addSubject }, { removeSubject }, { saveLocalStore }];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class ListSubject extends React.Component {

  /* Initial State */
  state = {
    showSchedule: false
  }

  isSelected = selected => {
    if (typeof selected[this.props.values.code] === 'undefined') {
      return false;
    }
    return true;
  }

  select = () => {
    if (this.isSelected(this.props.schedule.selected)) {
      this.props.actions.removeSubject(this.props.values.code);
      this.props.actions.saveLocalStore();
    } else {
      this.props.actions.addSubject(this.props.values);
      this.props.actions.saveLocalStore();
    }
  }

  showSchedule = () => {
    this.setState({ showSchedule: !this.state.showSchedule });
  }

  render = () => {
    const isSelected = this.isSelected(this.props.schedule.selected);
    const check = isSelected ? 'green check circle' : 'check';

    return (
      <div className={`subject ${isSelected ? '--bold' : ''}`}>
        <div className="td select link" onClick={this.select}>
          <i className={`${check} icon --no-margin`}></i>
        </div>
        <div className="td type">
          <i
            className="circle icon"
            style={utils.getColorType(this.props.values.type.toLowerCase())}
          ></i>
          {utils.ucFirst(sia.TYPE[this.props.values.type])}
        </div>
        <div className="td code">{this.props.values.id}</div>
        <div className="td credits">{this.props.values.credits}</div>
        <div className="td name">{utils.add3Dots(this.props.values.name, 86)}</div>
        <div className="td drop link" onClick={this.showSchedule}>
          <i className={`${this.state.showSchedule ? 'caret up' : 'caret down'} icon --no-margin`}>
          </i>
        </div>
        <SubjectSchedule code={this.props.values.code} show={this.state.showSchedule} />
      </div>
    );
  }

}

ListSubject.displayName = 'ListSubject';
