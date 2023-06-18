import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UsernameForm = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(usernameInput);
  };

  const handleInputChange = (event) => {
    setUsernameInput(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Choose a username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={usernameInput}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UsernameForm;
