"use client";

import { useState } from "react";
import Tabs from "./components/Tabs";
import DashboardOverview from "./components/DashboardOverview";
import MyCampaigns from "./components/MyCampaigns";
import Donations from "./components/Donations";
import Funds from "./components/Funds";
import Settings from "./components/Settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Dashboard Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render Active Tab Content */}
      {activeTab === "Dashboard" && <DashboardOverview />}
      {activeTab === "My Campaigns" && <MyCampaigns />}
      {activeTab === "Donations" && <Donations />}
      {activeTab === "Funds" && <Funds />}
      {activeTab === "Settings" && <Settings />}
    </div>
  );
};

export default Dashboard;