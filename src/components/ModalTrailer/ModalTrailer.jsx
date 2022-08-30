import { useState, useEffect, useRef } from 'react';
import styles from './ModalTrailer.module.scss';
import classNames from 'classnames/bind';
import { useStore, actions } from '~/store/';
import Button from '~/components/Button';
import tmdbApi, { category } from '~/api/tmdbApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ModalTrailer({}) {
    const [videoSrc, setVideoSrc] = useState('');

    const [state, dispatch] = useStore();
    const isOpen = state.isOpen;

    function closeModal() {
        dispatch(actions.setOpenModal(false));
    }

    useEffect(() => {
        const handleGetVideo = async () => {
            const videos = await tmdbApi.getVideos(category.movie, state.idTrailer);
            if (videos.results.length > 0) {
                const videSrcResult = 'https://www.youtube.com/embed/' + videos.results[0].key;
                setVideoSrc(videSrcResult);
            } else {
                return 'No trailer';
            }
        };

        handleGetVideo();
    }, [videoSrc]);

    return (
        <div className={cx('modal')}>
            {/* <i className={cx('modal-close', 'bx bx-x')}></i> */}
            <Button outline classname={cx('modal-close')} onClick={closeModal}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </Button>
            <div className={cx('modal-content')}>
                <iframe width="100%" height="100%" src={videoSrc}></iframe>
            </div>
        </div>
    );
}

export default ModalTrailer;
