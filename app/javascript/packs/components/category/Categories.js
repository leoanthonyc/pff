import React from "react";
import PropTypes from "prop-types";
import NewCategory from "./NewCategory";

const Category = ({ category }) => {
  return <div>{category.name}</div>;
};

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Categories = ({ categoryGroupId, categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      <NewCategory categoryGroupId={categoryGroupId} />
    </div>
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
