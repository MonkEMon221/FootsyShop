import PropTypes from "prop-types";

const CreateCategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

CreateCategoryForm.propTypes = {
  handleSubmit: PropTypes.func,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default CreateCategoryForm;
