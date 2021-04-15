import React from 'react';
import rss from '../assets/svg/rss.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      Created by
      <a className="footer_link" href="https://github.com/rybakouvlad" rel="noreferrer" target="_blank">
        Vlad
      </a>
      ,
      <a className="footer_link" href="https://github.com/TanyaNovik" rel="noreferrer" target="_blank">
        Tanya
      </a>
      ,
      <a className="footer_link" href="https://github.com/DimaKukhta" rel="noreferrer" target="_blank">
        Dima
      </a>
      ,
      <a className="footer_link" href="https://github.com/artemosadchuck" rel="noreferrer" target="_blank">
        Artem
      </a>
      ,
      <a className="footer_link" href="https://github.com/natgeo89" rel="noreferrer" target="_blank">
        Viktar
      </a>
      for
      <a className="footer_link" href="https://rs.school/js/" rel="noreferrer" target="_blank">
        <img className="footer_image" src={rss} alt="Rolling Scope School" />
      </a>
      <span>2021</span>
    </footer>
  );
};
