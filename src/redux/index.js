import { combineReducers } from 'redux';
import info from './info';
import config from './config';
import schedule from './schedule';
import search from './search';

export default combineReducers({
  info,
  config,
  schedule,
  search
});
