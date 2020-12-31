import React from "react";
import PropTypes from "prop-types";
import Category from "../Category";

const Categories = ({ categoryGroupId, categories, transactions }) => {
  return (
    <>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          categoryGroupId={categoryGroupId}
          transactions={transactions.filter(
            (t) => t.category.id === category.id
          )}
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
  transactions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number.isRequired })
  ).isRequired,
};

export default Categories;
