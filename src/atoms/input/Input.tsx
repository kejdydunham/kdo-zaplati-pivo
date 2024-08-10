import './Input.css';
import React from "react";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
    title: string;
    type: 'text' | 'number';
    defaultValue?: number | string;
}

function Input({onChange, title, type, defaultValue}: Props) {
    return (
        <input
            value={defaultValue !== undefined ? defaultValue : ""}
            type={type}
            onChange={onChange}
            className="input"
            placeholder={title}
        />
    )
}

export default Input;