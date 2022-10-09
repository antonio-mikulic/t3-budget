import React, { ReactNode } from 'react';

export enum ButtonType {
    Primary,
    Secondary,
    Success,
    Warning,
    Error,
}

export default function Button(props: {
    disabled: boolean;
    children: ReactNode;
    onClick: (e: React.MouseEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    role?: ButtonType;
    className?: string;
}) {
    const type = props.type || 'button';
    let className = props.className;
    const role = props.role || ButtonType.Primary;

    switch (role) {
        case ButtonType.Primary:
            className += ' bg-blue-500 hover:bg-blue-700 ';
            break;
        case ButtonType.Secondary:
            className += ' bg-gray-500 hover:bg-gray-700 ';
            break;
        case ButtonType.Error:
            className += ' bg-red-500 hover:bg-red-700 ';
            break;
        case ButtonType.Success:
            className += ' bg-green-500 hover:bg-green-700 ';
            break;
        case ButtonType.Warning:
            className += ' bg-yellow-500 hover:bg-yellow-700 ';
            break;
    }

    return (
        <button
            type={type}
            onClick={props.onClick}
            className={
                `inline-flex items-center rounded-md border border-slate-900  px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out active:bg-gray-900 ${
                    props.disabled && 'opacity-25'
                } ` + className
            }
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}
