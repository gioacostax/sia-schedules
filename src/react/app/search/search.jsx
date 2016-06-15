/* Import React & Redux */
import { connect } from 'react-redux';
import React from 'react';

/* Import Libs */
import { reduxUtils } from 'src/lib';

/* Import Components */
import SearchList from './list/list.jsx';
import FilterType from './filter/type.jsx';
import FilterHour from './filter/hour.jsx';

/* Import Redux Actions */
import { getSubjects, toggleSelList } from 'src/redux/search';

/* --- Redux Optimizer --- */

const states = ['schedule', 'search', 'config'];
const actions = [{ getSubjects }, { toggleSelList }];

@connect(reduxUtils.statesToProps(states), reduxUtils.dispatchToProps(actions))

/* --- Redux Optimizer --- */

/* Component */
export default class Search extends React.Component {

  /* Initial State */
  state = {
    loading: false
  }

  componentWillReceiveProps = props => {
    if (props.search.filters !== this.props.search.filters) {
      this.search();
    }
  }

  viewSchedule = () => {
    if (Object.keys(this.props.schedule.selected).length || this.props.search.isListSelected) {
      this.props.toggleView('schedule');
    }
  }

  viewSelects = () => {
    if (Object.keys(this.props.schedule.selected).length || this.props.search.isListSelected) {
      this.props.actions.toggleSelList(!this.props.search.isListSelected);
    }
  }

  handleInput = event => {
    event.persist();
    if (event.key === 'Enter') {
      this.search(null, event.target.value);
    }
  }

  search = (event, text, pag) => {
    const search = text || $('#inputSearch').val();
    const aPag = isNaN(pag) ? 1 : pag;

    this.setState({ loading: true });

    if (this.props.search.isListSelected) {
      this.props.actions.toggleSelList(false);
    }

    this.props.actions.getSubjects(search, 17, aPag)
    .then(() => {
      this.setState({ loading: false });
    }).catch(() => {
      $('#fetch-modal-search').modal('show');
      this.setState({ loading: false });
    });
  }

  render = () => {
    const countSelected = Object.keys(this.props.schedule.selected).length;
    const isListSelected = this.props.search.isListSelected;

    return (
      <div className="main-search">
        <div id="fetch-modal-search" className="ui small modal">
          <div className="header error">
            {'ERROR'}
          </div>
          <div className="content">
            <p>{'Hubo un error en la búsqueda...'}</p>
          </div>
          <div className="actions">
            <div className="ui positive button">{'CONTINUAR'}</div>
          </div>
        </div>
        <div id="search-nav" className="ui pointing menu nav">
          <div className="header active item"><i className="search icon"></i>{'BUSCADOR'}</div>
          <a
            className={`item ${!countSelected && !isListSelected ? 'disabled' : ''}`}
            onClick={this.viewSelects}
          >
            <i className={`check circle icon ${isListSelected ? 'green' : ''}`}></i>
            <span className={countSelected ? '--bold' : ''}>{countSelected}</span>
          </a>
          <a
            className={`item schedule ${!countSelected && !isListSelected ? 'disabled' : ''}`}
            onClick={this.viewSchedule}
          >
            <i className="calendar icon --no-margin"></i>
          </a>
          <div className="right menu">
            <FilterType
              level={this.props.config.plan.level}
              type={this.props.search.filters.type}
            />
            <FilterHour hour={this.props.search.filters.hour} />
            <div className="item">
              <div id="iconinputsearch" className="ui transparent fluid right icon input">
                <i className="search link icon" onClick={this.search}></i>
                <input
                  id="inputSearch"
                  type="text"
                  placeholder="Buscar..."
                  onKeyUp={this.handleInput}
                />
              </div>
            </div>
          </div>
        </div>
        {
          isListSelected ?
            <SearchList
              isListSelected={isListSelected}
              loading={false}
              subjects={
                {
                  data: {
                    list: this.props.schedule.selected,
                    countSelected,
                    pags: null,
                    aPag: null
                  }
                }
              }
              onSearch={this.handleSearch}
            /> :
            <SearchList
              isListSelected={isListSelected}
              loading={this.state.loading}
              subjects={this.props.search.subjects}
              search={this.search}
            />
        }
      </div>
    );
  }
}

Search.displayName = 'Search';
