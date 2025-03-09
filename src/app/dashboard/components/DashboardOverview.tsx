const DashboardOverview = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Total Funds Raised */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">Total Funds Raised</h3>
                    <p className="font-bold text-3xl">$12,500</p>
                </div>

                {/* Active Campaigns */}
                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">Active Campaigns</h3>
                    <p className="font-bold text-3xl">3</p>
                </div>

                {/* Total Donations */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">Total Donations</h3>
                    <p className="font-bold text-3xl">48</p>
                </div>

                {/* Pending Withdrawals */}
                <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">Pending Withdrawals</h3>
                    <p className="font-bold text-3xl">$1,200</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
