import React from 'react';
import context from 'react-bootstrap/esm/AccordionContext';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/PageHeader';
import MovieGrid from '~/components/MovieGrid';

import { category as cate } from '~/api/tmdbApi';

import styles from './Catalog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Catalog() {
    const { category } = useParams();
    return (
        <div className={cx('catalog')}>
            <PageHeader>{category === cate.movie ? 'Movies ' : 'TV Series'}</PageHeader>
            <div className={cx('catalog-movie-grid', ['section', 'mb-3'])}>
                <MovieGrid genre={category} />
            </div>
        </div>
    );
}
