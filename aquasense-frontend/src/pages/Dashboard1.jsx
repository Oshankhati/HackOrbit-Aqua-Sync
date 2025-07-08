
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

//import Waterusageoverview from '../components/DashboardWidgets/Waterusageoverview';
import Waterinput from '../components/DashboardWidgets/Waterinput';
import Usagequota from '../components/DashboardWidgets/Usagequota';
import Alerts from '../components/DashboardWidgets/Alerts';
import Optimizationtips from '../components/DashboardWidgets/Optimizationtips';
import Leaderboard from '../components/DashboardWidgets/Leaderboard';
import LocationComparision from '../components/DashboardWidgets/LocationComparision';
import Watercycling from '../components/DashboardWidgets/Watercycling';
import SmartgardernScheduler from '../components/DashboardWidgets/SmartgardernScheduler';
import Communitywall from '../components/DashboardWidgets/Communitywall';
import ProductSuggestions from '../components/DashboardWidgets/Productsuggestions';

export default function Dashboard1() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [predictedUsage, setPredictedUsage] = useState(null);
  const [historicalPredictions, setHistoricalPredictions] = useState([]);
  const [localTodayUsage, setLocalTodayUsage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: token }
        });

        setDashboardData({
          usageToday: response.data.usageToday ?? [],
          dailyQuota: response.data.dailyQuota ?? 0,
          alerts: response.data.alerts ?? [],
          tips: response.data.tips ?? [],
          leaderboard: response.data.leaderboard ?? [],
        });

        const todayAmount = (response.data.usageToday ?? []).reduce((a, b) => a + b.amount, 0);
        setLocalTodayUsage(todayAmount);

        const prediction = localStorage.getItem('predictedUsage');
        if (prediction) {
          setPredictedUsage(Number(prediction));
        }

        const historyRes = await axios.get('http://localhost:5000/api/predictions', {
          headers: { Authorization: token }
        });
        setHistoricalPredictions(historyRes.data);

      } catch (error) {
        console.error(error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-800 text-lg">Loading...</div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="flex min-h-screen ">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="w-64 bg-indigo-700 text-white p-6 hidden md:flex flex-col sticky top-0 h-screen"
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col ">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 flex-1 overflow-auto space-y-6">
          {/* <Waterusageoverview data={dashboardData.usageToday} /> */}
          {predictedUsage && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Predicted Daily Water Usage</h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: 'Prediction', usage: predictedUsage }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

              <p className="mt-4 text-center text-gray-700">
                Estimated usage: <span className="font-bold">{predictedUsage} Liters</span>
              </p>
            </div>
          )}
          {historicalPredictions.length > 0 && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Prediction History</h3>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalPredictions.map(p => ({
                  date: new Date(p.date).toLocaleDateString(),
                  usage: p.predictedUsage
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <Waterinput onDailyTotalChange={setLocalTodayUsage} />

          <Usagequota
            waterUsedToday={localTodayUsage}
            dailyQuota={dashboardData.dailyQuota}
          />

          <Alerts
            waterUsedToday={localTodayUsage}
            dailyQuota={dashboardData.dailyQuota}
          />

          <Optimizationtips tips={dashboardData.tips} />
          <Leaderboard data={dashboardData.leaderboard} />
          <LocationComparision />
          <Watercycling dailyUsage={localTodayUsage} />
          <SmartgardernScheduler />
          <Communitywall />
          <ProductSuggestions />

         
          {/* <Waterusageoverview data={dashboardData.usageToday} /> */}

          <footer className="text-center text-sm text-gray-500 py-6">
            © 2025 AquaSense. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
