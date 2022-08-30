import { useEffect, useState } from 'react';
import styles from './MovieCard.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { category } from '~/api/tmdbApi';
import apiConfig from '~/api';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function MovieCard({ item, genre }) {
    const link = '/' + category[genre] + '/' + item.id;

    const backGround = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div style={{ backgroundImage: `url(${backGround})` }} className={cx('movie-card')}>
                <Button classname={cx('movie-card-btn')}>
                    <FontAwesomeIcon icon={faPlay} className={cx('movie-card-icon')} />
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

MovieCard.propTypes = {
    item: PropTypes.object.isRequired,
    genre: PropTypes.string.isRequired,
};

export default MovieCard;
