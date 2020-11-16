//import React from "react";
import React, { useState, useEffect, SyntheticEvent } from "react";
import "../../App.css";
import { Container } from "semantic-ui-react";
import { IContact } from "../models/contact";
import { Navbar } from "../../features/nav/Navbar";
import { ContactDashboard } from "../../features/contacts/dashboard/ContactDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectedContact = (id: string) => {
    setSelectedContact(contacts.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateform = () => {
    setSelectedContact(null);
    setEditMode(true);
  };

  const handleCreateContact = (contact: IContact) => {
    setSubmitting(true);
    agent.Contacts.create(contact)
      .then(() => {
        setContacts([...contacts, contact]);
        setSelectedContact(contact);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditContact = (contact: IContact) => {
    setSubmitting(true);
    agent.Contacts.update(contact)
      .then(() => {
        setContacts([...contacts.filter((a) => a.id !== contact.id), contact]);
        setSelectedContact(contact);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteContact = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Contacts.delete(id)
      .then(() => {
        setContacts([...contacts.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Contacts.list()
      .then((response) => {
        setContacts(response);
        console.log(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading..." />;

  return (
    <>
      <Navbar openCreateForm={handleOpenCreateform} />
      <Container style={{ marginTop: "7em" }}>
        <ContactDashboard
          contacts={contacts}
          selectContact={handleSelectedContact}
          selectedContact={selectedContact!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedContact={setSelectedContact}
          createContact={handleCreateContact}
          editContact={handleEditContact}
          deleteContact={handleDeleteContact}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default App;
