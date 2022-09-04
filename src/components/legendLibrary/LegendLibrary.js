import { Category, FaceRetouchingNatural } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Searchbar from "../Searchbar";
import CategoryList from "./CategoryList";

const LegendLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const resData = await fetchCategories();
      setCategories(resData);
    };
    getCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    return data;
  };

  const submitCategory = async (categoryName) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    };
    const res = await fetch("http://localhost:3001/categories", requestOptions);
    const data = await res.json();
    setCategories([...categories, data]);
  };

  const deleteCategory = async (id) => {
    /*     await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
    }); */
    setCategories(categories.filter((category) => id != category.id));
  };

  return (
    <>
      <Navbar />
      <CategoryList
        categories={categories}
        onSubmit={submitCategory}
        onDelete={deleteCategory}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "14%",
        }}
      >
        <h1>Legend Library</h1>
        <Searchbar setQuery={setQuery} />
      </Box>
    </>
  );
};

export default LegendLibrary;
