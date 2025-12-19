import { useId } from "react";
import "./Input.css";

const Input = ({ label, error, type = "text", className = "", ...props }) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;
  const classes = `input-wrapper ${
    error ? "input-error" : ""
  } ${className}`.trim();

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input id={inputId} type={type} className="input" {...props} />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
