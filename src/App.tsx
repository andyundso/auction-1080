import React from 'react';
import './App.css';
import {Col, Container, Row} from "reactstrap";

const App: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>OUHNDY'S 1080 AUKTION</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
