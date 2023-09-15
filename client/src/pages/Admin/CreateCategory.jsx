import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CreateCategoryForm from "../../components/Forms/CreateCategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const api = import.meta.env.VITE_API;
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [item, setItem] = useState(null);

  //All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/category/categories`);
      if (data?.success) {
        setCategory(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong in fetching Data");
    }
  };

  //Create Category
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${api}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        getAllCategories();
        setName("");
        toast.success("New Category Created");
      } else {
        toast.error("New Category not Created");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Creating category");
    }
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  //Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${api}/api/v1/category/update-category/${item._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success("Category Updated");
        getAllCategories();
        setUpdatedName("");
        setItem(null);
        setVisible(false);
      } else {
        toast.error("ERror");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //handleDelete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${api}/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Data");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3">
              <CreateCategoryForm
                handleSubmit={handleFormSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => {
                    return (
                      <React.Fragment key={c._id}>
                        <tr>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary mb-2 ms-2"
                              onClick={() => {
                                setVisible(true), setUpdatedName(c.name);
                                setItem(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mb-2 ms-2"
                              onClick={() => handleDelete(c._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              footer={null}
              open={visible}
              onCancel={() => setVisible(false)}
            >
              <CreateCategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
