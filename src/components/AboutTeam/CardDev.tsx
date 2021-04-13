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
    <Card style={{ width: '300px', marginBottom: '25px'}}>
      <Card.Img style={{ width: '300px', height: '300px' }} variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>
        <Card.Text>{discription}</Card.Text>
        <Card.Link href={linkToGitHub}>
          <img src="https://img.icons8.com/ios/452/github.png" alt="GitHub" style={{ width: '20px' }} />
        </Card.Link>
        {/*<Card.Link href="#">
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_VK-256.png"
            alt="Vk"
            style={{ width: '20px' }}
          />
        </Card.Link>
        <Card.Link href="#">
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-512.png"
            alt="Facebook"
            style={{ width: '20px' }}
          />
  </Card.Link>*/}
      </Card.Body>
    </Card>
  );
};
