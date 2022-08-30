import { useState, useEffect, useRef } from 'react';
import styles from './SearchInput.module.scss';
import classNames from 'classnames/bind';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SearchInput({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={
                onChange
                    ? (e) => {
                          onChange(e);
                      }
                    : null
            }
        />
    );
}

export default SearchInput;
