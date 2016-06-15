/* Actions types */
/* eslint no-unused-vars: 0 */

const LOAD_SCHEDULE_STATE = 'prometeo-app/schedule/LOAD_SCHEDULE_STATE';

const ADD_SUBJECT = 'prometeo-app/schedule/ADD_SUBJECT';
const REMOVE_SUBJECT = 'prometeo-app/schedule/REMOVE_SUBJECT';

const SETUP_GROUPS = 'prometeo-app/schedule/SETUP_GROUPS';
const SET_GROUP = 'prometeo-app/schedule/SET_GROUP';
const RESET_STATE = 'prometeo-app/schedule/RESET_STATE';
const CHECK_SHOW = 'prometeo-app/schedule/CHECK_SHOW';

const ADD_TO_MAP = 'prometeo-app/schedule/ADD_TO_MAP';
const REMOVE_FROM_MAP = 'prometeo-app/schedule/REMOVE_FROM_MAP';
const UPDATE_COLOR_MAP = 'prometeo-app/schedule/UPDATE_COLOR_MAP';

const RESET_SCHEDULE = 'prometeo-app/schedule/RESET_SCHEDULE';

/* Import Libs */
import { sia, utils } from 'src/lib';

/* eslint no-unused-vars: 0 */

/* Initial State */
const initialMap = [[], [], [], [], [], [], []];

for (let x = 0; x < 7; x++) {
  for (let y = 6; y < 22; y++) {
    initialMap[x][y] = { state: 0 };
  }
}

const initialState = {
  selected: {},
  map: initialMap,
  mapCount: 0
};

/* Private Actions */

function removeSelect(code) {
  return {
    type: 'REMOVE_SUBJECT',
    code
  };
}

function setupGroups(code, groups) {
  return {
    type: 'SETUP_GROUPS',
    code,
    groups
  };
}

/* Public Actions */
export function loadScheduleState(state) {
  return {
    type: 'LOAD_SCHEDULE_STATE',
    state
  };
}

export function addToMap(nodes) {
  return {
    type: 'ADD_TO_MAP',
    nodes
  };
}

export function removeFromMap(code, state) {
  return {
    type: 'REMOVE_FROM_MAP',
    code,
    state
  };
}

export function updateColorMap(code, color) {
  return {
    type: 'UPDATE_COLOR_MAP',
    code,
    color
  };
}

export function addSubject(subject) {
  return {
    type: 'ADD_SUBJECT',
    subject
  };
}

export function removeSubject(code) {
  return dispatch => {
    dispatch(removeFromMap(code, 1));
    dispatch(removeSelect(code));
  };
}

export function setGroup(codeSubject, codeGroup, info) {
  return {
    type: 'SET_GROUP',
    codeSubject,
    codeGroup,
    info
  };
}

export function resetStateTo(code, state) {
  return {
    type: 'RESET_STATE',
    code,
    state
  };
}

export function checkShow(code, groups) {
  return {
    type: 'CHECK_SHOW',
    code,
    groups
  };
}

export function initGroups(code, groups) {
  return dispatch => {
    dispatch(setupGroups(code, groups));
    dispatch(checkShow(code, groups));
  };
}

export function resetSchedule() {
  return { type: 'RESET_SCHEDULE' };
}

/* Reducer */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SCHEDULE_STATE': {
      return { ...state, ...action.state };
    }

    case 'ADD_SUBJECT': {
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.subject.code]: { ...action.subject, groups: [] }
        }
      };
    }

    case 'REMOVE_SUBJECT': {
      const selected = state.selected;
      delete selected[action.code];

      return { ...state, selected };
    }

    case 'SETUP_GROUPS': {
      if (!state.selected[action.code].groups.length) {
        const groups = [];

        for (let x = 0; x < action.groups.length; x++) {
          groups[action.groups[x].code] = { show: true, state: 0 };
        }

        return {
          ...state,
          selected: {
            ...state.selected,
            [action.code]: { ...state.selected[action.code], groups }
          }
        };
      }
      return state;
    }

    case 'SET_GROUP': {
      const selected = state.selected;

      selected[action.codeSubject].groups[action.codeGroup] = {
        ...selected[action.codeSubject].groups[action.codeGroup], ...action.info
      };

      return { ...state, selected };
    }

    case 'RESET_STATE': {
      const selected = state.selected;

      for (let x = 0; x < selected[action.code].groups.length; x++) {
        if (typeof selected[action.code].groups[x] !== 'undefined'
        && selected[action.code].groups[x] !== null) {
          selected[action.code].groups[x] = {
            ...selected[action.code].groups[x],
            state: action.state
          };
        }
      }

      return { ...state, selected };
    }

    case 'CHECK_SHOW': {
      const selected = state.selected;

      for (let x = 0; x < selected[action.code].groups.length; x++) {
        if (typeof selected[action.code].groups[x] !== 'undefined'
        && selected[action.code].groups[x] !== null) {
          let index = 0;
          for (let y = 0; y < action.groups.length; y++) {
            if (action.groups[y].code === x.toString()) {
              index = y;
              break;
            }
          }
          const mapGroup = sia.utils.parseSchedule(action.groups[index].schedule);
          const valid = utils.validGroup(mapGroup, utils.parseMap(state.map));

          if (valid) {
            selected[action.code].groups[x] = {
              ...selected[action.code].groups[x],
              show: true
            };
          } else if (selected[action.code].groups[x].state === 1) {
            selected[action.code].groups[x] = {
              ...selected[action.code].groups[x],
              show: true
            };
          } else {
            selected[action.code].groups[x] = {
              ...selected[action.code].groups[x],
              show: false
            };
          }
        }
      }

      return { ...state, selected };
    }

    case 'ADD_TO_MAP': {
      const map = Array.from(state.map);
      let mapCount = state.mapCount;

      for (let x = 0; x < action.nodes.length; x++) {
        for (let y = 0; y < 7; y++) {
          if (action.nodes[x].group.schedule[y]) {
            for (let z = 0; z < action.nodes[x].group.schedule[y].hour.length; z++) {
              const hours = action.nodes[x].group.schedule[y].hour[z].split('-');
              const info = {
                ...action.nodes[x],
                group: {
                  ...action.nodes[x].group,
                  hour: action.nodes[x].group.schedule[y].hour[z],
                  place: action.nodes[x].group.schedule[y].place[z]
                }
              };

              map[y][hours[0]] = info;

              if (action.nodes[x].state === 1) {
                mapCount++;
              }
            }
          }
        }
      }
      return { ...state, map, mapCount };
    }

    case 'REMOVE_FROM_MAP': {
      const map = Array.from(state.map);
      let mapCount = state.mapCount;

      for (let x = 0; x < 7; x++) {
        for (let y = 6; y < 22; y++) {
          if (map[x][y].code === action.code && map[x][y].state === action.state) {
            map[x][y] = { state: 0 };

            if (action.state === 1) {
              mapCount--;
            }
          }
        }
      }
      return { ...state, map, mapCount };
    }

    case 'UPDATE_COLOR_MAP': {
      const map = Array.from(state.map);

      for (let x = 0; x < 7; x++) {
        for (let y = 6; y < 22; y++) {
          if (map[x][y].code === action.code) {
            map[x][y] = { ...map[x][y], color: action.color };
          }
        }
      }
      return { ...state, map };
    }

    case 'RESET_SCHEDULE': {
      const map = [[], [], [], [], [], [], []];

      for (let x = 0; x < 7; x++) {
        for (let y = 6; y < 22; y++) {
          map[x][y] = { state: 0 };
        }
      }
      return { ...initialState, map };
    }

    default: {
      return state;
    }
  }
}
