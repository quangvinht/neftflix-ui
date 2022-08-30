import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import tmdbApi, { category as cate } from '~/api/tmdbApi';
import apiConfig from '~/api';
import Button from '~/components/Button';
import CastList from '~/pages/Detail/CastList';
import VideoList from '~/pages/Detail/VideoList';
import MovieList from '~/components/MovieList';

const cx = classNames.bind(styles);

export default function Detail() {
    const [detail, setDetail] = useState(null);
    const { category, id } = useParams();

    useEffect(() => {
        const params = {};
        const geVideoDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setDetail(response);
        };

        geVideoDetail();
    }, [category, id]);

    return (
        detail && (
            <>
                <div
                    className={cx('detail')}
                    style={{
                        backgroundImage: `url(${apiConfig.originalImage(detail.backdrop_path || detail.poster_path)})`,
                    }}
                ></div>

                <div className={cx('content', ['mb-3'])}>
                    <div className={cx('poster')}>
                        <div
                            className={cx('poster-img')}
                            style={{
                                backgroundImage: `url(${apiConfig.originalImage(
                                    detail.backdrop_path || detail.poster_path,
                                )})`,
                            }}
                        ></div>
                    </div>
                    <div className={cx('infor')}>
                        <h1 className={cx('title')}>{detail.name || detail.title}</h1>
                        <div className={cx('genres')}>
                            {detail.genres &&
                                detail.genres.slice(0, 6).map((genre, i) => {
                                    return (
                                        <span key={i} className={cx('genre-item')}>
                                            {genre.name}
                                        </span>
                                    );
                                })}
                        </div>
                        <p className={cx('overview')}>{detail.overview}</p>
                        <div className={cx('cast')}>
                            <div className={cx('header-cast')}>
                                <h2>Cast</h2>
                                <div>
                                    <CastList id={id} category={category} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('video-trailer')}>
                    <div className={cx('', ['section', 'mb-3'])}>
                        <VideoList id={id} category={category} />
                    </div>
                </div>
                <div className={cx('similar', ['mb-2'])}>
                    <h2>Similar</h2>
                    <MovieList type="similar" genre={category} id={id} />
                </div>
            </>
        )
    );
}
