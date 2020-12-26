import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORY_GROUPS_QUERY } from "../../graphql/CategoryGroup";
import CategoryGroup from "../CategoryGroup";
import NewCategoryGroup from "./NewCategoryGroup";

const CategoryGroups = () => {
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="pb-4">
        <NewCategoryGroup />
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2">Name</th>
            <th className="px-2">Budget</th>
            <th className="px-2">Available</th>
            <th className="px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(data.categoryGroups || []).map((categoryGroup) => (
            <CategoryGroup
              key={categoryGroup.id}
              categoryGroup={categoryGroup}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryGroups;
