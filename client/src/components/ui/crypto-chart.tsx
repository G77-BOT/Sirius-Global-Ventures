import { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface CryptoChartProps {
  title: string;
  subtitle?: string;
  data?: Array<{ time: string; price: number; volume?: number; }>;
  color?: string;
  gradient?: boolean;
  animated?: boolean;
  className?: string;
}

// Generate mock crypto data if not provided
const generateMockData = (days: number = 30, trend: 'up' | 'down' | 'volatile' = 'volatile') => {
  const data = [];
  let price = 1000 + Math.random() * 9000;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const randomFactor = Math.random() * 0.06 - 0.03;
    
    if (trend === 'up') {
      price = price * (1 + Math.abs(randomFactor) * 0.5);
    } else if (trend === 'down') {
      price = price * (1 - Math.abs(randomFactor) * 0.5);
    } else {
      price = price * (1 + randomFactor);
    }
    
    const volume = Math.random() * price * 10;
    
    data.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Number(price.toFixed(2)),
      volume: Math.floor(volume)
    });
  }
  
  return data;
};

const CryptoChart = ({
  title,
  subtitle,
  data: initialData,
  color = "#3498DB",
  gradient = true,
  animated = true,
  className = ""
}: CryptoChartProps) => {
  const data = initialData || generateMockData(30, 'volatile');
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!animated || !chartRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-chart-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(chartRef.current);
    
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [animated]);

  // Calculate percentage change
  const firstPrice = data[0]?.price;
  const lastPrice = data[data.length - 1]?.price;
  const priceChange = lastPrice - firstPrice;
  const percentChange = (priceChange / firstPrice) * 100;
  const trendPositive = percentChange >= 0;

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0 relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-heading font-bold text-xl text-primary">{title}</h3>
            <div className={`text-sm font-medium ${trendPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trendPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(2)}%
            </div>
          </div>
          {subtitle && <p className="text-sm text-neutral-400 mb-4">{subtitle}</p>}
          <div className="font-mono text-2xl font-bold">${lastPrice ? lastPrice.toLocaleString() : 'N/A'}</div>
        </div>
        
        <div 
          ref={chartRef}
          className={`w-full h-48 ${animated ? 'opacity-0 translate-y-4' : ''}`}
          style={{ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                {gradient && (
                  <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="time" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                tickMargin={8}
                minTickGap={15}
              />
              <YAxis 
                hide={true}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip 
                formatter={(value: number) => ['$' + value.toLocaleString(), 'Price']}
                contentStyle={{ background: '#fff', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ color: '#666' }}
                itemStyle={{ color: color }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={color} 
                strokeWidth={2}
                fill={gradient ? `url(#color-${title})` : color}
                fillOpacity={gradient ? 1 : 0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </CardContent>
    </Card>
  );
};

export default CryptoChart;