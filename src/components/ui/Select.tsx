import { forwardRef, useId } from "react";

interface ISelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: Array<string>;
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options = [], label = "", ...props }, ref) => {
    const id = useId();

    return (
      <div>
        <label className="flex flex-col space-y-1" htmlFor={id}>
          {label && (
            <span className="text-sm font-semibold text-slate-800">
              {label}
            </span>
          )}
          <select
            className="self-start rounded border-2 border-slate-900 p-2 text-slate-800 transition-all duration-200 focus:ring-1 focus:ring-slate-900 focus:ring-offset-1 focus:outline-none"
            id={id}
            ref={ref}
            {...props}>
            {options.length
              ? options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              : null}
          </select>
        </label>
      </div>
    );
  },
);

export default Select;
