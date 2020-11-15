import React, { useState, FormEvent } from "react";
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

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placholder="Title"
          value={contact.firstName}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placholder="Desc"
          value={contact.surname}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placholder="Category"
          value={contact.phoneNumbers}
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
