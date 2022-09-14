import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Searchbar from "../Searchbar";
import CategoryList from "./CategoryList";
import AddLegend from "./AddLegend";
import IconList from "./IconList";

const LegendLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [icons, setIcons] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const resData = await fetchCategories();
      setCategories(resData);
    };
    getCategories();

    const getIcons = async () => {
      const resData = await fetchIcons();
      setIcons(resData);
    };
    getIcons();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    return data;
  };

  const fetchIcons = async () => {
    const res = await fetch("http://localhost:3001/icons");
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
    await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
    });
    setCategories(categories.filter((category) => id != category.id));
  };

  const searchFilter = !query
    ? icons
    : icons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(query.toLowerCase()) ||
          icon.category.toLowerCase().includes(query.toLowerCase())
      );

  const categoryFilter = !filter
    ? icons
    : icons.filter((icon) => icon.categoryid === filter);

  return (
    <>
      <Navbar />
      <CategoryList
        categories={categories}
        onSubmit={submitCategory}
        onDelete={deleteCategory}
        onFilter={setFilter}
      />
      <AddLegend />
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
      <Box sx={{ ml: "14%" }}>
        <IconList icons={categoryFilter} />
      </Box>
    </>
  );
};

export default LegendLibrary;
