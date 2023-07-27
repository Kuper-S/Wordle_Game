import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ show, setShowModal, onConfirm, onCancel }) {
  const handleClose = () => setShowModal(false);

  return (
    <>
      

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>END GAME?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You SURE?</Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={onCancel}>
            Close
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            End Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
