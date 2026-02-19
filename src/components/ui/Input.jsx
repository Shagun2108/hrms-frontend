const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
};

export default Input;
