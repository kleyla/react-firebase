import React, { useState } from "react";

const LinkForm = (props) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };
  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group  input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="http://"
          name="url"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Website name"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          id=""
          rows="3"
          className="form-control"
          placeholder="Descripcion"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>
      <button className="btn btn-primary btn-block">Save</button>
    </form>
  );
};

export default LinkForm;
