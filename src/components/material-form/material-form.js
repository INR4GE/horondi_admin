import React from 'react';

import {
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Avatar
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Palette } from '@material-ui/icons';
import TabPanel from '../tab-panel';
import { SaveButton } from '../buttons';
import LoadingBar from '../loading-bar';
import useMaterialHandlers from '../../utils/use-material-handlers';
import { useStyles } from './material-form.styles';
import {
  addMaterial,
  showColorDialogWindow
} from '../../redux/material/material.actions';
import { config } from '../../configs';
import CheckboxOptions from '../checkbox-options';
import CreateColor from '../../pages/material/create-color';
import DialogWindowForComponent from '../dialog-window-for-component';

const { languages, materialErrorMessages } = config;

function MaterialForm({ material, id }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Material }) => ({
    loading: Material.materialLoading
  }));

  const {
    createMaterial,
    tabsValue,
    handleTabsChange,

    colorImagesToUpload,
    setColorImagesToUpload,
    colorImages,
    addNewColorImages
  } = useMaterialHandlers();

  const formSchema = Yup.object().shape({
    ukName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)

      .required(materialErrorMessages.VALIDATION_ERROR),

    enName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    ukDescription: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    enDescription: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    purpose: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),
    additionalPrice: Yup.number().required(
      materialErrorMessages.VALIDATION_ERROR
    )
  });

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      enName: material.enName || '',
      ukName: material.ukName || '',
      ukDescription: material.ukDescription || '',
      enDescription: material.enDescription || '',
      purpose: material.purpose || '',
      available: material.available || false,
      additionalPrice: 0
    },
    onSubmit: () => {
      const material = createMaterial(values);
      dispatch(addMaterial(material));
    }
  });
  const tabPanels =
    languages.length > 0
      ? languages.map((lang, index) => (
          <TabPanel key={lang} value={tabsValue} index={index}>
            <Paper className={styles.materialItemAdd}>
              <TextField
                data-cy={`${lang}Name`}
                id={`${lang}Name`}
                className={styles.textfield}
                variant='outlined'
                label={config.labels.material.name}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
              )}
              <TextField
                data-cy={`${lang}Description`}
                id={`${lang}Description`}
                className={styles.textfield}
                variant='outlined'
                label={config.labels.material.description}
                multiline
                error={
                  touched[`${lang}Description`] &&
                  !!errors[`${lang}Description`]
                }
                value={values[`${lang}Description`]}
                onChange={handleChange}
              />
              {touched[`${lang}Description`] &&
                errors[`${lang}Description`] && (
                  <div className={styles.inputError}>
                    {errors[`${lang}Description`]}
                  </div>
                )}
            </Paper>
          </TabPanel>
        ))
      : null;

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.material.available,
      handler: (e) => handleChange(e.target.checked)
    }
  ];
  const languageTabs =
    languages.length > 0
      ? languages.map((lang) => <Tab label={lang} key={lang} />)
      : null;
  if (loading) {
    return <LoadingBar />;
  }

  const colorClickHandler = () => {
    dispatch(showColorDialogWindow(true));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <Paper className={styles.materialItemAdd}>
            <div>
              {colorImagesToUpload
                ? Array.from(colorImagesToUpload).map((image, index) => (
                    <Avatar variant='square' key={index} src={image}>
                      <Palette />
                    </Avatar>
                  ))
                : null}
              {colorImages
                ? colorImages.map((image, index) => (
                    <Avatar variant='square' key={index} src={image} />
                  ))
                : null}
            </div>
            <TextField
              data-cy='purpose'
              id='purpose'
              className={styles.textfield}
              variant='outlined'
              label={config.labels.material.purpose}
              value={values.purpose}
              onChange={handleChange}
              error={touched.purpose && !!errors.purpose}
            />
            {touched.purpose && errors.purpose && (
              <div className={styles.inputError}>{errors.purpose}</div>
            )}
            <TextField
              data-cy='additionalPrice'
              id='additionalPrice'
              className={styles.textfield}
              variant='outlined'
              label={config.labels.material.additionalPrice}
              value={values.additionalPrice}
              onChange={handleChange}
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
          </Paper>
        </Grid>
        {languages.length > 0 ? (
          <div>
            <AppBar position='static'>
              <Tabs
                className={styles.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='tabs'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {tabPanels}
          </div>
        ) : null}
        <div className={styles.controlsBlock}>
          <div>
            <SaveButton
              className={styles.saveButton}
              data-cy='open-dialog'
              type='button'
              title={config.buttonTitles.CREATE_COLOR_TITLE}
              onClickHandler={colorClickHandler}
            />
            <SaveButton
              className={styles.saveButton}
              data-cy='save'
              type='submit'
              title={config.buttonTitles.SAVE_MATERIAL}
            />
          </div>
        </div>
      </form>
      <DialogWindowForComponent
        buttonType='submit'
        buttonTitle='Закрити вікно'
        dialogTitle='Створити колір'
        component={
          <CreateColor
            addNewColorImages={addNewColorImages}
            images={colorImagesToUpload}
            setImages={setColorImagesToUpload}
          />
        }
      />
    </div>
  );
}

export default MaterialForm;