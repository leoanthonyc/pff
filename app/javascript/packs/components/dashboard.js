import React, { useState } from "react";
import Transactions from "./transaction/Transactions";

const Dashboard = () => {
  return (
    <div>
      <h2> Dashboard </h2>
      <Transactions />
    </div>
  );
};

export default Dashboard;
