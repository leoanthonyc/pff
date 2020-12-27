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
      <div className="pb-2">
        <NewCategoryGroup />
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200 text-sm">
          <tr>
            <th className="px-2">NAME</th>
            <th className="px-2">BUDGET</th>
            <th className="px-2">AVAILABLE</th>
            <th className="px-2">ACTIONS</th>
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
