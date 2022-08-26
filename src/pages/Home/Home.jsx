import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Slide from '~/components/Slide';

const cx = classNames.bind(styles);

export default function Home({}) {
    return (
        <div>
            <Slide />
        </div>
    );
}
