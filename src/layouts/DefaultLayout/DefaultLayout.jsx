import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Footer from '~/layouts/components/Footer';
import { useStore, actions } from '~/store/';
import ModalTrailer from '~/components/ModalTrailer';

import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
        border: 'none',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [state, dispatch] = useStore();
    const isOpen = state.isOpen;

    function openModal() {
        dispatch(actions.setOpenModal(true));
    }
    function closeModal() {
        dispatch(actions.setOpenModal(false));
    }
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />

                <div className={cx('content')}>{children}</div>

                <Footer />
            </div>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <ModalTrailer />
            </Modal>
        </>
    );
}

DefaultLayout.prototypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
