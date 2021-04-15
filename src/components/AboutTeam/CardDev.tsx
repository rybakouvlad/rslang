import React from 'react';
import { Card } from 'react-bootstrap';

interface CardDevProps {
  avatar: string;
  name: string;
  position: string;
  discription: string;
  linkToGitHub: string;
}

export const CardDev: React.FC<CardDevProps> = (props: CardDevProps) => {
  const { avatar, name, position, discription, linkToGitHub } = props;
  return (
    <Card className="card-container">
      <Card.Img className="card-img" variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>
        <Card.Text className="card-text">{discription}</Card.Text>
        <Card.Link className="card-link" href={linkToGitHub} target="_blank">
          <img src="https://img.icons8.com/ios/452/github.png" alt="GitHub" style={{ width: '25px' }} />
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
