import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = ({ searchValue }) => {
  const history = useHistory();
  const [option, setOption] = useState(null);
  const { data } = useFetch("plates");
  let options = [];

  if (data.length) {
    options = data.map((x) => ({ value: x.NumberPlate, label: x.NumberPlate }));
  }

  const handleChange = (selected) => {
    history.push(`/history/${selected.value}`);
  };

  return (
    <Select
      value={option}
      onChange={handleChange}
      options={options}
      className="w-300"
    />
  );
};

export default Search;
