import React, { useState } from "react";
import PropTypes from "prop-types";
import Categories from "../category/Categories";

const CategoryGroup = ({ categoryGroup }) => {
  const [name, setName] = useState(categoryGroup.name);
  return (
    <>
      <h4>{name}</h4>
      <Categories
        categoryGroupId={categoryGroup.id}
        categories={categoryGroup.categories}
      />
    </>
  );
};

CategoryGroup.propTypes = {
  categoryGroup: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const CategoryGroups = ({ categoryGroups }) => {
  return (
    <div>
      {categoryGroups.map((categoryGroup) => (
        <CategoryGroup key={categoryGroup.id} categoryGroup={categoryGroup} />
      ))}
    </div>
  );
};

CategoryGroups.propTypes = {
  categoryGroups: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
};

export default CategoryGroups;
