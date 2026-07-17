import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { LayoutDashboard, ShoppingCart, Users, Package, BarChart2, Settings, LogOut, CheckCircle, Truck, MapPin, Search, X, Edit2, Copy, MessageCircle, ChevronUp, Zap, TrendingUp, Trophy, FileText, IndianRupee, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

export default function AdminView() {
  const { orders, logout, navigate, isAdmin } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  const [orderTab, setOrderTab] = useState('NEW ORDERS');
  const [profitFilter, setProfitFilter] = useState('ALL TIME');
  const [isOperationsOpen, setIsOperationsOpen] = useState(true);

  const tabs = isAdmin ? [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: ShoppingCart, label: 'My Orders' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'profit', icon: BarChart2, label: 'Profit' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ] : [
    { id: 'orders', icon: ShoppingCart, label: 'My Orders' }
  ];

  const orderTabs = [
    { id: 'NEW ORDERS', count: 2 },
    { id: 'DRAFT ORDERS', count: 71 },
    { id: 'ABANDONED CARTS', count: 0 },
    { id: 'ORDER PLACED', count: 0 },
    { id: 'DELIVERED', count: 0 },
    { id: 'MY PROFITS', count: 0 }
  ];

  const renderProfitTab = () => (
    <div className="space-y-6">
      {/* Time Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['TODAY', 'THIS WEEK', 'THIS MONTH', 'ALL TIME'].map(filter => (
          <button
            key={filter}
            onClick={() => setProfitFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${profitFilter === filter ? 'bg-[#1a2138] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Revenue</p>
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <IndianRupee className="w-3 h-3" />
          </div>
          <p className="text-2xl font-black text-brand-navy">₹79,414</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Net Profit</p>
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <TrendingUp className="w-3 h-3" />
          </div>
          <p className="text-2xl font-black text-green-500">₹39,844</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Avg Profit</p>
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
            <Package className="w-3 h-3" />
          </div>
          <p className="text-2xl font-black text-brand-navy">₹183</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Margin %</p>
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <Trophy className="w-3 h-3" />
          </div>
          <p className="text-2xl font-black text-brand-navy">50.2%</p>
        </div>
      </div>

      {/* Profit Analytics Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold tracking-widest text-brand-navy uppercase mb-4">Profit Analytics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-base font-black text-brand-navy">₹79,414</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Costs</p>
            <p className="text-base font-black text-brand-navy">₹38,762</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Razorpay Fees</p>
            <p className="text-base font-black text-brand-navy">₹808</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Net Profit</p>
            <p className="text-base font-black text-green-500">₹39,844</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Best Selling Product:</p>
          <p className="text-sm font-bold text-brand-navy truncate ml-2 max-w-[150px]">Spain 2026 World Cup Away Jersey ...</p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Manual Adjustments (Filtered Period)</p>
            <button className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest">
              <Edit2 className="w-3 h-3 mr-1" /> Edit Totals
            </button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Manual Revenue:</p>
              <p className="text-sm font-black text-green-500">+₹5,350</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Manual Cost:</p>
              <p className="text-sm font-black text-red-500">+₹6,164</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Profit List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-lg shrink-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-brand-navy text-sm">Toshiba Shrivastava</h3>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">Argentina Messi 10 Dark Blue Acidwash Unisex Ove</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">Prepaid (Full)</span>
              <span className="bg-yellow-50 text-yellow-600 text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">Order Placed</span>
            </div>
            <div className="mt-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Net Profit</p>
              <p className="text-sm font-black text-red-500">₹-0</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Order Amount</p>
              <p className="text-sm font-bold text-brand-navy">₹1,499</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Product Cost</p>
              <p className="text-sm font-bold text-red-500">-₹1,464</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Shipping Cost</p>
              <p className="text-sm font-bold text-red-500">-₹0</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Additional Cost</p>
              <p className="text-sm font-bold text-red-500">-₹0</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Razorpay Fee</p>
              <p className="text-sm font-bold text-red-500">-₹35</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white border border-gray-200 text-brand-navy text-xs font-bold rounded-lg uppercase tracking-widest">
            Edit Costs
          </button>
        </div>
      </div>
    </div>
  );

  const renderNewOrdersTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl shrink-0 flex items-center justify-center">
              <span className="text-xs text-gray-400 font-bold">Product</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-brand-navy">Abhyudaya Verma</h3>
                  <p className="text-xs text-gray-500 mt-1">Argentina Away 2026 Set (Fan Version)</p>
                </div>
                <div className="text-right flex items-center">
                  <span className="font-black text-brand-navy mr-2">₹999</span>
                  <Edit2 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              <div className="text-right text-xs text-red-500 font-bold mb-2">COD: ₹899</div>
              
              <div className="flex justify-between items-center">
                <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">Advance Paid</span>
                <span className="text-xs text-gray-400 flex items-center">
                  Jun 12, 10:00 PM <ChevronUp className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 bg-gray-50/50 rounded-xl p-4 space-y-4">
            <div className="flex justify-between text-xs">
              <div>
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">Payment</p>
                <p className="text-gray-600">ADVANCE PAID (PARTIAL)</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">Paid</p>
                <p className="text-green-600 font-black">₹150</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">To Collect (COD)</p>
                <p className="text-red-500 font-black">₹899</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Items</p>
              <p className="text-sm text-gray-800">1x Size: M</p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Customization</p>
              <p className="text-sm text-gray-800">None</p>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone</p>
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2">
                <p className="text-sm text-gray-800">9454659840</p>
                <button className="text-gray-400 hover:text-brand-navy"><Copy className="w-4 h-4" /></button>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Address</p>
              <div className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-2">
                <p className="text-sm text-gray-800 flex-1 mr-4">Villa 319, Eldeco Regalia, Lucknow, Uttar Pradesh, Pincode: 226020</p>
                <button className="text-gray-400 hover:text-brand-navy mt-1"><Copy className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 space-y-2 md:space-y-0">
            <button className="w-full py-3 bg-[#FF4500] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
              <Zap className="w-4 h-4 mr-2" fill="currentColor" /> Fulfill With Qikink
            </button>
            <button className="w-full py-3 bg-[#1a2138] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
              <CheckCircle className="w-4 h-4 mr-2" /> Fampay
            </button>
            <button className="w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
              <CheckCircle className="w-4 h-4 mr-2" /> Move To Order Placed
            </button>
            <button className="w-full py-3 bg-[#00C853] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
              <MessageCircle className="w-4 h-4 mr-2" /> Order Received
            </button>
            <button className="w-full py-3 bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-blue-100 transition-colors">
              <Truck className="w-4 h-4 mr-2" /> Add Tracking
            </button>
            <button className="w-full py-3 bg-[#1a2138] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
              <CheckCircle className="w-4 h-4 mr-2" /> Mark Delivered
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationsMobile = () => (
    <div className="fixed inset-0 z-50 bg-brand-offwhite flex flex-col md:relative md:bg-transparent md:h-auto overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 md:px-0 md:py-0 md:bg-transparent md:mb-6 flex flex-col shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-black tracking-widest text-brand-navy uppercase">Operations</h1>
          <button className="md:hidden p-2 text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white md:bg-transparent border-b border-gray-200 shrink-0">
        <div className="flex overflow-x-auto no-scrollbar">
          {orderTabs.map(tab => {
            const isActive = orderTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setOrderTab(tab.id)}
                className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${isActive ? 'border-brand-navy text-brand-navy' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">{tab.id}</span>
                {tab.count > 0 && (
                  <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 md:bg-transparent md:p-0 md:pt-6">
        <div className="max-w-xl mx-auto md:max-w-none">
          {orderTab === 'MY PROFITS' ? renderProfitTab() : renderNewOrdersTab()}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#1a2138] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform z-50">
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );

  const renderOrders = () => {
    if (!isAdmin) {
      return (
        <div>
          <h1 className="text-2xl font-black tracking-tight text-brand-navy mb-6">My Orders</h1>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm p-6 text-center text-gray-500">
            {orders.length === 0 ? "You haven't placed any orders yet." : "Order history will appear here."}
          </div>
        </div>
      );
    }
    return renderOperationsMobile();
  };

  const renderAnalytics = () => (
    <div>
      <h1 className="text-2xl font-black tracking-tight text-brand-navy mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Visitors', value: '12,482' },
          { label: 'Active Visitors', value: '34' },
          { label: 'Logged-in Users', value: '1,240' },
          { label: 'Average Time', value: '4m 12s' },
          { label: 'Time Per Visitor', value: '2m 30s' },
          { label: 'Returning', value: '42%' },
          { label: 'Conversion Rate', value: '3.8%' },
          { label: 'Device Type', value: 'Mobile 78%' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black text-brand-navy mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-offwhite pb-20 md:pb-0">
      <SEO title={`${isAdmin ? 'Admin' : 'My Account'} | ZIBBO`} />
      
      {/* Sidebar - hidden on mobile when operations is open */}
      <div className={`w-full md:w-64 bg-white border-r border-gray-100 shrink-0 flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar ${isAdmin && activeTab === 'orders' ? 'hidden md:flex' : 'flex'}`}>
         <div className="p-6 hidden md:block border-b border-gray-100">
             <h2 className="font-black text-xl text-brand-navy tracking-tight">{isAdmin ? 'Admin Portal' : 'My Account'}</h2>
         </div>
         <div className="flex md:flex-col p-2 md:p-4 gap-1 min-w-max md:min-w-0">
            {tabs.map(tab => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                   <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-brand-navy text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
                   >
                      <Icon className="w-4 h-4 mr-3 shrink-0" />
                      {tab.label}
                   </button>
               )
            })}
            <button
               onClick={() => {
                  logout();
                  navigate('home');
               }}
               className="flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-red-500 hover:bg-red-50 mt-auto md:mt-4"
            >
               <LogOut className="w-4 h-4 mr-3 shrink-0" />
               Logout
            </button>
         </div>
      </div>

      {/* Content */}
      <div className={`flex-1 md:p-8 overflow-y-auto ${isAdmin && activeTab === 'orders' ? 'p-0' : 'p-4'}`}>
         {activeTab === 'orders' ? renderOrders() : 
          activeTab === 'analytics' ? renderAnalytics() : 
         (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300 border border-gray-100">
                  <LayoutDashboard className="w-8 h-8" />
               </div>
               <h2 className="text-xl font-bold text-brand-navy mb-2">{tabs.find(t => t.id === activeTab)?.label}</h2>
               <p className="text-gray-400 text-sm">This module is under development.</p>
            </div>
         )}
      </div>
    </div>
  );
}
