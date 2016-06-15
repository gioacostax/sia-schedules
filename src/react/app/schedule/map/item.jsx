/* Import React & Redux */
import React from 'react';

/* Import Libs */
import { utils } from 'src/lib';

/* Component */
export default props => {
  if (props.info.state > 0) {
    const hours = props.info.group.hour.split('-');
    const range = hours[1] - hours[0];
    const height = { height: `${utils.getHeight(range)}px` };
    const color = { backgroundColor: props.info.color };
    const name = utils.add3Dots(utils.ucFirst(props.info.name), 17);

    return (
      <div className={`sgroup state-${props.info.state}`} style={height}>
        <div className="color" style={color}></div>
        <div className="detail">
          <div className="name">{`G${props.info.group.code}-${name}`}</div>
          <div className="place">
            {`${range > 1 ? utils.validPlace(props.info.group.place) : ''}`}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
