
import { useSelector } from 'react-redux';
import { getContactsFilter, getContactsList } from 'redux/selectors';
import { ContactsListItem } from '../ContactListItem/ContactListItem';
import { ContactsList } from './ContactList.module';
import { deleteContact } from 'redux/contactsSlice';

import { useDispatch } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(getContactsList);
  const filter = useSelector(getContactsFilter);
  const visibleContacts = contacts.filter(contact =>
    typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const dispatch = useDispatch(); // Отримуємо функцію dispatch

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId)); // Викликаємо дію deleteContact з Redux-стору
  };

  return (
    <ContactsList>
      {visibleContacts.map(({ name, number, id }) => (
        <ContactsListItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={handleDeleteContact}
        />
      ))}
    </ContactsList>
  );
};
