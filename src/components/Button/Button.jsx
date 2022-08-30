import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({ children, classname, small = false, onClick, outline = false, ...props }) {
    const classes = cx('btn', {
        outline,
        small,
        [classname]: classname,
    });
    return (
        <button
            className={cx(classes)}
            onClick={
                onClick
                    ? () => {
                          onClick();
                      }
                    : null
            }
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    small: PropTypes.bool,
    outline: PropTypes.bool,
    onClick: PropTypes.func,
    classname: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
