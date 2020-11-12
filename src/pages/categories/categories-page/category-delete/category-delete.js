import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import { useStyles } from './category-delete.styles';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import {
  deleteCategory,
  setCategorySwitchId,
  toggleCategoryDeleteDialog
} from '../../../../redux/categories/categories.actions';

import { config } from '../../../../configs';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import { SaveButton } from '../../../../components/buttons';

const { DELETE_CATEGORY } = config.buttonTitles;
const { DELETE_CATEGORY_MESSAGE } = config.messages;
const { categories: categoryLabels } = config.labels;

const CategoryDelete = () => {
  const { categories, deleteId, switchId } = useSelector(({ Categories }) => ({
    categories: Categories.categories,
    deleteId: Categories.deleteId,
    switchId: Categories.switchId
  }));

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const styles = useStyles();
  const dispatch = useDispatch();

  const handleDeleteCategory = () => {
    const removeCategory = () => {
      dispatch(closeDialog());
      dispatch(deleteCategory());
      dispatch(toggleCategoryDeleteDialog());
    };
    openSuccessSnackbar(
      removeCategory,
      DELETE_CATEGORY,
      DELETE_CATEGORY_MESSAGE,
      DELETE_CATEGORY
    );
  };

  const handleChange = (e) => {
    dispatch(setCategorySwitchId(e.target.value));
  };

  const categoriesOptionList = categories
    .filter((item) => item.isMain && item._id !== deleteId)
    .map((item, idx) => (
      <MenuItem key={idx} id={item.code} data-cy={item.code} value={item._id}>
        {item.name[0].value}
      </MenuItem>
    ));

  return (
    <Grid className={styles.detailsContainer}>
      <Grid className={styles.deletePanel}>
        <FormControl className={styles.formControl}>
          <InputLabel id='category-label'>
            {categoryLabels.switchCategory}
          </InputLabel>
          <Select
            labelId='category-label'
            id='category'
            name='category'
            type='text'
            onBlur={handleChange}
            onChange={handleChange}
            className={styles.formSelect}
            data-cy='category'
          >
            {categoriesOptionList}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <SaveButton
            onClick={handleDeleteCategory}
            title={DELETE_CATEGORY}
            data-cy='submit-category-delete'
            className={styles.saveButton}
            disabled={!switchId}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CategoryDelete;