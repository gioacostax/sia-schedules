/* Import Dependencies */
import { bindActionCreators } from 'redux';

/* Public Functions */

/*
 * Require an String Array as param with the name of the store
 *
 * Example: ['store1', 'store2', ...]
 */
export const statesToProps = keys => {
  return state => {
    const props = {};
    const len = keys.length;

    for (let x = 0; x < len; x++) {
      props[keys[x]] = state[keys[x]];
    }
    return props;
  };
};

/*
 * Require an Object Array as param with the name and function of the Action
 *
 * Example: [{ action1 }, { action2 , ...}]
 */
export const dispatchToProps = keys => {
  return dispatch => {
    const actions = { actions: {} };
    const len = keys.length;

    for (let x = 0; x < len; x++) {
      const name = Object.keys(keys[x])[0];

      actions.actions[name] = bindActionCreators(keys[x][name], dispatch);
    }

    return actions;
  };
};
