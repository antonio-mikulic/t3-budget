import React, { ReactNode } from 'react';

export default function Button(props: {
    disabled: boolean;
    children: ReactNode;
    onClick: (e: React.MouseEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}) {
    const type = props.type || 'button';
    const className = props.className || 'bg-cyan-600';

    return (
        <button
            type={type}
            onClick={props.onClick}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out active:bg-gray-900 ${
                    props.disabled && 'opacity-25'
                } ` + className
            }
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}
