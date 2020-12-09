import React from "react";
import NewCategoryGroup from "./categoryGroup/NewCategoryGroup";

import { ApolloProvider } from "@apollo/client";
import { client } from "../api/apolloClient";

const Pff = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <NewCategoryGroup />
      </div>
    </ApolloProvider>
  );
};

export default Pff;
