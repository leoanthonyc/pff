import React, { useState } from "react";
import PropTypes from "prop-types";
import Category from "../Category";

const Categories = ({ categoryGroupId, categories }) => {
  return (
    <>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          categoryGroupId={categoryGroupId}
        />
      ))}
    </>
  );
};

Categories.propTypes = {
  categoryGroupId: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Categories;
