import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { showColorDialogWindow } from '../../redux/material/material.actions';
import { useStyles } from './dialog-window-for-component.style';

const DialogWindowForComponent = ({ dialogTitle, buttonTitle, component }) => {
  const { isOpen } = useSelector(({ Material }) => ({
    isOpen: Material.showColorDialogWindow
  }));
  const dispatch = useDispatch();
  const styles = useStyles();
  const handleClose = () => {
    dispatch(showColorDialogWindow(false));
  };

  return (
    <Dialog
      style={{ alignContent: 'start' }}
      id='dialog-window'
      onClose={handleClose}
      open={isOpen}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle className={styles.dialogTitle} onClose={handleClose}>
          {dialogTitle}
        </DialogTitle>
        <span
          title={buttonTitle}
          className={styles.closeButton}
          onClick={handleClose}
        >
          &#215;
        </span>
      </div>
      <DialogContent className={styles.dialogComponent} dividers>
        {component}
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }} />
    </Dialog>
  );
};
DialogWindowForComponent.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  component: PropTypes.shape({}).isRequired
};

export default DialogWindowForComponent;
