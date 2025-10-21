import React from 'react';
import styles from './StartTrainingButton.module.scss';

interface StartTrainingButtonProps {
    onClick?: () => void;
    className?: string;
}

const StartTrainingButton: React.FC<StartTrainingButtonProps> = ({
    onClick,
    className = '',
}) => {
    return (
        <button 
            className={`${styles.startTrainingButton} ${className}`}
            onClick={onClick}
            type="button"
        >
            Start Training
        </button>
    );
};

export default StartTrainingButton;