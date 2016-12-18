/* Import React & Redux */
import React from 'react';

/* Import Libs */
import { utils } from 'src/lib';

/* Import Components */
import Subject from './subject/subject.jsx';

/* Component */
export default props => {
  return Object.keys(props.selected).length ?
    <div className="list --x-scrolling">
    {
      Object.keys(props.selected).map((code, index) => {
        return (
          <Subject
            key={code}
            color={utils.getColorGroup(index)}
            values={props.selected[code]}
          />
        );
      })
    }
  </div> : <div className="list --x-scrolling"><i className="sidebar icon"></i></div>;
};
