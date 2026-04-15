"use client";

import React, { useMemo } from 'react';
import { useAppData } from '@/context/AppDataContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Stats() {
  const { timeline } = useAppData();

  const data = useMemo(() => {
    const counts = { Call: 0, Text: 0, Video: 0 };
    timeline.forEach(t => {
      if (counts[t.type] !== undefined) {
        counts[t.type]++;
      }
    });

    return [
      { name: 'Call', value: counts.Call },
      { name: 'Text', value: counts.Text },
      { name: 'Video', value: counts.Video },
    ].filter(d => d.value > 0);
  }, [timeline]);

  const COLORS = ['#194E38', '#8b5cf6', '#10b981'];

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-[2rem] font-bold text-[#222] tracking-tight mb-10">Friendship Analytics</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col min-h-[500px]">
        <h3 className="text-gray-600 font-medium mb-8">By Interaction Type</h3>
        
        <div className="grow w-full flex items-center justify-center -mt-8">
          {data.length === 0 ? (
            <div className="text-gray-400 text-center">
              No interactions logged yet to generate stats.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={150}
                  stroke="#ffffff"
                  strokeWidth={6}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} logs`, 'Count']} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
