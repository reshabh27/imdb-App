const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className=" place-items-center m-4">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="input input-bordered w-full max-w-xs ms-2"
      />
    </div>
  );
};
export default FormInput;
