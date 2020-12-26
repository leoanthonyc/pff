// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/apolloClient";
import Pff from "../components/pff";
import "../layouts/application.css";

const App = ({ title }) => (
  <ApolloProvider client={client}>
    <div className="text-4xl font-bold p-6">{title}!</div>
    <Pff />
  </ApolloProvider>
);

App.defaultProps = {
  title: "Title",
};

App.propTypes = {
  title: PropTypes.string,
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App title="Pff" />,
    document.body.appendChild(document.createElement("div"))
  );
});
