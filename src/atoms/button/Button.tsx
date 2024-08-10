import './Button.css';
import React from "react";

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
    isButtonDisabled: boolean;
    title: string;
    // className: string;
}

function Button({isButtonDisabled, onClick, title}: Props) {
    return (
        <button
            onClick={onClick}
            className={`button ${isButtonDisabled ? "button--disabled" : ""}`}
            disabled={isButtonDisabled}
        >
            {title}
        </button>
    )
}

export default Button;