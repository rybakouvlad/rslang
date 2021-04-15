import React, { useCallback, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { logout } from '../../store/actions/auth';

import { ReactComponent as UserSvg } from '../../assets/svg/user.svg';
import { ModalDonwloadImg } from './ModalDonwloadImg';
import { useTypeSelector } from '../../hooks/useTypesSelector';

export const LogOutIcon: React.FC = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [avatarImg, setAvatarImg] = useState(null);
  const { token, userID } = useTypeSelector((state) => state.auth);

  const getPathImg = useCallback(async () => {
    try {
      const response = await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.optional.imgUrl) {
        setAvatarImg(result.optional.imgUrl);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getPathImg();
  }, [modalShow]);

  return (
    <>
      <Popup
        trigger={
          <div className="auth-logo-wrapper">{avatarImg ? <img src={avatarImg} alt="avatar" /> : <UserSvg />}</div>
        }
        position="bottom center"
        nested
      >
        <div className="auth-popup">
          <ListGroup>
            <ListGroup.Item>
              <a onClick={() => setModalShow(true)}>Загрузить картинку</a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Выйти
              </a>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Popup>
      <ModalDonwloadImg show={modalShow} onHide={setModalShow} />
    </>
  );
};
