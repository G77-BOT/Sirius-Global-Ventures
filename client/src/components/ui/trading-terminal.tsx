import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock, TrendingUp, ChevronRight, ChevronDown } from 'lucide-react';

interface TradingTerminalProps {
  className?: string;
}

// Mock crypto data generator
const generateCryptoData = (points = 100, volatility = 0.03) => {
  const data = [];
  let price = 50000 + Math.random() * 10000;
  
  for (let i = 0; i < points; i++) {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (points - i));
    
    const change = volatility * price * (Math.random() - 0.5);
    price += change;
    
    data.push({
      timestamp: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 10 + 1)
    });
  }
  
  return data;
};

// Mock trade orders
const generateTradeOrders = (count = 10) => {
  const types = ['buy', 'sell'];
  const statuses = ['filled', 'pending', 'canceled'];
  const pairs = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'XRP/USD'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60));
    
    return {
      id: `order-${i}`,
      type,
      pair: pairs[Math.floor(Math.random() * pairs.length)],
      price: parseFloat((20000 + Math.random() * 30000).toFixed(2)),
      amount: parseFloat((0.1 + Math.random() * 2).toFixed(6)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Trading pairs with price changes
const tradingPairs = [
  { symbol: 'BTC/USD', price: 52389.42, change: 2.35 },
  { symbol: 'ETH/USD', price: 2845.87, change: 1.23 },
  { symbol: 'SOL/USD', price: 142.56, change: -0.87 },
  { symbol: 'XRP/USD', price: 0.5683, change: 4.21 },
  { symbol: 'DOT/USD', price: 18.39, change: -1.45 },
  { symbol: 'AVAX/USD', price: 35.62, change: 3.78 },
];

const TradingTerminal = ({ className = '' }: TradingTerminalProps) => {
  const [activeTab, setActiveTab] = useState('trades');
  const [chartData] = useState(() => generateCryptoData(100, 0.01));
  const [tradeOrders] = useState(() => generateTradeOrders(8));
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Animation effect
  useEffect(() => {
    if (!terminalRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(terminalRef.current);
    
    return () => {
      if (terminalRef.current) observer.unobserve(terminalRef.current);
    };
  }, []);

  // Calculate price change percent
  const firstPrice = chartData[0]?.price;
  const lastPrice = chartData[chartData.length - 1]?.price;
  const priceChange = lastPrice - firstPrice;
  const percentChange = (priceChange / firstPrice) * 100;
  const positiveChange = percentChange >= 0;

  // Format large numbers
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div 
      ref={terminalRef} 
      className={`bg-neutral-900 rounded-lg overflow-hidden shadow-xl transition-all duration-1000 ease-out opacity-0 translate-y-8 ${className}`}
    >
      <div className="border-b border-neutral-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-neutral-400 font-mono text-sm ml-2">Bostream Trading Terminal</span>
        </div>
        <div className="flex items-center text-neutral-400 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row h-[500px]">
        {/* Left sidebar */}
        <div className="w-full lg:w-48 border-r border-neutral-800 p-3 flex-shrink-0 h-full overflow-auto">
          <div className="mb-4">
            <h4 className="text-neutral-400 text-xs uppercase font-semibold mb-2">Market Watch</h4>
            <div className="space-y-2">
              {tradingPairs.map((pair) => (
                <div key={pair.symbol} className="flex justify-between items-center p-2 hover:bg-neutral-800/50 rounded cursor-pointer">
                  <div>
                    <div className="text-white font-medium text-sm">{pair.symbol}</div>
                    <div className="text-xs text-neutral-400">{formatCurrency(pair.price)}</div>
                  </div>
                  <div className={`text-xs ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                    {pair.change >= 0 ? 
                      <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    }
                    {Math.abs(pair.change)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-neutral-400 text-xs uppercase font-semibold mb-2">Quick Actions</h4>
            <div className="space-y-1">
              <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs py-2 rounded">New Order</button>
              <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs py-2 rounded">Quick Trade</button>
              <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs py-2 rounded">Alerts</button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow flex flex-col">
          {/* Chart header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="text-white font-bold">BTC/USD</h3>
                <div className={`ml-2 text-sm ${positiveChange ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {positiveChange ? 
                    <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  }
                  {Math.abs(percentChange).toFixed(2)}%
                </div>
              </div>
              <div className="text-2xl font-medium text-white mt-1">{formatCurrency(lastPrice)}</div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-1 rounded">1H</button>
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-1 rounded">4H</button>
              <button className="bg-neutral-700 text-white text-xs px-3 py-1 rounded">1D</button>
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-1 rounded">1W</button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={positiveChange ? "#10B981" : "#EF4444"} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={positiveChange ? "#10B981" : "#EF4444"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                  tickLine={{ stroke: '#374151' }}
                  axisLine={{ stroke: '#374151' }}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['dataMin - 100', 'dataMax + 100']}
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                  tickLine={{ stroke: '#374151' }}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={positiveChange ? "#10B981" : "#EF4444"} 
                  fillOpacity={1}
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-neutral-800 px-4">
            <div className="flex border-b border-neutral-800">
              <button 
                className={`py-3 px-4 text-sm font-medium ${activeTab === 'trades' ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400'}`}
                onClick={() => setActiveTab('trades')}
              >
                Trade History
              </button>
              <button 
                className={`py-3 px-4 text-sm font-medium ${activeTab === 'orders' ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400'}`}
                onClick={() => setActiveTab('orders')}
              >
                Open Orders
              </button>
              <button 
                className={`py-3 px-4 text-sm font-medium ${activeTab === 'positions' ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400'}`}
                onClick={() => setActiveTab('positions')}
              >
                Positions
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="flex-grow overflow-auto p-4">
            {activeTab === 'trades' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-neutral-400 text-xs uppercase">
                    <th className="pb-2 text-left">Pair</th>
                    <th className="pb-2 text-left">Type</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Amount</th>
                    <th className="pb-2 text-right">Status</th>
                    <th className="pb-2 text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeOrders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-800 hover:bg-neutral-800/30">
                      <td className="py-3">{order.pair}</td>
                      <td className={`py-3 ${order.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.type.toUpperCase()}
                      </td>
                      <td className="py-3 text-right">{formatCurrency(order.price)}</td>
                      <td className="py-3 text-right">{order.amount.toFixed(6)}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs
                          ${order.status === 'filled' ? 'bg-green-900/30 text-green-400' : 
                          order.status === 'canceled' ? 'bg-red-900/30 text-red-400' : 
                          'bg-yellow-900/30 text-yellow-400'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 text-right text-neutral-400">
                        {order.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {activeTab === 'orders' && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 mb-4">
                  <TrendingUp className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-white text-lg font-medium">No open orders</h3>
                <p className="text-neutral-400 text-sm mt-2">You don't have any open orders at the moment</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  Create Order
                </button>
              </div>
            )}
            
            {activeTab === 'positions' && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 mb-4">
                  <ChevronRight className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-white text-lg font-medium">No active positions</h3>
                <p className="text-neutral-400 text-sm mt-2">You don't have any open positions at the moment</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  Open Position
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingTerminal;