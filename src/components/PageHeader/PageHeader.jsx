import { useEffect, useState } from 'react';
import styles from './PageHeader.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import bg from '~/assets/images/footer-bg.jpg';

const cx = classNames.bind(styles);

function MovieList({ children }) {
    return (
        <div className={cx('page-header')} style={{ backgroundImage: `url(${bg})` }}>
            <h2>{children}</h2>
        </div>
    );
}

MovieList.propTypes = {};

export default MovieList;
