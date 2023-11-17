import PropTypes from "prop-types";

export default function Title({ text, className }) {
  const defaultStyle = "text-[2rem] font-light";

  return (
    <h1 className={`${defaultStyle} ${className}`}>{text}</h1>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}
