/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { utils, reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { setSite, setPlan, saveLocalStore } from 'src/redux/config';
import { resetSearch, getSubjects } from 'src/redux/search';
import { resetSchedule } from 'src/redux/schedule';

/* --- Redux Optimizer --- */

const states = ['config', 'schedule'];
const actions = [
  { setSite },
  { setPlan },
  { resetSearch },
  { resetSchedule },
  { saveLocalStore },
  { getSubjects }
];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class Header extends React.Component {

  componentDidMount = () => {
    $('#site').dropdown({
      onChange: code => {
        this.changeSite(code);
      }
    });

    $('#plan').dropdown({
      onChange: (value, text) => {
        const values = value.split('-');

        this.changePlan(values[0].substring(0, 3), values[1], text);
      }
    });
    $('#reset').popup({
      position: 'top center',
      content: 'BORRAR TODO'
    });
  }

  changeSite = code => {
    if (Object.keys(this.props.schedule.selected).length) {
      $('#change-modal-header').modal({
        closable: false,

        onDeny: () => {
          $('#plan').dropdown('set selected', this.props.config.site.code);
        },

        onApprove: () => {
          this.props.actions.setSite(code, this.props.info.url[code]);
          this.props.actions.resetSearch();
          this.props.actions.resetSchedule();
          this.props.actions.saveLocalStore();
          $('#plan').dropdown('set selected', '-');
        }
      }).modal('show');
    } else {
      this.props.actions.setSite(code, this.props.info.url[code]);
      this.props.actions.resetSearch();
      this.props.actions.resetSchedule();
      this.props.actions.saveLocalStore();
      $('#plan').dropdown('set selected', '-');
    }
  }

  changePlan = (level, code, name) => {
    if (Object.keys(this.props.schedule.selected).length) {
      $('#change-modal-header').modal({
        closable: false,

        onDeny: () => {
          const prev = `${this.props.config.plan.level}-${this.props.config.plan.code}`;

          $('#plan').dropdown('set selected', prev);
        },

        onApprove: () => {
          this.props.actions.setPlan(level, code, name);
          this.props.actions.resetSearch();
          this.props.actions.resetSchedule();
          this.props.actions.saveLocalStore();
          if (level !== '') {
            $('#dropdown-type').dropdown('set selected', '');
            this.props.actions.getSubjects($('#inputSearch').val(), 17, 1);
          }
        }
      }).modal('show');
    } else {
      this.props.actions.setPlan(level, code, name);
      this.props.actions.resetSearch();
      this.props.actions.resetSchedule();
      this.props.actions.saveLocalStore();
      if (level !== '') {
        $('#dropdown-type').dropdown('set selected', '');
        this.props.actions.getSubjects($('#inputSearch').val(), 17, 1);
      }
    }
  }

  handleSaveLocal = () => {
    this.props.actions.resetSchedule();
    this.props.actions.saveLocalStore();
  }

  render = () => {
    const plans = [];
    let level = '';

    if (this.props.config.plan.level) {
      level = (
        <div className={`lbl level ${this.props.config.plan.level.toLowerCase().substring(0, 3)}`}>
          <label className="--no-pointer">{this.props.config.plan.level.substring(0, 3)}</label>
        </div>
      );
    }

    if (this.props.info && this.props.info.plan[this.props.config.site.code]) {
      const len = this.props.info.plan[this.props.config.site.code].length;

      for (let x = 0; x < len; x++) {
        const value = this.props.info.plan[this.props.config.site.code][x];

        plans[x] = (
          <div
            className={`item ${this.props.config.plan.code === value.code ? 'active' : ''}`}
            key={value.code}
            data-value={`${value.level}-${value.code}`}
          >{value.name}</div>
        );
      }
    }

    return (
      <div className="nav-site">
        <div id="change-modal-header" className="ui small modal">
          <div className="header">
            {'ADVERTENCIA'}
          </div>
          <div className="content">
            <p>{'Se borrará el horario actual.'}</p>
          </div>
          <div className="actions">
            <div className="ui grey cancel button">{'VOLVER'}</div>
            <div className="ui positive button">{'CAMBIAR'}</div>
          </div>
        </div>
        <div id="site" className="ui top pointing dropdown">
          <div className="lbl site"><label>{this.props.config.site.name.toUpperCase()}</label></div>
          <div className="menu">
            <div
              className={`
                item
                ${!this.props.info.plan.ama ? 'disabled' : ''}
                ${this.props.config.site.code === 'ama' ? 'active' : ''}
              `}
              data-value="ama"
            >{'Amazonia'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.bog ? 'disabled' : ''}
                ${this.props.config.site.code === 'bog' ? 'active' : ''}
              `}
              data-value="bog"
            >{'Bogotá'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.car ? 'disabled' : ''}
                ${this.props.config.site.code === 'car' ? 'active' : ''}
              `}
              data-value="car"
            >{'Caribe'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.man ? 'disabled' : ''}
                ${this.props.config.site.code === 'man' ? 'active' : ''}
              `}
              data-value="man"
            >{'Manizales'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.med ? 'disabled' : ''}
                ${this.props.config.site.code === 'med' ? 'active' : ''}
              `}
              data-value="med"
            >{'Medellín'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.ori ? 'disabled' : ''}
                ${this.props.config.site.code === 'ori' ? 'active' : ''}
              `}
              data-value="ori"
            >{'Orinoquia'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.pal ? 'disabled' : ''}
                ${this.props.config.site.code === 'pal' ? 'active' : ''}
              `}
              data-value="pal"
            >{'Palmira'}</div>
            <div
              className={`
                item
                ${!this.props.info.plan.tum ? 'disabled' : ''}
                ${this.props.config.site.code === 'tum' ? 'active' : ''}
              `}
              data-value="tum"
            >{'Tumaco'}</div>
          </div>
        </div>
        {level}
        <div id="plan" className="ui top pointing dropdown">
          <div className={`lbl plan ${this.props.config.plan.code ? 'active' : ''}`}>
            <label>{utils.add3Dots(this.props.config.plan.name, 25)}</label>
          </div>
          <div className="menu">
            <div className="ui icon search input">
              <i className="search icon"></i>
              <input type="text" placeholder="Buscar plan..." />
            </div>
            <div className="scrolling menu --y-scrolling">
              <div
                className={`item ${!this.props.config.plan.code ? 'active' : ''}`}
                data-value={'-'}
              >{'SIN PLAN DE ESTUDIOS'}</div>
              {plans}
            </div>
          </div>
        </div>
        <div
          id="reset"
          className="lbl reset-local "
          onClick={this.handleSaveLocal}
          data-variation="mini inverted transition hidden"
        >
          <label><i className="erase icon --no-margin"></i></label>
        </div>
      </div>
    );
  }
}

Header.displayName = 'Header';
