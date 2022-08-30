import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Slide from '~/components/Slide';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import MovieList from '~/components/MovieList';
import { category, movieType, tvType } from '~/api/tmdbApi';

const cx = classNames.bind(styles);

export default function Home({}) {
    return (
        <div className={cx('home')}>
            <Slide />
            <div className={cx('home-container')}>
                <div className={cx('section', ['mb-3'])}>
                    <div className={cx('section-header')}>
                        <h2>Trending Moives</h2>
                        <Link to={'/movie'}>
                            <Button outline small>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('section-body')}>
                        <MovieList type={movieType.popular} genre={category.movie} />
                    </div>
                </div>

                <div className={cx('section', ['mb-3'])}>
                    <div className={cx('section-header')}>
                        <h2>Top rated Movies</h2>
                        <Link to={'/movie'}>
                            <Button outline small>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('section-body')}>
                        <MovieList type={movieType.top_rated} genre={category.movie} />
                    </div>
                </div>

                <div className={cx('section', ['mb-3'])}>
                    <div className={cx('section-header')}>
                        <h2>Trending TV</h2>
                        <Link to={'/tv'}>
                            <Button outline small>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('section-body')}>
                        <MovieList type={tvType.popular} genre={category.tv} />
                    </div>
                </div>

                <div className={cx('section', ['mb-3'])}>
                    <div className={cx('section-header')}>
                        <h2>Top rated TV</h2>
                        <Link to={'/tv'}>
                            <Button outline small>
                                View more
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('section-body')}>
                        <MovieList type={tvType.top_rated} genre={category.tv} />
                    </div>
                </div>
            </div>
        </div>
    );
}
