/* Import Dependencies */
import { sia } from 'src/lib';

/* Actions types */
/* eslint no-unused-vars: 0 */

const LOAD_CONFIG_STATE = 'prometeo-app/config/LOAD_CONFIG_STATE';
const SAVE_LOCALSTORE = 'prometeo-app/config/SAVE_LOCALSTORE';

const SET_SITE = 'prometeo-app/config/SET_SITE';
const SET_PLAN = 'prometeo-app/config/SET_PLAN';

/* eslint no-unused-vars: 0 */

/* Initial State */
const initialState = {
  site: {
    code: 'bog',
    url: 'sia.bogota.unal.edu.co',
    name: 'Bogotá'
  },
  plan: {
    level: '',
    code: '',
    name: 'SIN PLAN DE ESTUDIOS'
  }
};

/* Public Actions */
export function loadConfigState(state) {
  return {
    type: 'LOAD_CONFIG_STATE',
    state
  };
}

export function saveLocalStore() {
  return { type: 'SAVE_LOCALSTORE' };
}

export function setSite(code, url) {
  return {
    type: 'SET_SITE',
    site: {
      code,
      url,
      name: sia.NAME[code]
    }
  };
}

export function setPlan(level, code, name) {
  return {
    type: 'SET_PLAN',
    plan: {
      level,
      code,
      name
    }
  };
}

/* Reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CONFIG_STATE': {
      return { ...state, ...action.state };
    }

    case 'SET_SITE': {
      return { ...state, site: action.site };
    }

    case 'SET_PLAN': {
      return { ...state, plan: action.plan };
    }

    default: {
      return state;
    }
  }
}
