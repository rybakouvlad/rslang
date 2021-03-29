import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { logout } from '../../store/actions/auth';

import { ReactComponent as UserSvg } from '../../assets/svg/user.svg';

export const LogOutIcon: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Popup
        trigger={
          <div className="auth-logo-wrapper">
            <UserSvg />
          </div>
        }
        position="bottom center"
        nested
      >
        <div className="auth-popup">
          <ListGroup>
            <ListGroup.Item>
              <a>Загрузить картинку</a>
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
    </>
  );
};
