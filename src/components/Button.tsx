import React from 'react';
import { IControl } from '../interfaces';

import './Button/Button.css';

interface IButton extends IControl {
    text: string;
}

function Button({ text, onClick }: IButton) {
    return (
        <button className="base-button" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;