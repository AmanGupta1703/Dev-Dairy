type TButton = {
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  type = "button",
  bgColor = "bg-slate-500",
  textColor = "text-white",
  className = "",
  children,
  ...props
}: TButton) {
  return (
    <button
      className={`cursor-pointer rounded px-2 py-2 transition-all duration-200 outline-none hover:bg-slate-600 hover:ring-1 hover:ring-slate-600 hover:ring-offset-1 focus:bg-slate-600 focus:ring-1 focus:ring-slate-600 focus:ring-offset-1 ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
