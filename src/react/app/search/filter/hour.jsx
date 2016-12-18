/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { sia, reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { setHourFilter } from 'src/redux/search';

/* --- Redux Optimizer --- */
const states = ['config'];
const actions = [{ setHourFilter }];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class FilterHour extends React.Component {

  /* Initial State */
  state = {
    hour: []
  }

  componentDidMount = () => {
    $('#dropdown-schedule').dropdown({ action: 'nothing' });
  }

  componentWillReceiveProps = (props) => {
    if (props.config.plan.code !== this.props.config.plan.code) {
      this.handleReset();
    }
  }

  handleHour = event => {
    const id = event.target.getAttribute('id');
    const temp = this.state.hour.slice();

    if (sia.utils.validFilter([id], temp)) {
      for (let x = temp.length - 1; x >= 0; x--) {
        if (temp[x] === id) {
          temp.splice(x, 1);
          break;
        }
      }
    } else {
      temp.push(id);
    }

    this.setState({ hour: temp });
    $(`td.hour.${id.toLowerCase()}`).toggleClass('active');
  }

  handleReset = () => {
    this.setState({ hour: [] });
    $('td').removeClass('active');
  }

  handleApply = () => {
    this.props.actions.setHourFilter(this.state.hour);
    $('#dropdown-schedule').dropdown('hide');
  }

  render = () => {
    const grid = [];
    const disabled = !this.state.hour.length ? 'disabled' : '';

    for (let x = 6; x < 21; x++) {
      grid[x] = (
        <tr key={x}>
          <td className="center aligned">{x}</td>
          <td className={`center aligned hour l${x}`} id={`L${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour m${x}`} id={`M${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour c${x}`} id={`C${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour j${x}`} id={`J${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour v${x}`} id={`V${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour s${x}`} id={`S${x}`} onClick={this.handleHour}>&nbsp;
          </td>
          <td className={`center aligned hour d${x}`} id={`D${x}`} onClick={this.handleHour}>&nbsp;
          </td>
        </tr>
      );
    }

    return (
      <div
        id="dropdown-schedule"
        className="ui dropdown icon item"
        data-content="Filtrar por Hora"
        data-variation="mini inverted"
        data-position="top center"
      >
        <i className={`circle icon ${this.props.hour.length ? 'green' : ''}`}></i>
        <span className="--bold">{'HORAS'}</span>
        <div className="menu">
          <div className="item --no-pointer">
            <div className="content">
              <table className="ui unstackable celled table s-schedule-table">
                <thead>
                  <tr>
                    <th className="center aligned">&nbsp;</th>
                    <th className="center aligned">{'L'}</th>
                    <th className="center aligned">{'M'}</th>
                    <th className="center aligned">{'C'}</th>
                    <th className="center aligned">{'J'}</th>
                    <th className="center aligned">{'V'}</th>
                    <th className="center aligned">{'S'}</th>
                    <th className="center aligned">{'D'}</th>
                  </tr>
                </thead>
                <tbody>
                  {grid}
                </tbody>
              </table>
              <button className={`ui button ${disabled} reset`} onClick={this.handleReset}>
                {'LIMPIAR'}
              </button>
              <button className="ui button apply" onClick={this.handleApply}>
                {'APLICAR'}
              </button>
            </div>
          </div>
        </div>
        <i className="filter icon"></i>
      </div>
    );
  }
}

FilterHour.displayName = 'FilterHour';
