function Button({ children, variant = "primary", onClick, type = "button" }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  const styles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${styles}`}
    >
      {children}
    </button>
  );
}

export default Button;