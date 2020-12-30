import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CATEGORY_GROUPS_QUERY } from "../../graphql/CategoryGroup";
import CategoryGroup from "../CategoryGroup";
import NewCategoryGroup from "./NewCategoryGroup";
import { getMonth } from "../../utils/date";

const CategoryGroups = () => {
  const { monthYear } = useParams();
  const [monthFilter, setMonthFilter] = useState(
    monthYear ?? new Date(new Date().setDate(1))
  );
  const { data, loading, error } = useQuery(CATEGORY_GROUPS_QUERY);
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="p-2 flex justify-between bg-gray-200">
        <div className="flex">
          <div className="px-1 text-xl">
            <button
              type="button"
              onClick={() => {
                const currentMonth = monthFilter.getMonth();
                const prevMonth = new Date(
                  monthFilter.setMonth(currentMonth - 1)
                );
                setMonthFilter(prevMonth);
              }}
            >
              &#8592;
            </button>
          </div>
          <div className="text-lg font-bold px-2">{getMonth(monthFilter)}</div>
          <div className="px-1 text-xl">
            <button
              type="button"
              onClick={() => {
                const currentMonth = monthFilter.getMonth();
                const nextMonth = new Date(
                  monthFilter.setMonth(currentMonth + 1)
                );
                setMonthFilter(nextMonth);
              }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
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
