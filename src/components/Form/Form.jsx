import './Form.scss';

const Form = ({ children, title, subtitle, handleSubmit, btnText, loading, className }) => (
  <div className={`Form ${className || ''}`}>
    <p className="Form__title">{title}</p>
    {subtitle && <p className="Form__subtitle">{subtitle}</p>}
    <form action="submit" className="Form__form" onSubmit={handleSubmit}>
      {loading ? (
        <div className="Form__loader">
          <div />
        </div>
      ) : (
        <>
          {children}
          <button type="submit" onClick={handleSubmit} className="Form__form-btn">
            <p>{btnText}</p>
          </button>
        </>
      )}
    </form>
  </div>
);

export default Form;
