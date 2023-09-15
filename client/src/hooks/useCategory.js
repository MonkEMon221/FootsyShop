import axios from "axios";
import { useState, useEffect } from "react";

const useCategory = () => {
  const api = import.meta.env.VITE_API;
  const [category, setCategory] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/category/categories`);
      setCategory(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return category;
};

export default useCategory;
