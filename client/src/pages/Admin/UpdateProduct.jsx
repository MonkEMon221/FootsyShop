import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  //getSingleProduct
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${api}/api/v1/product/single-product/${params.slug}`
      );
      if (data.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setId(data.product._id);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting Product");
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong in fetching Data");
    }
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  //handle Create Product

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${api}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        setCategory("");
        setDescription("");
        setName("");
        setImage("");
        setPrice("");
        setQuantity("");
      }
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you Sure?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${api}/api/v1/product/delete-product/${id}`
      );
      if (data.success) toast.success("Product deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting data");
    }
  };
  return (
    <Layout title={"Dashboard - Update Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select Your Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-info col-md-12 w-100">
                  {image ? image.name : "Upload File "}
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Images"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${api}/api/v1/product/product-image/${id}`}
                      alt="Images"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 w-100">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 w-100">
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3 w-100">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3 w-100">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter Product Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Select
                bordered={false}
                placeholder="Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping == "1" ? "Yes" : "No"}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary w-auto text-center"
                onClick={handleUpdate}
              >
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-danger w-auto text-center"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
