import React, { useState } from 'react';
import { Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';
import './ToastMessage.css';

function ToastMessage({ bg, body, title }) {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position='bottom-right' className='toast-container'>
      <Toast
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <ToastHeader>
          <strong className='me-auto'>{title}</strong>
          <small>maintenant</small>
        </ToastHeader>
        <ToastBody>{body}</ToastBody>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
