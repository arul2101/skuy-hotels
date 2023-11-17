import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types";

export default function Filters({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }


  return (
    <div className="bg-white rounded-lg p-0.5 flex gap-">
      {options.map(option => (
        <button
          key={option.value}
          className={`${option.value === currentFilter && 'bg-cyan-950 text-white'} py-1 px-4 rounded-lg`}
          onClick={() => handleClick(option.value)}
        >{option.label}</button>
      ))}
    </div>
  )
}

Filters.propTypes = {
  filterField: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}
