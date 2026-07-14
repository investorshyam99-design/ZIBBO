import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { LayoutDashboard, ShoppingCart, Users, Package, Archive, Layers, Tag, BarChart2, Settings } from 'lucide-react';

export default function AdminView() {
  const { orders } = useAppContext();
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'inventory', icon: Archive, label: 'Inventory' },
    { id: 'collections', icon: Layers, label: 'Collections' },
    { id: 'coupons', icon: Tag, label: 'Coupons' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-offwhite pb-20 md:pb-0">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar">
         <div className="p-6 hidden md:block border-b border-gray-100">
             <h2 className="font-black text-xl text-brand-navy tracking-tight">Admin Portal</h2>
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
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
         {activeTab === 'orders' ? (
            <div>
               <h1 className="text-2xl font-black tracking-tight text-brand-navy mb-6">Recent Orders</h1>
               
               <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                           <tr>
                              <th className="px-6 py-4">Order</th>
                              <th className="px-6 py-4">Date</th>
                              <th className="px-6 py-4">Customer</th>
                              <th className="px-6 py-4">Product(s)</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4">Payment</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                           {orders.length === 0 ? (
                              <tr>
                                 <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">No orders found. Place an order to see it here.</td>
                              </tr>
                           ) : (
                              orders.map((order, i) => (
                                 <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-brand-navy whitespace-nowrap">{order.orderNumber}</td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-xs">{order.dateTime}</td>
                                    <td className="px-6 py-4">
                                       <div className="font-semibold text-brand-navy">{order.customerName}</div>
                                       <div className="text-xs text-gray-500 mt-1">{order.mobile}</div>
                                       <div className="text-xs text-gray-400 mt-1 max-w-[200px] truncate" title={order.address}>{order.address}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className="text-brand-navy font-semibold text-xs max-w-[250px] truncate" title={order.productNames}>{order.productNames}</div>
                                       <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Qty: {order.quantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{order.orderStatus}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{order.paymentStatus}</span>
                                    </td>
                                 </tr>
                              ))
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
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
