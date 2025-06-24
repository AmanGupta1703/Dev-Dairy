import { useId, forwardRef } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ label, type = "text", ...props }, ref) => {
    const id = useId();

    return (
      <div>
        <label className="flex flex-col space-y-1" htmlFor={id}>
          {label && (
            <span className="text-sm font-semibold text-slate-800">
              {label}
            </span>
          )}
          <input
            ref={ref}
            className="rounded border-2 border-slate-900 p-2 text-slate-800 transition-all duration-200 placeholder:text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-slate-900 focus:ring-offset-1 focus:outline-none"
            id={id}
            type={type}
            {...props}
          />
        </label>
      </div>
    );
  },
);

export default Input;
