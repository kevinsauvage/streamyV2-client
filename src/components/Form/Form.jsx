import styles from './Form.module.scss';

const Form = ({ children, title, subtitle, handleSubmit, btnText, loading, className }) => (
  <div className={`${styles.container} ${className || ''}`}>
    <p className={styles.title}>{title}</p>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <form action="submit" onSubmit={handleSubmit}>
      {loading ? (
        <div className={styles.loader}>
          <div />
        </div>
      ) : (
        <>
          {children}
          <button type="submit" onClick={handleSubmit} className={styles.button}>
            <p>{btnText}</p>
          </button>
        </>
      )}
    </form>
  </div>
);

export default Form;
