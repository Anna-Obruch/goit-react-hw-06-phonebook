import { useDispatch, useSelector } from 'react-redux';
import { getContactsList } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import React, { useState } from 'react';
import { Form, Input, Label, Button } from './ContactForm.module';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsList);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const formName = name.trim();
    const formNumber = number.trim();

    if (contacts.some(({ name }) => name === formName)) {
      return alert(`${formName} is already in contacts`);
    }

    dispatch(addContact(formName, formNumber));
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Label>
      <Button>
        Add contact
      </Button>
    </Form>
  );
};