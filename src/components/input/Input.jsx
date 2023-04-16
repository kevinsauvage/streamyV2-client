import './Input.scss';

const Input = ({ label, type, name, value = '', onChange, ...rest }) => (
  <div className="inputContainer">
    <label className="inputContainer__input-label" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      {...rest}
      className="inputContainer__input "
    />
  </div>
);

export default Input;
