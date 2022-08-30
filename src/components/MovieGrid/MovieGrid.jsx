import { useEffect, useState, useCallback } from 'react';
import styles from './MovieGrid.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import MovieCard from '~/components/MovieCard';
import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';

import tmdbApi, { movieType, tvType, category } from '~/api/tmdbApi';
import { useParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MovieGrid({ genre }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    //useParams dùng để check tuyến đường hiện tại :

    const { keyword } = useParams();
    useEffect(() => {
        //get list hiện tại trang 1:
        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                const params = { page: 1 };
                switch (genre) {
                    case genre === 'movie':
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;

                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = { query: keyword };
                response = await tmdbApi.search(genre, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [genre, keyword]);

    const loadMore = async () => {
        let response = null;

        if (keyword === undefined) {
            const params = { page: page + 1 };
            switch (genre) {
                case genre === 'movie':
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;

                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = { query: keyword, page: page + 1 };
            response = await tmdbApi.search(genre, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    };

    //SearchInput:
    const [keywordInput, setKeywordInput] = useState(keyword ? keyword : '');

    const history = useNavigate();

    const handleSearch = useCallback(() => {
        if (keywordInput.trim().length > 0) {
            history(`/${category[genre]}/search/${keywordInput}`);
        }
    }, [keywordInput, genre, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                handleSearch();
            }
        };

        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keywordInput, handleSearch]);

    return (
        <div className={cx('movie-grid')}>
            <div className={cx('movie-grid-search', ['section', 'mb-3'])}>
                <SearchInput
                    type="text"
                    placeholder="Enter keyword"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                />
                <Button small onClick={handleSearch}>
                    Search
                </Button>
            </div>

            <div className={cx('movie-grid-items')}>
                {items.map((item, i) => {
                    return <MovieCard genre={genre} key={i} item={item} />;
                })}
            </div>
            {page < totalPage && (
                <div className={cx('loadmore')}>
                    <Button small outline onClick={loadMore}>
                        load More
                    </Button>
                </div>
            )}
        </div>
    );
}

MovieGrid.propTypes = {
    category: PropTypes.string,
};

export default MovieGrid;
