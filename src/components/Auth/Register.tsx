import React, { FC, useState } from 'react';
// import { useHttp } from '../hooks/http.hook';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import validator from 'validator';
import { ToastCopmponent } from '../Toasts/ToastCopmponent';

interface ISet {
  changeStatus(status: boolean, isNew: boolean): void;
}

export const Register: FC<ISet> = (props: ISet) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    login: '',
  });
  const [registeredMessage, setRegisterMessage] = useState(null);
  const [show, setShow] = useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();

    if (!validator.isEmail(form.email)) {
      setRegisterMessage('Некоректная почта');
      changeShow(true);
      return;
    }
    if (!validator.isStrongPassword(form.password)) {
      setRegisterMessage('Некоректный пароль');
      changeShow(true);
      return;
    }

    try {
      const data = await fetch('https://server-team19-rsschool.herokuapp.com/users', {
        method: 'POST',
        body: JSON.stringify({ name: form.login, email: form.email, password: form.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.status === 200) {
        props.changeStatus(true, true);
      } else {
        setRegisterMessage('Error');
        changeShow(true);
      }
    } catch (error) {
      setRegisterMessage('Error');
      changeShow(true);
    }
  };

  const changeShow = (status: boolean) => {
    setShow(status);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" placeholder="Enter login" name="login" value={form.login} onChange={changeHandler} />
      </Form.Group>
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
              Пароль должен содеражать не менее 8 символов. Большая буква цифра и специальнй символ
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
      <Button variant="primary" type="submit" onClick={registerHandler} /* disabled={loading} */>
        Register
      </Button>
      {registeredMessage ? <ToastCopmponent message={registeredMessage} show={show} changeShow={changeShow} /> : null}
    </Form>
  );
};
