import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { filtration } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filterContact = e => {
    dispatch(filtration(e.currentTarget.value));
  };
  return (
    <label className={css.formLabel}>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={filterContact}
        className={css.formInput}
      ></input>
    </label>
  );
};
