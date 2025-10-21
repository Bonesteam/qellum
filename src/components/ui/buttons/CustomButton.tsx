import React from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;