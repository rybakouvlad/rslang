import React from 'react';
import { CardDev } from './CardDev';
import { data } from './dataTeam';

export const AboutTeam: React.FC = () => {
  const dataMap = data.map((element) => {
    return (
      <CardDev
        key={element.id}
        avatar={element.avatar}
        name={element.name}
        position={element.position}
        discription={element.discription}
        linkToGitHub={element.linkToGitHub}
      />
    );
  });

  return (<>
    <h1 className="sprint-game-header">Наша команда</h1>
    <div className="about-team-container">{dataMap}</div>
    </>);
};
