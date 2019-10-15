import React, { useGlobal } from "reactn";
import { Jumbotron } from "react-bootstrap";

const Jumbotron = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Fluid jumbotron</h1>
        <p>
          This is a modified jumbotron that occupies the entire horizontal space
          of its parent.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Jumbotron;
