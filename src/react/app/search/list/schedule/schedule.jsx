/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { getGroups } from 'src/redux/search';

/* Import Components */
import ScheduleGroup from './group.jsx';

/* --- Redux Optimizer --- */

const states = ['search'];
const actions = [{ getGroups }];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class SubjectSchedule extends React.Component {

  /* Initial State */
  state = {
    index: null,
    loading: false
  }

  componentWillReceiveProps = props => {
    if (props.show !== this.props.show) {
      if (props.show) {
        if (!this.state.loading && this.state.index === null) {
          const index = this.getIndex(this.props.code);

          if (index === null) {
            this.setState({ loading: true });
            this.props.actions.getGroups(props.code).then(() => {
              this.setState({ index: this.getIndex(this.props.code), loading: false });
            }).catch(() => {
              // TODO: Handle error
              this.setState({ loading: false });
            });
          } else {
            this.setState({ index });
          }
        }
      }
    }
  }

  getIndex = code => {
    const len = this.props.search.groups.length;

    for (let x = 0; x < len; x++) {
      if (this.props.search.groups[x].code === code) {
        return x;
      }
    }
    return null;
  }

  render =() => {
    const group = this.props.search.groups[this.state.index];

    if (this.props.show) {
      if (!this.props.loading) {
        if (group) {
          if (group.list.length) {
            return (
              <div id="subject-schedule">
                <div className="schedule-head">
                  <div className="th group">{'GR'}</div>
                  <div className="th quota">{'CUPOS'}</div>
                  <div className="th sche day">{'LUN'}</div>
                  <div className="th sche day">{'MAR'}</div>
                  <div className="th sche day">{'MIE'}</div>
                  <div className="th sche day">{'JUE'}</div>
                  <div className="th sche day">{'VIE'}</div>
                  <div className="th sche day">{'SAB'}</div>
                  <div className="th sche day">{'DOM'}</div>
                  <div className="th master">{'DOCENTE'}</div>
                </div>
                <div className="schedule-list">
                  {
                    group.list.map(value => {
                      return <ScheduleGroup key={value.code} values={value} />;
                    })
                  }
                </div>
              </div>
            );
          }
          return (
            <div id="subject-schedule" className="empty-groups">
              <div className="error">
                <i className="warning sign icon"></i>{'Error'}
              </div>
            </div>
          );
        }
      }
      return (
        <div id="subject-schedule" className="loading">
          <div className="--bar-loader">
            <div className="bar b1"></div>
            <div className="bar b2"></div>
            <div className="bar b3"></div>
            <div className="bar b4"></div>
            <div className="bar b5"></div>
            <div className="bar b6"></div>
          </div>
        </div>
      );
    }
    return null;
  }
}

SubjectSchedule.displayName = 'SubjectSchedule';
