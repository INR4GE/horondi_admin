import { config } from '../../configs';
import {
  SET_POPULAR_CATEGORIES,
  SET_STATS_LOADING,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE
} from './stats.types';

const { labels, doughnut, titles, bar } = config;

const initialState = {
  loading: false,
  doughnut: {
    categories: doughnut.initialValues,
    orders: doughnut.initialValues,
    selectedValue: labels.doughnut.select[0].value
  },
  bar: {
    products: bar.initialValues,
    orders: bar.initialValues,
    users: bar.initialValues,
    selectedValue: titles.statisticTitles.mainStatisticOptions[0]
  },
  date: 7
};

const statsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_STATS_LOADING: {
    return {
      ...state,
      loading: action.payload
    };
  }
  case SET_POPULAR_CATEGORIES: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        categories: action.payload
      }
    };
  }
  case SET_DOUGHNUT_VALUE: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        selectedValue: action.payload
      }
    };
  }
  case SET_DATE_VALUE: {
    return {
      ...state,
      date: action.payload
    };
  }
  case SET_BAR_VALUE: {
    return {
      ...state,
      bar: {
        ...state.bar,
        selectedValue: action.payload
      }
    };
  }
  default:
    return state;
  }
};

export default statsReducer;