const tabs = ["Dashboard", "My Campaigns", "Donations", "Funds", "Settings"];

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`p-3 font-semibold ${
            activeTab === tab ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;