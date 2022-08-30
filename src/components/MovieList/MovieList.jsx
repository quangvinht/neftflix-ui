import { useEffect, useState } from 'react';
import styles from './MovieList.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import tmdbApi, { category, movieType, tvType } from '~/api/tmdbApi';
import apiConfig from '~/api';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

import MovieCard from '~/components/MovieCard';

import { Swiper, SwiperSlide } from 'swiper/react';

const cx = classNames.bind(styles);

function MovieList({ type, genre, id }) {
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (!id) {
                switch (genre) {
                    case (genre = category.movie):
                        response = await tmdbApi.getMoviesList(movieType[type], { params });
                        break;

                    default:
                        response = await tmdbApi.getTvList(tvType[type], { params });
                        break;
                }
            } else {
                response = await tmdbApi.similar(genre, id);
            }

            setListItems(response.results);
        };

        getList();
    }, []);

    return (
        <div className={cx('movie-list')}>
            <Swiper spaceBetween={10} slidesPerView={'auto'} grabCursor={true}>
                {listItems.map((item, i) => {
                    return (
                        <SwiperSlide key={i} className={cx('slide')}>
                            <MovieCard item={item} genre={genre} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    genre: PropTypes.string,
    id: PropTypes.number,
    type: PropTypes.string,
};

export default MovieList;
