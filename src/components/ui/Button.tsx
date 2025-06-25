type TButton = {
  buttonType?: "primary" | "danger";
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  buttonType = "primary",
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  borderRadius = "rounded",
  className = "",
  children,
  ...props
}: TButton) {
  const buttonStateStyles =
    buttonType === "primary"
      ? "hover:bg-blue-600 hover:ring-1 hover:ring-blue-600 hover:ring-offset-1 focus:bg-blue-600 focus:ring-1 focus:ring-blue-600 focus:ring-offset-1"
      : buttonType === "danger"
        ? "hover:bg-red-600 hover:ring-1 hover:ring-red-600 hover:ring-offset-1 focus:bg-red-600 focus:ring-1 focus:ring-red-600 focus:ring-offset-1"
        : "";

  return (
    <button
      className={`cursor-pointer ${borderRadius} px-2 py-2 transition-all duration-200 outline-none ${buttonStateStyles} ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
