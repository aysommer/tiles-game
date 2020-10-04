import React from 'react';
import { IControl } from '../interfaces';

import './Button/Button.css';

interface IButton extends IControl {
    text: string;
}

function Button({ text, onClick, disabled }: IButton) {
    return (
        <button 
            className="base-button"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default React.memo(Button);