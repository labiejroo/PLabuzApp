import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { right } from "@popperjs/core";

interface IProps {
  openCreateForm: () => void;
}

export const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          My APP
        </Menu.Item>
        <Menu.Item name="Contacts" />
        <Menu.Item>
          <Icon name="home" size="big" />
          <Button onClick={openCreateForm} positive content="Create Contact" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
