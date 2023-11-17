import PropTypes from 'prop-types';

export default function Button({
  type = "submit",
  style = "primary",
  onClick,
  disabled,
  className,
  children
}) {

  let defaultStyle;

  if (style === "primary") {
    defaultStyle = "text-white bg-cyan-950 py-1.5 px-4 rounded-md hover:bg-cyan-900 transition-all";
  }

  if (style === "danger") {
    defaultStyle = "text-white bg-red-600 py-1.5 px-4 rounded-md hover:bg-red-700 transition-all";
  }

  if (style === "info") {
    defaultStyle = "text-white bg-emerald-500 py-1.5 px-4 rounded-md hover:bg-emerald-700 transition-all";
  }


  return (
    <button
      type={`${type}`}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultStyle} ${className}`}
    >{children}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.string,
}
