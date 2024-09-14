"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dribbble, Goal, Users, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';

// Define types for mock data
interface TeamPerformance {
  match: string;
  goals: number;
  possession: number;
}

interface TopScorer {
  name: string;
  goals: number;
  assists: number;
}

// Define types for props
interface AnimatedBarProps {
  percentage: number;
  color: string;
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend?: number;
}

interface PlayerCardProps {
  player: TopScorer;
  index: number;
}

const mockData = {
  teamPerformance: [
    { match: 'Match 1', goals: 2, possession: 60 },
    { match: 'Match 2', goals: 1, possession: 55 },
    { match: 'Match 3', goals: 3, possession: 58 },
    { match: 'Match 4', goals: 0, possession: 45 },
    { match: 'Match 5', goals: 2, possession: 62 },
  ],
  topScorers: [
    { name: 'John Doe', goals: 7, assists: 3 },
    { name: 'Jane Smith', goals: 5, assists: 6 },
    { name: 'Mike Johnson', goals: 4, assists: 2 },
  ],
};

// AnimatedBar component
const AnimatedBar: React.FC<AnimatedBarProps> = ({ percentage, color }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

// StatCard component
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold text-gray-800">{value}</div>
    {trend !== undefined && (
      <div className={`flex items-center mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        <span>{Math.abs(trend)}%</span>
      </div>
    )}
  </motion.div>
);

// PlayerCard component
const PlayerCard: React.FC<PlayerCardProps> = ({ player, index }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 flex items-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex-shrink-0 mr-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
        {player.name.charAt(0)}
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-semibold mb-2">{player.name}</h3>
      <AnimatedBar percentage={(player.goals / 10) * 100} color="bg-blue-500" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>Goals: {player.goals}</span>
        <span>Assists: {player.assists}</span>
      </div>
    </div>
  </motion.div>
);

// AdvancedSportsDashboard component
const AdvancedSportsDashboard: React.FC = () => {
  const [chartData, setChartData] = useState<TeamPerformance[]>([]);

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
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center">
        Premier Soccer Analytics Dashboard
      </h1>
      <p className="text-lg text-gray-200 mt-4 text-center">Track your team&apos;s performance in real-time</p>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatCard icon={Goal} title="Total Goals" value="8" trend={5} />
        <StatCard icon={Dribbble} title="Avg. Possession" value="56%" trend={-2} />
        <StatCard icon={CheckCircle} title="Pass Accuracy" value="85%" trend={4} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Team Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="match" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="goals" stroke="#8884d8" strokeWidth={2} dot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="possession" stroke="#82ca9d" strokeWidth={2} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Top Scorers</h2>
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
