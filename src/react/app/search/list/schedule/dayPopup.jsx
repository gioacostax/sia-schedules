/* Import React & Redux */
import React from 'react';

/* Component */
export default props => {
  const day = [];

  if (props.values.hour) {
    for (let x = 0; x < props.values.hour.length; x++) {
      if (props.values.hour[x]) {
        let place = props.values.place[x];

        if (props.values.place[x] === 'null') { place = '-'; }

        day[x] = (
          <tr key={x}>
            <td>{props.values.hour[x]}</td>
            <td>{place}</td>
          </tr>
        );
      }
    }
    return (
      <div id="hourdetail" className="ui popup mini inverted top center transition hidden">
        <table className="ui celled inverted table">
          <thead>
            <tr>
              <th>{'HORA'}</th>
              <th>{'SALÓN'}</th>
            </tr>
          </thead>
          <tbody>{day}</tbody>
        </table>
      </div>
    );
  }

  return null;
};
