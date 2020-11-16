import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <Button onClick={openCreateForm} positive content="Create Contact" />
        </Menu.Item>
        <Menu.Item header>Billenium HomeWork</Menu.Item>
      </Container>
    </Menu>
  );
};
