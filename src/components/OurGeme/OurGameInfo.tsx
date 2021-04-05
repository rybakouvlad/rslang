import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const OurGameInfo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="our_game_info__btn" variant="outline-info" onClick={handleShow}>
        Info
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <em>Игра Перетаскивание</em>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Данная игра является реализацией Drag and Drop game, перетаскивайте русские слова на английские и получайте
          баллы. <hr />
          1. За правильный ответ 10 баллов. <hr />
          2. За КАЖДЫЙ НЕправильный ответ -10 баллов. Следовательно можно уйти в минус ;) <hr />
          3. Неправильные ответы выделяют слова другим цветом, но это не значит что их не придётся угадывать ;) <hr />
          4. И на последок: для улучшения навыка скоростного чтения, английские переводы будут перемешиваться после
          каждого угаданного слова(Вам придётся бегло пробегать по английским словам много раз за игру). <hr />
          5. Удачи в изучении!
        </Modal.Body>
      </Modal>
    </>
  );
};
