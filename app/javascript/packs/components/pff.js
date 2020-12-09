import React from "react";
import CategoryGroups from "./categoryGroup/CategoryGroups";
import NewCategoryGroup from "./categoryGroup/NewCategoryGroup";
import { useQuery } from "@apollo/client";
import { CATEGORY_GROUPS_QUERY } from "../api/categoryGroup";

const Pff = () => {
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <NewCategoryGroup />
      <CategoryGroups categoryGroups={data.categoryGroups} />
    </div>
  );
};

export default Pff;
