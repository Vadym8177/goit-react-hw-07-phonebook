import { ContactItem } from 'components/ContactItem/ContactItem';
import { selectContacts, selectFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filtredContacts = getFiltredContacts();

  return (
    <ul>
      {filtredContacts.map(({ name, id, phone }) => (
        <ContactItem name={name} key={id} id={id} number={phone} />
      ))}
    </ul>
  );
};
