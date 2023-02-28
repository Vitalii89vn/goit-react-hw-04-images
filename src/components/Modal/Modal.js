import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ isShowModal, children }) => {

  useEffect(()=>{
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        isShowModal()
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown) };
     },[isShowModal]
  )
 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      isShowModal();
    }
  };

    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>{children}
        </div>
      </div>,
      modalRoot
    )
  
}

Modal.propTypes = {
    isShowModal: PropTypes.func.isRequired,
  };