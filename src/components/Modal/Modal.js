import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({showModal, children}) => {
 
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown)
  // };
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // };  
  const handleKeyDown = e => {
    if (e.code === "Escape") {
      showModal()}
  };
  useEffect(() => { window.addEventListener('keydown', handleKeyDown) }, [handleKeyDown]);
  useEffect(() => { window.removeEventListener('keydown', handleKeyDown)}, [handleKeyDown])


  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      showModal();
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
    showModal: PropTypes.func.isRequired,
  };