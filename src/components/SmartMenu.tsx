import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BookSvg } from '../assets/svg/book.svg';
import { ReactComponent as HomeSvg } from '../assets/svg/home.svg';
import { ReactComponent as GameSvg } from '../assets/svg/games.svg';
import { ReactComponent as SprintSvg } from '../assets/svg/sprint.svg';
import { ReactComponent as SeatingSvg } from '../assets/svg/seating.svg';
import { ReactComponent as AudioCallSvg } from '../assets/svg/audiocall.svg';
import { ReactComponent as SavannahSvg } from '../assets/svg/savannah.svg';
import { ReactComponent as PencilSvg } from '../assets/svg/Pencil.svg';
import { useTypeSelector } from '../hooks/useTypesSelector';

export const SmartMenu: React.FC = () => {
  const { page, group } = useTypeSelector((state) => state.book);
  const { token } = useTypeSelector((state) => state.auth);

  return (
    <>
      <div className="smart-menu">
        <div className="smart-menu-body">
          <Link to="/">
            <div className="svg-wrapper" style={{ backgroundColor: '#5AAEFA' }}>
              <HomeSvg />
            </div>
          </Link>
          <Link to={`/book?page=${page}&group=${group}`}>
            <div className="svg-wrapper" style={{ backgroundColor: '#E07BD0' }}>
              <BookSvg />
            </div>
          </Link>
          {token &&
          <Link to="/dictionary">
            <div className="svg-wrapper" style={{ backgroundColor: '#FDF386' }}>
              <PencilSvg />
            </div>
          </Link>
          }
          <Link to="/sprint">
            <div className="svg-wrapper" style={{ backgroundColor: '#92BBE0' }}>
              <SprintSvg />
            </div>
          </Link>
          <Link to="/audiocall">
            <div className="svg-wrapper" style={{ backgroundColor: '#BFA57B' }}>
              <AudioCallSvg />
            </div>
          </Link>
          <Link to="/savana">
            <div className="svg-wrapper" style={{ backgroundColor: '#BFA57B' }}>
              <SavannahSvg />
            </div>
          </Link>
          <Link to="/our-game">
            <div className="svg-wrapper" style={{ backgroundColor: '#9CE087' }}>
              <GameSvg />
            </div>
          </Link>
        </div>
        <div className="smart-menu-footer">
          <Link to="/settings">
            <div className="svg-wrapper" style={{ backgroundColor: '#9B88A3' }}>
              <SeatingSvg />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
