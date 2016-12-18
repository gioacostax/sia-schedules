/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { reduxUtils, utils } from 'src/lib';

/* Import Redux Actions */
import { getGroups } from 'src/redux/search';
import {
  removeSubject,
  initGroups,
  addToMap,
  removeFromMap,
  setGroup,
  updateColorMap,
  resetStateTo,
  checkShow
} from 'src/redux/schedule';
import { saveLocalStore } from 'src/redux/config';

/* Import Components */
import ScheduleGroup from './group.jsx';

/* --- Redux Optimizer --- */

const states = ['search', 'schedule'];
const actions = [
  { getGroups },
  { removeSubject },
  { initGroups },
  { addToMap },
  { removeFromMap },
  { setGroup },
  { updateColorMap },
  { resetStateTo },
  { checkShow },
  { saveLocalStore }
];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class ScheduleSubject extends React.Component {

  /* Inistial State */
  state = {
    loading: true,
    groups: [],
    index: null
  }

  componentWillMount = () => {
    let index = this.getIndex(this.props.values.code);

    if (index === null) {
      this.props.actions.getGroups(this.props.values.code).then(() => {
        index = this.getIndex(this.props.values.code);
        const groups = this.props.search.groups[index].list;

        this.props.actions.initGroups(this.props.values.code, groups);
        this.setState({ groups, index, loading: false });
      }).catch(() => {
        // TODO: Handle error
        this.setState({ loading: false });
      });
    } else {
      this.props.actions.initGroups(this.props.values.code, this.props.search.groups[index].list);
      this.setState({ groups: this.props.search.groups[index].list, loading: false, index });
    }
  }

  componentWillReceiveProps = (props) => {
    const groups = props.values.groups;

    /* Check Map changes */
    if (props.schedule.mapCount !== this.props.schedule.mapCount) {
      this.props.actions.checkShow(this.props.values.code, this.state.groups);
    }

    /* Check Color changes */
    if (props.color !== this.props.color) {
      for (let x = 0; x < groups.length; x++) {
        if (typeof groups[x] !== 'undefined' && groups[x] !== null) {
          if (groups[x].state === 1) {
            this.props.actions.updateColorMap(this.props.values.code, props.color);
            break;
          }
        }
      }
    }
  }

  getIndex = code => {
    for (let x = 0; x < this.props.search.groups.length; x++) {
      if (this.props.search.groups[x].code === code.toString()) {
        return x;
      }
    }
    return null;
  }

  getIndexGroup = code => {
    for (let x = 0; x < this.state.groups.length; x++) {
      if (this.state.groups[x].code === code.toString()) {
        return x;
      }
    }
    return null;
  }

  selectGroup = (code, toggle) => {
    this.props.actions.removeFromMap(this.props.values.code, 1);

    if (toggle) {
      this.props.actions.resetStateTo(this.props.values.code, 2);
      this.props.actions.setGroup(this.props.values.code, code, { state: 1 });
      this.props.actions.addToMap([{
        state: 1,
        color: this.props.color,
        code:	this.props.values.code,
        name: this.props.values.name,
        group: this.state.groups[this.getIndexGroup(code)]
      }]);
      this.props.actions.saveLocalStore();
    } else {
      this.props.actions.resetStateTo(this.props.values.code, 0);
      this.props.actions.saveLocalStore();
    }
  }

  previewGroup = (code, toggle) => {
    const index = this.getIndexGroup(code);

    if (toggle) {
      this.props.actions.addToMap([{
        state: 3,
        code:	this.props.values.code,
        name: this.props.values.name,
        group: this.state.groups[index]
      }]);
    } else {
      this.props.actions.removeFromMap(this.props.values.code, 3);
    }
  }

  handleRemove = () => {
    this.props.actions.removeSubject(this.props.values.code);
    this.props.actions.saveLocalStore();
  }

  render = () => {
    return (
      <div className="selected-subject">
        <div className="info">
          <div className="color" style={{ backgroundColor: this.props.color }}></div>
          <div className="detail">
            <div className="name">
              {`${utils.add3Dots(this.props.values.name, 33)}`}
            </div>
            <div className="label code">{this.props.values.id}</div>
            <div className="label credits">{this.props.values.credits}</div>
            <div className="label type" style={utils.getColorsType(this.props.values.type)}>
              {this.props.values.type}
            </div>
            <div className="remove" onClick={this.handleRemove}>{'Eliminar'}</div>
          </div>
        </div>
        <div className="groups --y-scrolling">
        {
          this.state.loading ?
            <div className="--bar-loader">
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
              <div className="bar b5"></div>
              <div className="bar b6"></div>
            </div> :
            this.state.groups.map(group => {
              return (
                <ScheduleGroup
                  key={group.code}
                  code={this.props.values.code}
                  values={group}
                  color={this.props.color}
                  selectGroup={this.selectGroup}
                  previewGroup={this.previewGroup}
                />
              );
            })
        }
        </div>
      </div>
    );
  }
}

ScheduleSubject.displayName = 'ScheduleSubject';
