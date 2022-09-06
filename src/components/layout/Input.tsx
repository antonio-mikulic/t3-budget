export interface InputProps {
    id: string;
    type: string;
    value: string | number;
    wrapperClassName?: string;
    placeholder?: string;
    label?: string;
    error?: boolean;
    errorText?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
    const {
        id,
        value,
        wrapperClassName = 'm-1',
        placeholder = '',
        label = '',
        type = 'text',
        error = false,
        errorText = '',
        required = false,
        onChange,
        ...rest
    } = props;

    return (
        <div className={wrapperClassName}>
            <div
                className={`border transition duration-150 ease-in-out ${
                    error
                        ? 'border-red-900 focus-within:border-red-900'
                        : 'focus-within:border-primary border-slate-600'
                }`}
            >
                <label htmlFor={id} className="text-primary placeholder-gray-gray4 px-2 pt-1.5 text-xs font-light">
                    {label} {required && <span className="text-red">*</span>}
                </label>

                <input
                    type={type}
                    className="text-primary m-1 w-full rounded-md px-2 pb-1.5 text-base font-light text-black outline-none"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    {...rest}
                />
            </div>
            {errorText && <p className="text-red mb-4  pl-2 text-xs">{errorText}</p>}
        </div>
    );
};

export default Input;
