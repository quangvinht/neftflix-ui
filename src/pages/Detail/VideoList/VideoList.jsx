import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi, { category as cate } from '~/api/tmdbApi';
import apiConfig from '~/api';
import styles from '../Detail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function VideoList({ id, category }) {
    const [videos, setVideos] = useState([]);
    const iframeRef = useRef();
    useEffect(() => {
        const getVideos = async () => {
            const response = await tmdbApi.getVideos(category, id);
            const videoInfor = response.results.slice(0, 5);

            setVideos(videoInfor);
        };
        getVideos();
    }, [category, id]);

    return (
        <div className={cx('')}>
            {videos.map((video, i) => {
                return (
                    <div className={cx('video-list')}>
                        <div key={i}>
                            <div className={cx('video-title')}>
                                <h2>{video.name}</h2>
                            </div>
                            <iframe
                                className={cx('iframe-video')}
                                ref={iframeRef}
                                width={'100%'}
                                title="video"
                                src={`https://www.youtube.com/embed/${video.key}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default VideoList;
