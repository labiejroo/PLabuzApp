import React, { SyntheticEvent } from "react";
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { IContact } from "../../../app/models/contact";

interface IProps {
  contacts: IContact[];
  selectContact: (id: string) => void;
  selectedContact: IContact;
  deleteContact: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ContactList: React.FC<IProps> = ({
  contacts,
  selectContact,
  selectedContact,
  deleteContact,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {contacts.map((contact, index: number) => {
          return (
            <Item key={contact.id}>
              <Item.Content>
                <Item.Header as="a">{contact.firstName}</Item.Header>
                <Item.Meta>{contact.surname}</Item.Meta>

                <Item.Extra>
                  <Button
                    onClick={() => selectContact(contact.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    loading={target === contact.id && submitting}
                    name={contact.id}
                    onClick={(e) => deleteContact(e, contact.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={contact.phoneNumbers} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};
