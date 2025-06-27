import { useId, forwardRef } from "react";

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, ...props }, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const id = useId();

    return (
      <div>
        <label className="flex flex-col space-y-1" htmlFor={id}>
          {label && (
            <span className="text-sm font-semibold text-slate-800">
              {label}
            </span>
          )}
        </label>

        <textarea
          id={id}
          className="w-full rounded border-2 border-slate-900 p-2 text-slate-800 transition-all duration-200 focus:ring-1 focus:ring-slate-900 focus:ring-offset-1 focus:outline-none"
          ref={ref}
          {...props}></textarea>
      </div>
    );
  },
);

export default Textarea;
