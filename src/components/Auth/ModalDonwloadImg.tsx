import React, { useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { ToastCopmponent } from '../Toasts/ToastCopmponent';
import superagent, { ResponseError, Response } from 'superagent';
import { useTypeSelector } from '../../hooks/useTypesSelector';

interface IProps {
  show: boolean;
  onHide: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Event<T = EventTarget> {
  target: T;
}

interface authToke {
  Authorization: string;
}

export const ModalDonwloadImg: React.FC<IProps> = (props: IProps) => {
  const { token, userID } = useTypeSelector((state) => state.auth);
  const [imgFile, setImgFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [loadPerCent, setLoadPerCent] = useState(0);
  const [fileName, setFileName] = useState<string>('Нажми для выбора файла');

  const loadHandler = (event: Event<HTMLInputElement>) => {
    if (event.target.files[0].type === 'image/jpeg') {
      setImgFile({ imgFile, ...event });
      setFileName(event.target.files[0].name as string);
    } else {
      setToastMessage('Type does not fit. Need jpg.');
      setShowToast(true);
    }
  };

  const sendFile = (event: Event<HTMLInputElement>, header: authToke) => {
    superagent
      .post(`https://server-team19-rsschool.herokuapp.com/users/${userID}/images`)
      .attach('file', event.target.files[0])
      .on('progress', (event) => {
        if (!isLoad) {
          setIsLoad(true);
        }
        setLoadPerCent(event.percent);
      })
      .set(header)
      .set('accept', 'json')
      .end(function (err: ResponseError, res: Response) {
        setShowToast(true);
        if (res.status === 200) {
          setToastMessage('Загруженно успешно');
          setIsLoad(false);
          setImgFile(null);
        } else {
          setToastMessage('Произошла ошбика');
        }
      });
  };

  const submitFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    sendFile(imgFile, { Authorization: `Bearer ${token}` });

    setToastMessage('Введите имя.');
    setShowToast(true);

    event.preventDefault();
  };

  const changeShow = (status: boolean) => {
    setShowToast(status);
    setToastMessage(null);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="modal-wrapper">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Profile_upload_window</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input isValid type="file" onChange={loadHandler} />
            <Form.File.Label data-browse="Выберете файл">{fileName}</Form.File.Label>
          </Form.File>
        </Form>
      </Modal.Body>
      <Button className="btn-modal-donwload" onClick={submitFileHandler}>
        Загрузка
      </Button>
      {showToast ? <ToastCopmponent show={showToast} message={toastMessage} changeShow={changeShow} /> : null}
      <div>{isLoad ? <ProgressBar now={loadPerCent} label={`${Math.trunc(loadPerCent)}%`} /> : null}</div>
      <Modal.Footer>
        <Button onClick={() => props.onHide(false)}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};
