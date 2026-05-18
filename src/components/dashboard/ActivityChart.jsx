import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useThemeStore } from '@/store/useThemeStore'
import { useDashboardStore } from '@/store/useDashboardStore'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl">
        {`${payload[0].value} kcal`}
      </div>
    )
  }
  return null
}

export function ActivityChart() {
  const { theme } = useThemeStore()
  const { stats } = useDashboardStore()
  const isDark = theme === 'dark'
  
  // Use real stats if available, otherwise empty skeleton
  const chartData = stats?.weeklyActivity || [
    { name: 'Mon', value: 0 },
    { name: 'Tue', value: 0 },
    { name: 'Wed', value: 0 },
    { name: 'Thu', value: 0 },
    { name: 'Fri', value: 0 },
    { name: 'Sat', value: 0 },
    { name: 'Sun', value: 0 },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: isDark ? '#94a3b8' : '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9', radius: 4 }} />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value === 0 ? (isDark ? '#334155' : '#e2e8f0') : '#14b8a6'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
