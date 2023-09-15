import axios from "axios";
import useSearch from "../../context/useSearch";
import { useNavigate } from "react-router-dom";
const SearchForm = () => {
  const [value, setValue] = useSearch();
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${api}/api/v1/product/search/${value.keyword}`
      );
      setValue({ ...value, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ width: "700px" }} className="d-flex align-items-center">
      <form
        className="d-flex flex-row me-auto p-2"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 no-border"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button className="btn btn-success w-auto" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
