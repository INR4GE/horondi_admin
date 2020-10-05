import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../redux/users/users.actions';
import { config } from '../../configs';

const { userRoles } = config;
const [user, ...other] = userRoles.map((item) => item.role);

const useUsersFiltering = (tabNumber) => {
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();

  const handleTabChange = (tab) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      roles: tab ? [...other] : [user]
    }));
  };

  useEffect(() => {
    handleTabChange(tabNumber);
  }, [tabNumber, dispatch]);

  useEffect(() => {
    dispatch(getUsers({ filter }));
  }, [filter, dispatch]);
};

export default useUsersFiltering;
