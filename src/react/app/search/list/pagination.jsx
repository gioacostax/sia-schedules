/* Import React & Redux */
import React from 'react';

import { utils } from 'src/lib';

/* Component */
export default class ListPagination extends React.Component {

  handlePag = event => {
    this.props.setPag(parseInt(event.target.getAttribute('data-page'), 10));
  }

  render = () => {
    const renderPags = [];
    const nPages = this.props.subjects.data ? this.props.subjects.data.pags : 0;

    if (nPages > 0) {
      const aPage = this.props.subjects.data ? this.props.subjects.data.aPag : 1;
      const minRange = Math.max(1, aPage - 3);
      const maxRange = Math.min(nPages, aPage + 3);

      if (minRange !== 1) {
        renderPags.push(
          <div
            key={1}
            className="item --no-bold"
            data-page={1}
            onClick={this.handlePag}
          >{'1'}</div>
        );
        if (minRange - 1 !== 1) {
          renderPags.push(
            <div
              key={aPage + 200}
              className="item --no-pointer --no-bold"
              data-page={0}
            >{'...'}</div>
          );
        }
      }

      for (let x = minRange; x <= maxRange; x++) {
        renderPags.push(
          <div
            key={x}
            className={`item ${aPage === x ? 'active' : ''}`}
            data-page={x}
            onClick={this.handlePag}
          >{x}</div>
        );
      }

      if (maxRange !== nPages) {
        renderPags.push(
          <div
            key={aPage + 400}
            className="item --no-pointer --no-bold"
            data-page={0}
          >{'...'}</div>
        );
        renderPags.push(
          <div
            key={nPages}
            className="item --no-bold"
            data-page={nPages}
            onClick={this.handlePag}
          >{nPages}</div>
        );
      }

      return (
        <div id="pagination">
          <span className="--bold">{'Pag '}</span>
          {renderPags}
        </div>
      );
    } else if (nPages === null) {
      let totalCreditos = 0;

      const selected = utils.objToArray(this.props.subjects.data.list);

      for (let x = 0; x < selected.length; x++) {
        totalCreditos = totalCreditos + selected[x].credits;
      }

      return (
        <div id="pagination">
          <span className="credits --bold">{`${totalCreditos} Creditos`}</span>
          <i className="check circle icon --no-margin"></i>
        </div>
      );
    }

    return null;
  }
}

ListPagination.displayName = 'ListPagination';
