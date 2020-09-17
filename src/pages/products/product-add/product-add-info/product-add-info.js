import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  TextField,
  FormControlLabel,
  Checkbox,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Grid
} from '@material-ui/core';
import { useStyles } from './product-add-info.styles';

import TabPanel from '../../../../components/tab-panel';
import { config } from '../../../../configs';
import { setProductToSend } from '../../../../redux/products/products.actions';
import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';
import {productsTranslations} from "../../../../translations/product.translations";

const { productInfoLabels, languages } = config;
const {
    REQUIRED_FIELD,
    NAME_TOO_LONG_MESSAGE,
    NAME_TOO_SHORT_MESSAGE,
    MAIN_MATERIAL_TOO_LONG_MESSAGE,
    MAIN_MATERIAL_TOO_SHORT_MESSAGE,
    INNER_MATERIAL_TOO_LONG_MESSAGE,
    INNER_MATERIAL_TOO_SHORT_MESSAGE,
    CLOSURE_TOO_LONG_MESSAGE,
    CLOSURE_TOO_SHORT_MESSAGE,
    DESCRIPTION_TOO_SHORT_MESSAGE
} = productsTranslations

const ProductAddInfo = ({
  activeStep,
  handleNext,
  preferedLanguages,
  setPreferedLanguages,
  createProductInfo,
  checkedLanguages
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    name,
    mainMaterial,
    innerMaterial,
    closure,
    description
  } = useSelector(({ Products }) => Products.productToSend);

  const [tabValue, setTabValue] = useState(0);
  const [shouldValidate, setShouldValidate] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferedLanguages({
      ...preferedLanguages,
      [name]: { name, checked }
    });
  };

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const onSubmit = (values) => {
    const productInfo = createProductInfo(values);
    dispatch(setProductToSend(productInfo));
    handleNext();
  };

  const formikValues = Object.assign(
    ...languages.map((lang, idx) => ({
      [`${lang}${productInfoLabels[0].name}`]: name[idx].value,
      [`${lang}${productInfoLabels[1].name}`]: mainMaterial[idx].value,
      [`${lang}${productInfoLabels[2].name}`]: innerMaterial[idx].value,
      [`${lang}${productInfoLabels[3].name}`]: closure[idx].value,
      [`${lang}${productInfoLabels[4].name}`]: description[idx].value
    }))
  );

  const yupSchema = useMemo(
    () =>
      Yup.object().shape(
        checkedLanguages.length
          ? Object.assign(
            ...checkedLanguages.map(({ name }) => ({
              [`${name}${productInfoLabels[0].name}`]: Yup.string()
                .min(6, NAME_TOO_SHORT_MESSAGE)
                .max(50, NAME_TOO_LONG_MESSAGE)
                .required(REQUIRED_FIELD),
              [`${name}${productInfoLabels[1].name}`]: Yup.string()
                .min(2, MAIN_MATERIAL_TOO_SHORT_MESSAGE)
                .max(50, MAIN_MATERIAL_TOO_LONG_MESSAGE)
                .required(REQUIRED_FIELD),
              [`${name}${productInfoLabels[2].name}`]: Yup.string()
                .min(2, INNER_MATERIAL_TOO_SHORT_MESSAGE)
                .max(50, INNER_MATERIAL_TOO_LONG_MESSAGE)
                .required(REQUIRED_FIELD),
              [`${name}${productInfoLabels[3].name}`]: Yup.string()
                .min(2, CLOSURE_TOO_SHORT_MESSAGE)
                .max(50, CLOSURE_TOO_LONG_MESSAGE)
                .required(REQUIRED_FIELD),
              [`${name}${productInfoLabels[4].name}`]: Yup.string()
                .min(10, DESCRIPTION_TOO_SHORT_MESSAGE)
                .required(REQUIRED_FIELD)
            }))
          )
          : {}
      ),
    [checkedLanguages]
  );

  const langCheckboxes = Object.values(
    preferedLanguages
  ).map(({ name, checked }, idx) => (
    <FormControlLabel
      key={idx}
      control={
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          name={name}
          color='primary'
        />
      }
      label={name}
    />
  ));

  const languageTabs = checkedLanguages.map(({ name }, idx) => (
    <Tab label={name} key={idx} />
  ));

  return (
    <div>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Typography>Оберіть мови:</Typography>
        </Grid>
        <Grid item>{langCheckboxes}</Grid>
      </Grid>
      {languageTabs.length ? (
        <AppBar position='static'>
          <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
            {languageTabs}
          </Tabs>
        </AppBar>
      ) : null}
      <Formik
        initialValues={formikValues}
        validationSchema={yupSchema}
        onSubmit={onSubmit}
        validateOnBlur={shouldValidate}
        validateOnChange={shouldValidate}
      >
        <Form>
          {checkedLanguages.map((lang, idx) => (
            <TabPanel index={idx} value={tabValue} key={idx}>
              {productInfoLabels.map(({ label, name }) => (
                <Field name={`${lang.name}${name}`} key={name}>
                  {({ field, meta }) => (
                    <TextField
                      className={styles.textfield}
                      id={name}
                      label={`${label}*`}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                      variant='outlined'
                      {...field}
                    />
                  )}
                </Field>
              ))}
            </TabPanel>
          ))}
          {checkedLanguages.length ? (
            <StepperButtons
              type='submit'
              activeStep={activeStep}
              handleNext={() => setShouldValidate(true)}
            />
          ) : null}
        </Form>
      </Formik>
    </div>
  );
};

ProductAddInfo.propTypes = {
  preferedLanguages: PropTypes.objectOf(PropTypes.object).isRequired,
  setPreferedLanguages: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  createProductInfo: PropTypes.func.isRequired
};

export default ProductAddInfo;
