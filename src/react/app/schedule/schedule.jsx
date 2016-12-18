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

  state = {
    pngURL: null
  }

  handleToggle = () => {
    this.props.toggleView('search');
  }

  /* global html2canvas */
  handleConvert = () => {
    if (!this.state.pngURL) {
      html2canvas($('#schedule-map'), {
        onrendered: canvas => {
          this.setState({ pngURL: canvas.toDataURL('image/png', 1) });
          $('#download-img').popup({
            context: '#popup-help',
            exclusive: true,
            duration: 150,
            delay: {
              show: 250
            }
          });
        }
      });
    }
  }

  handleClose = () => {
    this.setState({ pngURL: null });
  }

  render = () => {
    return (
      <div className="main-schedule">
        <div className="ui pointing menu nav">
          <div className="header active item --no-pointer">
            <i className="calendar icon"></i>{'HORARIO'}
          </div>
          <a
            className="item schedule"
            onClick={this.handleToggle}
            data-content="Buscar asignaturas"
            data-variation="mini inverted"
            data-position="top center"
          >
            <i className="search icon"></i>{'BUSCADOR'}
          </a>
          <div className="right menu">
            <a
              id="convert"
              className={`item schedule ${this.state.pngURL ? 'disabled' : ''}`}
              onClick={this.handleConvert}
              data-content="Convertir a imagen"
              data-variation="mini inverted"
              data-position="top center"
            >
              <i className="lightning icon"></i>{'EXPORTAR'}
            </a>
          </div>
        </div>
        <div id="schedule-map">
          <button
            id="close-img"
            onClick={this.handleClose}
            className={`ui primary button ${this.state.pngURL ? '' : '--hidden'}`}
          >
            <i className="remove icon --no-margin"></i>
          </button>
          <button
            id="download-img"
            className={`ui primary button ${this.state.pngURL ? '' : '--hidden'}`}
            data-content="Click derecho, Guardar enlace como..."
            data-variation="mini inverted"
            data-position="top center"
          >
            <a href={this.state.pngURL} download="horario.png">
              <i className="download icon"></i>GUARDAR
            </a>
          </button>
          <div className={this.state.pngURL ? '--dark' : ''}>
            <ScheduleMap map={this.props.schedule.map} />
          </div>
        </div>
        <div
          id="schedule-list"
          className={`--top-pointing ${this.state.pngURL ? '--hidden' : ''}`}
        >
          <ScheduleList selected={this.props.schedule.selected} />
        </div>
      </div>
    );
  }
}

Schedule.displayName = 'Schedule';
