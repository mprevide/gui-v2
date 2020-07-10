import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import _ from 'lodash';

// import type { exampleType } from '../../common/types/example'

const maxPush = (arr, value, max) => {
  if (arr.length >= max) {
    arr.splice(0, arr.length - max + 1);
  }
  return arr.concat(value);
};

const START_POLLING = 'app/dashboard/START_POLLING';
const STOP_POLLING = 'app/dashboard/STOP_POLLING';
const SET_INTERVAL = 'app/dashboard/SET_INTERVAL';
const UPDATE_VALUES = 'app/dashboard/UPDATE_VALUES';
const ERROR_POLLING = 'app/dashboard/ERROR_POLLING';
const ADD_WIDGET = 'app/dashboard/ADD_WIDGET';
const ADD_WIDGET_CONFIG = 'app/dashboard/ADD_WIDGET_CONFIG';
const REMOVE_WIDGET = 'app/dashboard/REMOVE_WIDGET';
const REMOVE_WIDGET_CONFIG = 'app/dashboard/REMOVE_WIDGET_CONFIG';
const GET_LAYOUT = 'app/dashboard/GET_LAYOUT';
const UPDATE_LAYOUT = 'app/dashboard/UPDATE_LAYOUT';
const INIT_LAYOUT = 'app/dashboard/INIT_LAYOUT';
const ADD_WIDGET_SAGA = 'app/dashboard/ADD_WIDGET_SAGA';
const REMOVE_WIDGET_SAGA = 'app/dashboard/REMOVE_WIDGET_SAGA';

export const constants = {
  START_POLLING,
  STOP_POLLING,
  SET_INTERVAL,
  UPDATE_VALUES,
  ERROR_POLLING,
  ADD_WIDGET_CONFIG,
  ADD_WIDGET,
  REMOVE_WIDGET,
  REMOVE_WIDGET_CONFIG,
  GET_LAYOUT,
  UPDATE_LAYOUT,
  INIT_LAYOUT,
  ADD_WIDGET_SAGA,
  REMOVE_WIDGET_SAGA,
};

// ------------------------------------
// Actions
// ------------------------------------
export const startPolling = createAction(START_POLLING, schema => schema);
export const stopPolling = createAction(STOP_POLLING);
export const setInterval = createAction(SET_INTERVAL, interval => interval);
export const errorPolling = createAction(ERROR_POLLING);
export const updateValues = createAction(UPDATE_VALUES, data => data);

export const addWidget = createAction(ADD_WIDGET, layout => layout);
export const removeWidget = createAction(REMOVE_WIDGET, id => id);

export const addWidgetConfig = createAction(
  ADD_WIDGET_CONFIG,
  config => config,
);
export const removeWidgetConfig = createAction(REMOVE_WIDGET_CONFIG, id => id);

export const addWidgetSaga = createAction(ADD_WIDGET_SAGA, saga => saga);
export const removeWidgetSaga = createAction(REMOVE_WIDGET_SAGA, id => id);

export const getLayout = createAction(GET_LAYOUT, layout => ({ layout }));
export const updateLayout = createAction(UPDATE_LAYOUT, layout => ({ layout }));
export const initLayout = createAction(INIT_LAYOUT, layout => ({ layout }));

export const actions = {
  startPolling,
  stopPolling,
  setInterval,
  updateValues,
  errorPolling,
  addWidget,
  removeWidget,
  addWidgetConfig,
  removeWidgetConfig,
  getLayout,
  updateLayout,
  initLayout,
  addWidgetSaga,
  removeWidgetSaga,
};

export const reducers = {
  [UPDATE_VALUES]: (state, { payload }) =>
    state.update('data', data => maxPush(data, payload, 15)),
  [UPDATE_LAYOUT]: (state, { payload }) => state.merge({ ...payload }),
  [ADD_WIDGET_CONFIG]: (state, { payload }) =>
    state.mergeIn(['configs'], payload),
  [ADD_WIDGET_SAGA]: (state, { payload }) => state.mergeIn(['saga'], payload),
  [ADD_WIDGET]: (state, { payload }) =>
    state.update('layout', layout => _.concat(layout, payload)),
  [REMOVE_WIDGET_CONFIG]: (state, { payload }) =>
    state.deleteIn(['configs', payload]),
  [REMOVE_WIDGET_SAGA]: (state, { payload }) =>
    state.deleteIn(['saga', payload]),
  [REMOVE_WIDGET]: (state, { payload }) =>
    state.update('layout', layout => _.reject(layout, { i: payload })),
  [INIT_LAYOUT]: (state, { payload }) => state.merge({ ...payload }),
};

export const initialState = () =>
  Map({
    configs: {},
    layout: [],
    saga: {},
    data: [],
  });

export default handleActions(reducers, initialState());
