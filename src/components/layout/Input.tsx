export interface InputProps {
  id: string;
  type: string;
  value: string | number;
  wrapperClassName?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  pattern?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className={`${props.wrapperClassName}`}>
      <div
        className={`m-0.5 border p-0.5 transition duration-150 ease-in-out ${
          props.error ? 'rounded border-red-900 focus-within:border-red-900' : ' rounded border-slate-800'
        }`}
      >
        {props.label && (
          <label htmlFor={props.id} className="text-primary placeholder-gray-gray4 px-2 pt-1.5 text-xs font-light">
            {props.label} {props.required && <span className="text-red">*</span>}
          </label>
        )}
        <input
          type={props.type}
          className={`text-primary w-full rounded-md px-2 pb-1.5 text-base font-light  outline-none ${
            props.error ? 'text-red-700' : 'text-black'
          }`}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          pattern={props.pattern}
          onChange={(e) => props.onChange(e)}
        />
      </div>
      {props.errorText && <p className="text-red mb-4  pl-2 text-xs">{props.errorText}</p>}
    </div>
  );
};

export default Input;
