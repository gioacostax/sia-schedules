/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Components */
import Header from './app/header.jsx';
import Search from './app/search/search.jsx';
import Schedule from './app/schedule/schedule.jsx';

/* Import Libs */
import { reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { loadConfigState } from 'src/redux/config';
import { getInfo } from 'src/redux/info';
import { loadScheduleState } from 'src/redux/schedule';

/* --- Redux Optimizer --- */

const states = ['info', 'schedule'];
const actions = [{ getInfo }, { loadScheduleState }, { loadConfigState }];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class App extends React.Component {

  /* Inistal State */
  state = {
    view: 'search'
  }

  componentWillMount = () => {
    this.getInfo();
  }

  getInfo = () => {
    this.props.actions.getInfo().then(() => {
      if (this.props.localstate) {
        this.props.actions.loadConfigState(this.props.localstate.config);
        this.props.actions.loadScheduleState(this.props.localstate.schedule);
        // if (Object.keys(this.props.schedule.selected).length) {
        //   this.toggleView('schedule');
        // }
      }
    }).catch(() => {
      $('#fetch-modal-info').modal({
        closable: false,

        onApprove: () => {
          this.getInfo();
        }
      }).modal('show');
    });
  }

  toggleView = (view) => {
    this.setState({ view });
  }

  render = () => {
    return (
      <div>
        <div id="popup-help"></div>
        <div id="fetch-modal-info" className="ui small modal">
          <div className="header error">
            {'ERROR'}
          </div>
          <div className="content">
            <p>{'Información de sede y carreras no disponible.'}</p>
          </div>
          <div className="actions">
            <div className="ui retry positive button">{'REINTENTAR'}</div>
          </div>
        </div>
        <div id="header" className="--bottom-pointing">
          <div className="container --clearfix --centered">
            <div id="logo-name" className="nav-title">
              <i id="logo" className="hand rock icon"></i><span>{'Prometeo UN'}</span>
            </div>
            <Header info={this.props.info.data} />
          </div>
        </div>
        <div id="main">
          <div
            id="search"
            className="--centered"
            style={{ display: this.state.view === 'search' ? '' : 'none' }}
          >
            <Search toggleView={this.toggleView} />
          </div>
          <div
            id="schedule"
            className="--centered"
            style={{ display: this.state.view === 'schedule' ? '' : 'none' }}
          >
            <Schedule toggleView={this.toggleView} />
          </div>
        </div>
        <div id="footer">
          <div className="container --centered">
            <div className="info">
              <a href="https://chrome.google.com/webstore/detail/prometeo-un/bifnfmlgdgmfajhgihjoaedfampmcgee">{'Prometeo UN v2.0.1'}</a>
            </div>
            <div className="contact">
              <a href="https://github.com/siajs/prometeo" target="_blank">
                <i className="github icon"></i>
              </a>
              <a href="https://github.com/siajs/prometeo/issues" target="_blank">
                <i className="bug icon"></i>
              </a>
            </div>
            <div className="gio">
              <span>
                {'Giorgio Acosta '}
                <i className="red code icon --bold"></i>
                <a href="mailto:giacostaj@unal.edu.co">
                  {' giacostaj@unal.edu.co'}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
