import { client } from "./apolloClient";
import { gql } from "@apollo/client";

const useSaveCategoryMutation = () => {
  client
    .query({
      query: gql`
        query Categories {
          categories {
            id
            name
          }
        }
      `,
    })
    .then((result) => console.log(result));
};

export default useSaveCategoryMutation;
