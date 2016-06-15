/* Import React & Redux */
import React from 'react';

/* Import Components */
import Item from './item.jsx';

/* Component */
export default (props) => {
  const hour = [];

  for (let x = 6; x < 22; x++) {
    hour[x] = (
      <tr key={x}>
        <td className="th-hour">{`${x}:00`}</td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[0][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[1][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[2][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[3][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[4][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[5][x]} />
        </td>
        <td className="map-hour" id={`hL${x}`}>
          <div className="line"></div><Item info={props.map[6][x]} />
        </td>
      </tr>
    );
  }

  return (
    <table className="ui unstackable celled table map-table">
      <thead>
        <tr>
          <th className="th-hour">{'HORA'}</th>
          <th>{'LUNES'}</th>
          <th>{'MARTES'}</th>
          <th>{'MIÉRCOLES'}</th>
          <th>{'JUEVES'}</th>
          <th>{'VIERNES'}</th>
          <th>{'SÁBADO'}</th>
          <th>{'DOMINGO'}</th>
        </tr>
      </thead>
      <tbody>{hour}</tbody>
    </table>
  );
};
