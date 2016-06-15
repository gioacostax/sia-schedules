/* Import React & Redux */
import React from 'react';

/* Import Components */
import ListPagination from './pagination.jsx';
import ListSubject from './subject.jsx';

/* Component */
export default class SearchList extends React.Component {

  setPag = pag => {
    this.props.search(null, null, pag);
  }

  render = () => {
    const count = this.props.subjects.data ?
      this.props.subjects.data.count || Object.keys(this.props.subjects.data.list).length : 0;

    return (
      <div id="list" className={this.props.loading || !count ? 'empty' : ''}>
        <div className="list header">
          <div className="th select"><i className="check icon --no-margin"></i></div>
          <div className="th type">{'TIPOLOGÍA'}</div>
          <div className="th code">{'CÓDIGO'}</div>
          <div className="th credits">{'C'}</div>
          <div className="th name">{'NOMBRE'}</div>
          <div className="th drop"><i className="lab icon --no-margin"></i></div>
        </div>
        {
          this.props.loading ?
            <div className="list content">
              <div className="--bar-loader">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b4"></div>
                <div className="bar b5"></div>
                <div className="bar b6"></div>
              </div>
            </div> :
              this.props.subjects.data && count ?
                <div className="list content --y-scrolling">
                {
                  this.props.isListSelected ?
                    Object.keys(this.props.subjects.data.list).map(code => {
                      return (
                        <ListSubject
                          key={code}
                          values={this.props.subjects.data.list[code]}
                        />
                      );
                    }) :
                    this.props.subjects.data.list.map(value => {
                      return <ListSubject key={value.code} values={value} />;
                    })
                }
                </div> :
                <div className="list content"><i className="sidebar icon"></i></div>
        }
        <div className="list footer">
          <div className="count">
            <i className="rocket icon"></i>
            {`${count} resultado${count === 1 ? '' : 's'}`}
          </div>
          <div className="pags">
            <ListPagination subjects={this.props.subjects} setPag={this.setPag} />
          </div>
        </div>
      </div>
    );
  }
}

SearchList.displayName = 'SearchList ';
