import React, { useState, useEffect } from 'react';
import { useAppContext, Order } from '../AppContext';
import { db } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, BarChart2, Settings, 
  LogOut, CheckCircle, Truck, Search, X, Copy, MessageCircle, ChevronUp, 
  ChevronDown, TrendingUp, Trophy, IndianRupee, Bell, Trash2, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';

export default function AdminView() {
  const { orders: userOrders, logout, navigate, isAdmin } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');
  const [orderTab, setOrderTab] = useState('NEW ORDERS');
  const [profitFilter, setProfitFilter] = useState('ALL TIME');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'orders'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ords: Order[] = [];
        snapshot.forEach((docSnap) => {
          ords.push({ id: docSnap.id, ...docSnap.data() } as Order);
        });
        setAllOrders(ords.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        }));
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const toggleExpand = (id: string) => {
    setExpandedOrders(prev => 
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: status
      });
    } catch (e) {
      console.error(e);
      alert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  // Status mapping
  // We'll treat:
  // 'Processing' / 'New Order' -> NEW ORDERS
  // 'Draft' -> DRAFT ORDERS
  // 'Abandoned' -> ABANDONED CARTS
  // 'Order Placed' -> ORDER PLACED
  // 'Delivered' -> DELIVERED

  const filteredOrders = allOrders.filter(o => {
    const search = searchQuery.toLowerCase();
    const matchesSearch = 
      (o.customerName && o.customerName.toLowerCase().includes(search)) ||
      (o.mobile && o.mobile.includes(search)) ||
      (o.orderNumber && o.orderNumber.toLowerCase().includes(search)) ||
      (o.productNames && o.productNames.toLowerCase().includes(search));
      
    if (!matchesSearch) return false;

    const s = o.status || 'Processing';
    if (orderTab === 'NEW ORDERS') return ['Processing', 'New Order'].includes(s);
    if (orderTab === 'DRAFT ORDERS') return s === 'Draft';
    if (orderTab === 'ABANDONED CARTS') return s === 'Abandoned';
    if (orderTab === 'ORDER PLACED') return s === 'Order Placed';
    if (orderTab === 'DELIVERED') return s === 'Delivered';
    return true;
  });

  const getCounts = () => {
    const counts = {
      'NEW ORDERS': 0,
      'DRAFT ORDERS': 0,
      'ABANDONED CARTS': 0,
      'ORDER PLACED': 0,
      'DELIVERED': 0
    };
    allOrders.forEach(o => {
      const s = o.status || 'Processing';
      if (['Processing', 'New Order'].includes(s)) counts['NEW ORDERS']++;
      else if (s === 'Draft') counts['DRAFT ORDERS']++;
      else if (s === 'Abandoned') counts['ABANDONED CARTS']++;
      else if (s === 'Order Placed') counts['ORDER PLACED']++;
      else if (s === 'Delivered') counts['DELIVERED']++;
    });
    return counts;
  };

  const orderTabs = [
    { id: 'NEW ORDERS', count: getCounts()['NEW ORDERS'] },
    { id: 'DRAFT ORDERS', count: getCounts()['DRAFT ORDERS'] },
    { id: 'ABANDONED CARTS', count: getCounts()['ABANDONED CARTS'] },
    { id: 'ORDER PLACED', count: getCounts()['ORDER PLACED'] },
    { id: 'DELIVERED', count: getCounts()['DELIVERED'] },
    { id: 'PROFIT', count: 0 }
  ];

  const renderProfitTab = () => {
    const totalRev = allOrders.filter(o => o.status !== 'Draft' && o.status !== 'Abandoned').reduce((sum, o) => sum + (o.total || 0), 0);
    const mockCost = totalRev * 0.4;
    const mockFees = totalRev * 0.02;
    const netProfit = totalRev - mockCost - mockFees;
    
    return (
      <div className="space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['TODAY', 'THIS WEEK', 'THIS MONTH', 'ALL TIME'].map(filter => (
            <button
              key={filter}
              onClick={() => setProfitFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${profitFilter === filter ? 'bg-brand-navy text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Revenue</p>
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <IndianRupee className="w-3 h-3" />
            </div>
            <p className="text-2xl font-black text-brand-navy">₹{totalRev.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Net Profit</p>
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <TrendingUp className="w-3 h-3" />
            </div>
            <p className="text-2xl font-black text-green-500">₹{netProfit.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Avg Profit</p>
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <Package className="w-3 h-3" />
            </div>
            <p className="text-2xl font-black text-brand-navy">
              ₹{allOrders.length > 0 ? Math.round(netProfit / allOrders.length) : 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Margin %</p>
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <Trophy className="w-3 h-3" />
            </div>
            <p className="text-2xl font-black text-brand-navy">
              {totalRev > 0 ? ((netProfit/totalRev)*100).toFixed(1) : 0}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold tracking-widest text-brand-navy uppercase mb-4">Profit Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
              <p className="text-base font-black text-brand-navy">₹{totalRev.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Costs</p>
              <p className="text-base font-black text-brand-navy">₹{mockCost.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Payment Fees</p>
              <p className="text-base font-black text-brand-navy">₹{mockFees.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Net Profit</p>
              <p className="text-base font-black text-green-500">₹{netProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderOrderCard = (order: Order) => {
    const isExpanded = expandedOrders.includes(order.id!);
    const isCOD = order.paymentStatus?.toLowerCase().includes('cod') || order.paymentStatus?.toLowerCase().includes('advance');
    const advancePaid = isCOD ? 50 : (order.total || 0); // Mock advance logic
    const codAmount = isCOD ? (order.total || 0) - advancePaid : 0;
    
    return (
      <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="p-4 cursor-pointer" onClick={() => toggleExpand(order.id!)}>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl shrink-0 overflow-hidden">
              {order.items && order.items[0] && order.items[0].product.image ? (
                <img src={order.items[0].product.image} className="w-full h-full object-cover" alt="Product" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-bold">Item</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-brand-navy">{order.customerName || 'Unknown Customer'}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{order.productNames || 'Product'}</p>
                </div>
                <div className="text-right flex items-center">
                  <span className="font-black text-brand-navy mr-2">₹{order.total?.toLocaleString() || 0}</span>
                </div>
              </div>
              {isCOD && <div className="text-right text-xs text-red-500 font-bold mb-2">COD: ₹{codAmount}</div>}
              
              <div className="flex justify-between items-center mt-2">
                <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">
                  {order.paymentStatus || 'Unknown'}
                </span>
                <span className="text-xs text-gray-400 flex items-center">
                  {order.dateTime} {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-4 mb-4 border border-gray-100">
              <div className="flex justify-between text-xs">
                <div>
                  <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">Payment</p>
                  <p className="text-gray-800 font-medium">{isCOD ? 'COD (Partial Advance)' : 'PREPAID'}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">Advance Paid</p>
                  <p className="text-green-600 font-black">₹{advancePaid}</p>
                </div>
                {isCOD && (
                  <div className="text-right">
                    <p className="text-gray-500 font-bold uppercase tracking-widest mb-1">To Collect (COD)</p>
                    <p className="text-red-500 font-black">₹{codAmount}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Items</p>
                {order.items?.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-800 font-medium">{item.quantity}x {item.product.name}</p>
                ))}
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2">
                  <p className="text-sm text-gray-800 font-medium">{order.mobile}</p>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(order.mobile); }} className="text-gray-400 hover:text-brand-navy"><Copy className="w-4 h-4" /></button>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Address</p>
                <div className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-2">
                  <p className="text-sm text-gray-800 flex-1 mr-4 font-medium">{order.address}</p>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(order.address); }} className="text-gray-400 hover:text-brand-navy mt-1"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {orderTab === 'NEW ORDERS' && (
                <>
                  <button onClick={() => updateOrderStatus(order.id!, 'Order Placed')} className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-black transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2" /> Move To Order Placed
                  </button>
                  <button onClick={() => alert('Order Marked as Received')} className="w-full py-3 bg-[#00C853] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Received
                  </button>
                  <button onClick={() => alert('Tracking Added')} className="w-full py-3 bg-white border border-gray-200 text-brand-navy text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Truck className="w-4 h-4 mr-2" /> Add Tracking
                  </button>
                </>
              )}
              {orderTab === 'DRAFT ORDERS' && (
                <>
                  <button onClick={() => alert('Payment Reminder Sent')} className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-black transition-colors">
                    <Bell className="w-4 h-4 mr-2" /> Payment Reminder
                  </button>
                  <button onClick={() => alert('COD Reminder Sent')} className="w-full py-3 bg-white border border-gray-200 text-brand-navy text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Bell className="w-4 h-4 mr-2" /> COD Reminder
                  </button>
                  <button onClick={() => deleteOrder(order.id!)} className="w-full py-3 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Draft
                  </button>
                </>
              )}
              {orderTab === 'ABANDONED CARTS' && (
                <>
                  <button onClick={() => alert('Reminder Sent')} className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-black transition-colors">
                    <Bell className="w-4 h-4 mr-2" /> Send Reminder
                  </button>
                  <button onClick={() => deleteOrder(order.id!)} className="w-full py-3 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Cart
                  </button>
                </>
              )}
              {orderTab === 'ORDER PLACED' && (
                <>
                  <button onClick={() => updateOrderStatus(order.id!, 'Delivered')} className="w-full py-3 bg-[#00C853] text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Delivered
                  </button>
                  <button onClick={() => updateOrderStatus(order.id!, 'Processing')} className="w-full py-3 bg-white border border-gray-200 text-brand-navy text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2" /> Move To New Orders
                  </button>
                </>
              )}
              {orderTab === 'DELIVERED' && (
                <>
                  <button onClick={() => alert('Review Request Sent')} className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-black transition-colors">
                    <MessageCircle className="w-4 h-4 mr-2" /> Request Review
                  </button>
                  <button onClick={() => alert('Reorder Reminder Sent')} className="w-full py-3 bg-white border border-gray-200 text-brand-navy text-xs font-bold rounded-xl uppercase tracking-widest flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Send Reorder Reminder
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOperations = () => (
    <div className="flex flex-col h-full bg-brand-offwhite">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 flex flex-col shrink-0 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-2xl font-black tracking-widest text-brand-navy uppercase">Operations</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders, customers, phones..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:bg-white font-medium transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 shrink-0 sticky top-[108px] z-10">
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
                  <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-brand-offwhite">
        <div className="max-w-3xl mx-auto">
          {orderTab === 'PROFIT' ? renderProfitTab() : (
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold tracking-widest uppercase text-xs">No orders found</p>
                </div>
              ) : (
                filteredOrders.map(order => renderOrderCard(order))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderUserOrders = () => (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black tracking-tight text-brand-navy mb-6">My Orders</h1>
      {userOrders.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm p-12 text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h2 className="text-lg font-bold text-brand-navy mb-2">No orders yet</h2>
          <p className="text-gray-500 text-sm">When you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
                  <p className="text-sm font-semibold text-brand-navy">{order.dateTime}</p>
                </div>
                <div className="text-right">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">
                    {order.status}
                  </span>
                </div>
              </div>
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-brand-navy">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-black text-brand-navy mt-1">₹{item.product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const tabs = isAdmin ? [
    { id: 'orders', icon: ShoppingCart, label: 'Operations' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ] : [
    { id: 'orders', icon: ShoppingCart, label: 'My Orders' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-offwhite">
      <SEO title={`${isAdmin ? 'Admin' : 'My Account'} | ZIBBO`} />
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 shrink-0 flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar flex sticky top-0 z-20">
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
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-brand-navy text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'}`}
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
               className="flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-colors text-red-500 hover:bg-red-50 mt-auto md:mt-4"
            >
               <LogOut className="w-4 h-4 mr-3 shrink-0" />
               Logout
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
         {activeTab === 'orders' ? (
           isAdmin ? renderOperations() : renderUserOrders()
         ) : (
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-300 border border-gray-100 shadow-sm">
                    <LayoutDashboard className="w-8 h-8" />
                 </div>
                 <h2 className="text-xl font-bold text-brand-navy mb-2">{tabs.find(t => t.id === activeTab)?.label}</h2>
                 <p className="text-gray-400 text-sm font-medium">This module is under development.</p>
              </div>
            </div>
         )}
      </div>
    </div>
  );
}
