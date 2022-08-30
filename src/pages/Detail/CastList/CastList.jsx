import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi, { category as cate } from '~/api/tmdbApi';
import apiConfig from '~/api';
import styles from '../Detail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CastList({ id, category }) {
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category, id);
            const castInfor = response.cast.slice(0, 5);

            setCasts(castInfor);
        };
        getCredits();
    }, [category, id]);

    return (
        <div className={cx('casts')}>
            {casts.map((cast, i) => {
                return (
                    <div className={cx('cast-item')} key={i}>
                        <div
                            className={cx('cast-img')}
                            style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
                        ></div>
                        <div className={cx('cast-name')}>{cast.name}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default CastList;
