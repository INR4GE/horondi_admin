import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './products-nav-search.styles';

import {
  getFiltredProducts,
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter,
  setSearchFilter
} from '../../../redux/products/products.actions';

import { productsTranslations } from '../../../translations/product.translations';
import { config } from '../../../configs';

const { submitKey } = config;
const { CLEAR_FILTERS, SEARCH } = productsTranslations;

const ProductsNavSearch = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(({ Products }) => Products.filters);

  const { isHotItemFilter, searchFilter } = filters;

  const handleSearch = (event) => {
    dispatch(setSearchFilter(event.target.value));
  };

  const searchValue = () => {
    if (searchFilter.trim().length) {
      dispatch(getFiltredProducts({}));
    }
  };

  const handleSearchSubmit = (event) => {
    if (event.key === submitKey) {
      searchValue();
    }
  };

  const handleClearFilters = () => {
    dispatch(setColorsFilter([]));
    dispatch(setPatternsFilter([]));
    dispatch(setCategoryFilter([]));
    dispatch(setSearchFilter(''));
    dispatch(setModelsFilter([]));
  };

  return (
    <Grid
      container
      justify='space-between'
      className={styles.container}
      spacing={2}
    >
      <Grid item>
        <Paper className={styles.root}>
          <InputBase
            placeholder={SEARCH}
            value={searchFilter}
            onChange={handleSearch}
            onKeyPress={handleSearchSubmit}
          />
          <Tooltip title={SEARCH} placement='bottom'>
            <IconButton
              className={styles.iconButton}
              aria-label='search'
              onClick={searchValue}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={12} sm>
        <Button
          className={styles.clearButton}
          disabled={
            Object.values(filters).every((filter) => !filter.length) &&
            !isHotItemFilter
          }
          variant='contained'
          color='primary'
          onClick={handleClearFilters}
        >
          {CLEAR_FILTERS}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductsNavSearch;
