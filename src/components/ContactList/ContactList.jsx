import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/contacts/selectors';
import ContactItem from 'components/ContactItem/ContactItem';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const contactsFiltered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (contactsFiltered) {
    return (
      <ul>
        {contactsFiltered.map(({ id, name, number }) => (
          <li className={s.li} key={id}>
            <ContactItem id={id} name={name} number={number} />
          </li>
        ))}
      </ul>
    );
  }
}
