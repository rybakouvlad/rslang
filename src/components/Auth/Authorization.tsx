import React, { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { clearError, sendPostAuth } from '../../store/actions/auth';
import validator from 'validator';
import { ToastCopmponent } from 'Components/Toasts/ToastCopmponent';

export const Authorization: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const { token, error, loading } = useTypeSelector((state) => state.auth);
  const [toastdMessage, setToastMessage] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    event.preventDefault();
    if (!validator.isEmail(form.email)) {
      setToastMessage('Некоректная почта');
      changeShow(true);
      return;
    }
    if (validator.isStrongPassword(form.password)) {
      dispatch(sendPostAuth(form.email, form.password));
    } else {
      setToastMessage('Некоректный пароль');
      changeShow(true);
    }
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

  useEffect(() => {
    setToastMessage(error);
    changeShow(true);
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  }, [error]);

  const changeShow = (status: boolean) => {
    setShow(status);
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} onChange={changeHandler} />
        <Form.Text className="text-dark">Well never share your email with anyone else.</Form.Text>
      </Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Group controlId="formBasicPassword">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={
            <Tooltip id="tooltip-top">
              Папроль должен содеражать не менее 8 символов. Большая буква цифра и специальнй символ
            </Tooltip>
          }
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </OverlayTrigger>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginHandler}>
        Login
      </Button>
      {toastdMessage ? <ToastCopmponent message={toastdMessage} show={show} changeShow={changeShow} /> : null}
    </Form>
  );
};
