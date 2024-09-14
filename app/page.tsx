"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dribbble, Goal, ArrowUp, ArrowDown, CheckCircle } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';
import { RadialBarChart, RadialBar } from 'recharts';

const mockData = {
  teamPerformance: [
    { match: 'Match 1', goals: 2, possession: 60, passAccuracy: 85 },
    { match: 'Match 2', goals: 1, possession: 55, passAccuracy: 80 },
    { match: 'Match 3', goals: 3, possession: 58, passAccuracy: 90 },
    { match: 'Match 4', goals: 0, possession: 45, passAccuracy: 76 },
    { match: 'Match 5', goals: 2, possession: 62, passAccuracy: 88 },
  ],
  topScorers: [
    { name: 'John Doe', goals: 7, assists: 3 },
    { name: 'Jane Smith', goals: 5, assists: 6 },
    { name: 'Mike Johnson', goals: 4, assists: 2 },
  ],
};

const AnimatedBar = ({ percentage, color }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute h-full ${color} rounded-full`}
        style={{
          width: `${percentage}%`,
          transition: 'width 0.5s ease-in-out',
        }}
      ></div>
    </div>
  );
};


const StatCard = ({ icon: Icon, title, value, trend }) => (
  <motion.div
    className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
    whileHover={{ scale: 1.08 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <div className="text-3xl font-bold text-white">{value}</div>
    {trend && (
      <div className={`flex items-center mt-2 ${trend > 0 ? 'text-green-300' : 'text-red-600'}`}>
        {trend > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        <span>{Math.abs(trend)}%</span>
      </div>
    )}
  </motion.div>
);

const RadialProgress = ({ percentage, color }) => (
  <div className="w-32 h-32">
    <RadialBarChart width={128} height={128} cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" barSize={10} data={[{ value: percentage, fill: color }]}>
      <RadialBar minAngle={15} clockWise dataKey="value" />
    </RadialBarChart>
  </div>
);

const PlayerCard = ({ player, index }) => (
  <motion.div
    className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 flex items-center hover:bg-opacity-40 transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex-shrink-0 mr-4">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl font-bold text-white">
        {player.name.charAt(0)}
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-semibold mb-2 text-white">{player.name}</h3>
      <AnimatedBar percentage={(player.goals / 10) * 100} color="bg-blue-500" />
      <div className="flex justify-between text-sm text-gray-300">
        <span>Goals: {player.goals}</span>
        <span>Assists: {player.assists}</span>
      </div>
    </div>
  </motion.div>
);

const AdvancedSportsDashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const animateData = () => {
      mockData.teamPerformance.forEach((item, index) => {
        setTimeout(() => {
          setChartData(prevData => [...prevData, item]);
        }, index * 300);
      });
    };
    animateData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white">
          Premier Soccer Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-200 mt-4">Track your team&apos;s performance in real-time</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatCard icon={Goal} title="Total Goals" value="8" trend={5} />
        <StatCard icon={Dribbble} title="Avg. Possession" value="56%" trend={-2} />
        <StatCard icon={CheckCircle} title="Pass Accuracy" value="85%" trend={4} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Team Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="match" tick={{ fill: '#fff' }} />
              <YAxis yAxisId="left" tick={{ fill: '#fff' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#fff' }} />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Line yAxisId="left" type="monotone" dataKey="goals" stroke="#8884d8" strokeWidth={2} dot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="possession" stroke="#82ca9d" strokeWidth={2} dot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="passAccuracy" stroke="#ff7300" strokeWidth={2} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Top Scorers</h2>
          <div className="space-y-4">
            {mockData.topScorers.map((player, index) => (
              <PlayerCard key={index} player={player} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSportsDashboard;
