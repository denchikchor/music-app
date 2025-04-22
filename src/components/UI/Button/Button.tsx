import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconPosition,
  ...rest
}) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], styles[size], className)}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;
