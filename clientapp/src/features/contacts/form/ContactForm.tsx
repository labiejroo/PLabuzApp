import React, { useState, FormEvent, useEffect } from "react";
import { Segment, FormInput, Form, Button } from "semantic-ui-react";
import { IContact } from "../../../app/models/contact";
import { identifier } from "@babel/types";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editmode: boolean) => void;
  contact: IContact;
  createContact: (contact: IContact) => void;
  editContact: (contact: IContact) => void;
  submitting: boolean;
}

export const ContactForm: React.FC<IProps> = ({
  setEditMode,
  contact: initialFormState,
  createContact,
  editContact,
  submitting
}) => {
  const InitialiseForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        firstName: "",
        surname: "",
        phoneNumbers: ""
      };
    }
  };
  const [contact, setContact] = useState<IContact>(InitialiseForm);
  const [phoneNumbersList, setPhoneNumbersList] = useState<string[]>([]);

  useEffect(() => {
    const phoneNums: string[] = contact.phoneNumbers.split(",");
    setPhoneNumbersList(phoneNums);
  }, []);

  const handleSubmmit = () => {
    if (contact.id.length === 0) {
      let newContact = {
        ...contact,
        id: uuid()
      };

      createContact(newContact);
    } else {
      editContact(contact);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    //console.log(event.target.value);
    console.log(event.currentTarget);

    const { name, value } = event.currentTarget;
    setContact({ ...contact, [name]: value });
  };

  const handleInputChangeForPhoneNumbers = (
    event: FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    //console.log(event.target.value);
    console.log(event.currentTarget);

    const { name, value } = event.currentTarget;

    let items = [...phoneNumbersList];
    let index = parseInt(name);
    items[index] = value;

    setPhoneNumbersList(items);
    let mergedValues = "";
    for (var i = 0; i < items.length; i++) {
      mergedValues += items[i];
      if (i !== items.length - 1) mergedValues += ",";
    }

    setContact({ ...contact, phoneNumbers: mergedValues });
  };

  const addNewPhoneNumber = () => {
    let newElement = "new Number";
    setPhoneNumbersList([...phoneNumbersList, newElement]);
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmmit}>
        <Form.Input
          onChange={handleInputChange}
          name="firstName"
          placholder="First Name"
          value={contact.firstName}
        />

        <Form.Input
          onChange={handleInputChange}
          name="surname"
          placholder="Surname"
          value={contact.surname}
        />

        {phoneNumbersList.map((item, index) => {
          return (
            <Form.TextArea
              onChange={handleInputChangeForPhoneNumbers}
              key={index}
              name={`${index}`}
              placholder="Phone Number"
              value={item}
            />
          );
        })}

        <Button
          onClick={() => addNewPhoneNumber()}
          floated="left"
          negative
          type="button"
          content="+"
        />

        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
