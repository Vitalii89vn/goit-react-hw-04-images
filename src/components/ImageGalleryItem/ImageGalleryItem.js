import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
import { Modal } from "components/Modal/Modal";
import { useState } from 'react';

export const ImageGalleryItem = ({ image, alt, imageLarge }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <li className={css.ImageGalleryItem} >
            {!showModal ?
                <img src={image} alt={alt} onClick={() => setShowModal(!showModal)} className={css.ImageGalleryItem_image} />
                :
                <Modal isShowModal={() => setShowModal(!showModal)}> <img src={imageLarge} alt={alt} /> </Modal>}
        </li>
    )
};

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    imageLarge: PropTypes.string.isRequired,
};
