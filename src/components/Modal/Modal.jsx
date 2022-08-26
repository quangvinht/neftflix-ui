import { useState, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';

const cx = classNames.bind(styles);

function Modal({ activeSign, id, children }) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(activeSign);
    }, [activeSign]);

    return (
        <div id={id} className={cx(`${active ? 'active' : ''}`, 'modal')}>
            {children}
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
};
export default Modal;

export const ModalContent = ({ onClose, children }) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');

        if (onClose) {
            onClose();
        }
    };

    return (
        <div ref={contentRef} className={cx('modal-content')}>
            {children}
            <div className={cx('modal-close')} onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    );
};

ModalContent.prototypes = {
    onClose: PropTypes.func,
};
