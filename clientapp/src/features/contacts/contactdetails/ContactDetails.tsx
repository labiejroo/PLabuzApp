import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { IContact } from "../../../app/models/contact";

interface IProps {
  contact: IContact;
  setEditMode: (editMode: boolean) => void;
  setSelectedContact: (contact: IContact | null) => void;
}
export const ContactDetails: React.FC<IProps> = ({
  contact,
  setEditMode,
  setSelectedContact
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{contact.firstName}</Card.Header>
        <Card.Meta>
          <span className="date">{contact.surname}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            onClick={() => setSelectedContact(null)}
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
