import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validate = formValidate();
    if (!validate) return;

    dispatch(addContact({ id: nanoid(), name, phone }));
    setName('');
    setNumber('');
  };
  const formValidate = () => {
    const sameName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (sameName) {
      alert(`${name} is already in contacts`);
      return;
    }
    return !sameName;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formBox}>
        <label htmlFor={nanoid()} className={css.formLabel}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nanoid()}
            value={name}
            onChange={handleChange}
            className={css.formInput}
          />
        </label>
        <label htmlFor={nanoid()} className={css.formLabel}>
          Number
          <input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={nanoid()}
            value={phone}
            onChange={handleChange}
            className={css.formInput}
          />
        </label>
        <button type="submit" className={css.formBtn}>
          Add contact
        </button>
      </div>
    </form>
  );
};
