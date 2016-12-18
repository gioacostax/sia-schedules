/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { sia, utils, reduxUtils } from 'src/lib';

/* Import Redux Actions */
import { setTypeFilter } from 'src/redux/search';

/* --- Redux Optimizer --- */

const actions = [{ setTypeFilter }];

@connect(null, reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class FilterType extends React.Component {

  componentDidMount = () => {
    $('#dropdown-type').dropdown({
      onChange: type => {
        this.props.actions.setTypeFilter(type);
      }
    });
  }

  render = () => {
    return (
      <div
        id="dropdown-type"
        className="ui dropdown icon item"
        data-content="Filtrar por Tipología"
        data-variation="mini inverted"
        data-position="top center"
      >
        <i className="circle icon" style={utils.getColorType(this.props.type)}></i>
        <span className="--bold">{sia.TYPE[this.props.type] || 'TIPOLOGÍA (TODOS)'}</span>
        <div className="menu">
          <div className="item active" data-value={''}>
            <i className="circle icon" style={utils.getColorType('x')}></i>{'Todos'}
          </div>
          {
            this.props.level !== 'POS' ?
              <div className="item" data-value={'p'}>
                <i className="circle icon" style={utils.getColorType('p')}></i>{'Nivelación'}
              </div> : null
          }
          {
            this.props.level !== 'POS' ?
              <div className="item" data-value={'b'}>
                <i className="circle icon" style={utils.getColorType('b')}></i>{'Fundamentación'}
              </div> : null
          }
          {
            this.props.level !== 'POS' ?
              <div className="item" data-value={'c'}>
                <i className="circle icon" style={utils.getColorType('c')}></i>{'Disciplinar'}
              </div> : null
          }
          {
            this.props.level !== 'POS' ?
              <div className="item" data-value={'l'}>
                <i className="circle icon" style={utils.getColorType('l')}></i>{'Libre Elección'}
              </div> : null
          }
          {
            this.props.level !== 'PRE' ?
              <div className="item" data-value={'o'}>
                <i className="circle icon" style={utils.getColorType('o')}></i>{'Obligatorio'}
              </div> : null
          }
          {
            this.props.level !== 'PRE' ?
              <div className="item" data-value={'t'}>
                <i className="circle icon" style={utils.getColorType('t')}></i>{'Elegible'}
              </div> : null
          }
        </div>
        <i className="filter icon"></i>
      </div>
    );
  }
}

FilterType.displayName = 'FilterType';
