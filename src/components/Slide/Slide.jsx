import { useState, useEffect } from 'react';
import styles from './Slide.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import tmdbApi, { category, movieType, tvType } from '~/api/tmdbApi';
import apiConfig from '~/api';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { useStore, actions } from '~/store/';

import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/scss/pagination';

const cx = classNames.bind(styles);

function Slide({}) {
    const [state, dispatch] = useStore();

    function openModal() {
        dispatch(actions.setOpenModal(true));
    }

    const handleSendIdTrailer = (id) => {
        dispatch(actions.setIdTrailer(id));
        openModal();
    };

    //dùng cái này để slide tự chuyển liên tục:
    SwiperCore.use([Pagination, Autoplay]);

    //useState chứa các api tù tmdb:
    const [movieItems, setMovieItems] = useState([]);

    //get data from api:
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };

            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });

                const resuult = [];

                //random popular movie:
                while (true) {
                    const randomElement = response.results[Math.floor(Math.random() * response.results.length)];
                    if (resuult.length <= 4) {
                        if (resuult.includes(randomElement)) {
                            continue;
                        } else if (!resuult.includes(randomElement)) {
                            resuult.push(randomElement);
                        }
                        continue;
                    } else {
                        break;
                    }
                }

                setMovieItems(resuult);
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);

    //Nội dung cho từng item trong slide:

    const SlideItem = ({ item, className }) => {
        //ko dùng dc useHistory vì react-rom v6 chuyển thành useNavigate:
        const history = useNavigate();
        const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

        return (
            <>
                <div className={cx('slide-item', [className])} style={{ backgroundImage: `url(${background})` }}>
                    <div className={cx('slide-content')}>
                        <div className={cx('slide-infor')}>
                            <h3 className={cx('slide-title')}>{item.title}</h3>
                            <div className={cx('slide-overview')}>{item.overview}</div>
                            <div className={cx('slide-btn')}>
                                <Button
                                    onClick={() => {
                                        history.push('/movie' + item.id);
                                    }}
                                >
                                    Watch now
                                </Button>
                                <Button
                                    outline
                                    // onclick={setModalActive}
                                    // onclick={handleSendIdTrailer(item.id)}
                                    onClick={() => {
                                        handleSendIdTrailer(item.id);
                                    }}
                                >
                                    Watch trailer
                                </Button>
                            </div>
                        </div>
                        <div className={cx('slide-poster')}>
                            <img src={apiConfig.w500Image(item.poster_path)} alt="poster" className={cx('slide-img')} />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className={cx('slide')}>
            <Swiper
                module={[Pagination, Autoplay, EffectCards]}
                effect="cards"
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {movieItems.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            {(isActive) => {
                                return <SlideItem item={item} className={`${isActive ? 'active' : ''}`} />;
                            }}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {/* {movieItems.map((item, index) => {
                return <TrailerModal key={index} item={item}></TrailerModal>;
            })} */}
        </div>
    );
}

Slide.propTypes = {};

export default Slide;
