import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Typography } from '@material-ui/core/';
import { Pagination } from '@material-ui/lab';

import { useStyles } from './comments.style';
import { config } from '../../configs';

import {
  getRecentComments,
  setCommentsCurrentPage,
  deleteComment
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';

const tableHeaders = config.tableHeadRowTitles.comments;
const { REMOVE_COMMENT_TITLE } = config.buttonTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;

const CommentsPage = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    loading,
    list,
    pagesCount,
    currentPage,
    commentsPerPage
  } = useSelector(({ Comments }) => ({
    list: Comments.list,
    loading: Comments.commentsLoading,
    pagesCount: Comments.pagination.pagesCount,
    currentPage: Comments.pagination.currentPage,
    commentsPerPage: Comments.pagination.commentsPerPage
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRecentComments({
        limit: commentsPerPage,
        skip: currentPage * commentsPerPage,
        commentsPerPage
      })
    );
  }, [dispatch, commentsPerPage, currentPage]);

  const commentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(id));
    };
    openSuccessSnackbar(
      removeComment,
      REMOVE_COMMENT_TITLE,
      REMOVE_COMMENT_MESSAGE,
      REMOVE_COMMENT_TITLE
    );
  };

  const changePageHandler = (e, value) =>
    dispatch(setCommentsCurrentPage(value));

  if (loading) {
    return <LoadingBar />;
  }

  const commentsItems =
    list && list.length >= 1
      ? list.map((commentItem) => {
        const createdAt = new Date(
          parseInt(commentItem.date, 10)
        ).toLocaleString();

        return (
          <TableContainerRow
            key={commentItem._id}
            id={commentItem._id}
            date={createdAt}
            text={commentItem.text}
            showAvatar={false}
            showEdit={false}
            deleteHandler={() => commentDeleteHandler(commentItem._id)}
          />
        );
      })
      : null;

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Typography variant='h1' className={classes.usersTitle}>
          Останні коментарі
        </Typography>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='commentsTable'
          tableTitles={commentsItems ? tableHeaders : [NO_COMMENTS_MESSAGE]}
          tableItems={commentsItems}
        />
      </div>
      <div className={classes.paginationDiv}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
};

export default CommentsPage;
