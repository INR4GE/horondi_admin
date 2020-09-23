import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearFilesToUpload,
  getProduct,
  getProductOptions,
  getProductSpecies, setPrimaryImageToUpload,
  setProduct
} from '../../../redux/products/products.actions';

import ProductEditForm from './product-edit-form';
import LoadingBar from '../../../components/loading-bar';

import { productModel } from '../../../redux/products/products.reducer';

const ProductEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector(({ Products }) => ({
    product: Products.selectedProduct,
    loading: Products.loading
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductSpecies());
    dispatch(getProductOptions());
    dispatch(getProduct(id));

    return () => {
      dispatch(setProduct(productModel));
      dispatch(clearFilesToUpload())
      dispatch(setPrimaryImageToUpload([]))
    };
  }, [id, dispatch]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>{product.name[0].value ? <ProductEditForm /> : <LoadingBar />}</div>
  );
};

ProductEdit.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductEdit;
