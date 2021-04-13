import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const AboutTeam: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col xs>First, but unordered</Col>
        <Col xs={{ order: 1 }}>Third, but second</Col>
      </Row>
    </Container>
  );
};
