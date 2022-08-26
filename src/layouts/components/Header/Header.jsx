import { useEffect, useRef } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/tmovie.png';
import { Link, useLocation } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

function Header() {
    //useLocation trả về vị trí hiện tại của trang :
    const pathName = useLocation();

    const headerRef = useRef(null);

    ///active header , hàm findIndex trả về vị trí đầu tiên tìm thấy phần tử ấy trong array
    // nên hàm này trả active về vị trí path trong array headerNav:
    const active = headerNav.findIndex((e) => {
        return e.path === pathName.pathname;
    });

    // useEffect(() => {
    //     const shrinkHeader = () => {
    //         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //             headerRef.current.classList.add('shrink');
    //         } else {
    //             headerRef.current.classList.remove('shrink');
    //         }
    //         window.addEventListener('scroll', shrinkHeader);
    //     };
    //     return () => {
    //         window.addEventListener('scroll', shrinkHeader);
    //     };
    // }, []);

    return (
        <div ref={headerRef} className={cx('header')}>
            <div className={cx(['wrapper'])}>
                <Link to={'/'}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="logo tMovies" className={cx('logo-img')} />
                        <span className={cx('logo-text')}>tMovies</span>
                    </div>
                </Link>
                <div className={cx('navbar')}>
                    {headerNav.map((navValue, index) => {
                        return (
                            <li key={index} className={cx(`${index === active ? 'active' : ''}`)}>
                                <Link to={navValue.path}>{navValue.display}</Link>
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Header;
