import React, { useEffect, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { sendPostAuth } from '../../store/actions/auth';

export const Authorization: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const { token } = useTypeSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
    event.preventDefault();
    dispatch(sendPostAuth(form.email, form.password));
  };

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

  if (token) {
    return <h1>Ураа</h1>;
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
          overlay={<Tooltip id="tooltip-top">Enter more than 6 symbols.</Tooltip>}
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
    </Form>
  );
};
