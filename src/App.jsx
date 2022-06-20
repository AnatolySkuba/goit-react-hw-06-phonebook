import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from 'redux/myValue/slice';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const value = useSelector(state => state.myValue);
  const filterNew = useSelector(state => state.contacts);
  console.log(filterNew);

  const formSubmitHandler = (name, number) => {
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts([
          ...contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ]);
  };

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const contactsFiltered = [];
  contacts.forEach(contact => {
    contact.name.toLowerCase().includes(filter.toLowerCase()) &&
      contactsFiltered.push(contact);
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm formSubmitHandler={formSubmitHandler} />

      <button onClick={() => dispatch(increment(100))}>increment</button>
      <button onClick={() => dispatch(decrement(100))}>decrement</button>
      <div>{value}</div>

      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      {contactsFiltered.length !== 0 && (
        <ContactList contacts={contactsFiltered} handleDelete={handleDelete} />
      )}
    </div>
  );
}
