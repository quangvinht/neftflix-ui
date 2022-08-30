import { useEffect, useRef } from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import background from '~/assets/images/footer-bg.jpg';
import logo from '~/assets/images/tmovie.png';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div style={{ backgroundImage: `url(${background})` }} className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className={cx('footer-logo')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="" />
                        <Link to="/">
                            <h4>tMovies</h4>
                        </Link>
                    </div>
                </div>
                <div className={cx('footer-menus')}>
                    <div className={cx('menu')}>
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>

                        <Link to="/">Term of services</Link>

                        <Link to="/">About us</Link>
                    </div>

                    <div className={cx('menu')}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>

                        <Link to="/">Premium</Link>

                        <Link to="/">Privacy policy</Link>
                    </div>

                    <div className={cx('menu')}>
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent realse</Link>

                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
