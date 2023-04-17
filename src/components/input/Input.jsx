import styles from './Input.module.scss';

const Input = ({ label, type, name, value = '', onChange, ...rest }) => (
  <div className={styles.container}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      {...rest}
      className={styles.input}
    />
  </div>
);

export default Input;
