import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';

import { config } from '../../../configs/index';

const { labels } = config;

const EmailQuestionsFilter = ({ filterItems, changeHandler }) => (
  <ButtonGroup size='small' aria-label='small outlined button group'>
    <Button
      id='all'
      variant={filterItems.length ? 'outlined' : 'contained'}
      onClick={() => changeHandler('all')}
    >
      Всі
    </Button>
    {Object.entries(labels.emailQuestionsLabels.ua).map((status) => (
      <Button
        key={status[0]}
        variant={filterItems.includes(status[0]) ? 'contained' : 'outlined'}
        onClick={() => changeHandler(status[0])}
      >
        {status[1]}
      </Button>
    ))}
  </ButtonGroup>
);

EmailQuestionsFilter.propTypes = {
  filterItems: PropTypes.arrayOf(String),
  changeHandler: PropTypes.func
};

EmailQuestionsFilter.defaultProps = {
  filterItems: [],
  changeHandler: () => {}
};

export default EmailQuestionsFilter;
