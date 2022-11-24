import { ModalBox, Overlay } from 'components/Styles/Element.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageUrl, tags, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = element => {
    if (element.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };
  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalBox>
        <img src={largeImageUrl} alt={tags} />
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};