import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Col, Row } from 'antd';

// Motion variants for stagger effects
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => {
  const isPositive = trend === 'up';
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
          <Icon className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors duration-300" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trendValue}
        </div>
        <span className="text-sm text-slate-500 ml-2">vs dernier mois</span>
      </div>
      
      {/* Subtle background glow effect on hover */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
    </motion.div>
  );
};

// Données financières spécifiques à une agence de location de voitures (Saisonnalité été très marquée)
// Revenus : Argent généré par la location des véhicules
// Charges : Frais d'entretien, réparations, vidanges, assurances
const revenueData = [
  { name: 'Jan', revenus: 45000, charges: 12000 },
  { name: 'Fév', revenus: 42000, charges: 11000 },
  { name: 'Mar', revenus: 55000, charges: 15000 },
  { name: 'Avr', revenus: 68000, charges: 18000 },
  { name: 'Mai', revenus: 85000, charges: 22000 },
  { name: 'Juin', revenus: 120000, charges: 28000 },
  { name: 'Juil', revenus: 180000, charges: 35000 },
  { name: 'Août', revenus: 195000, charges: 40000 },
  { name: 'Sep', revenus: 110000, charges: 25000 },
  { name: 'Oct', revenus: 70000, charges: 18000 },
  { name: 'Nov', revenus: 50000, charges: 14000 },
  { name: 'Déc', revenus: 85000, charges: 20000 }, // Petit pic pour les fêtes de fin d'année
];

export default function Dashboard() {
  const today = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date());

  return (
    <div className="pb-10 pt-2 px-2 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Vue d'ensemble
          </h1>
          <p className="text-slate-500 capitalize flex items-center">
            <Activity className="w-4 h-4 mr-2 text-blue-500" />
            {today}
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:bg-slate-800 transition-colors flex items-center"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Générer le rapport
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard 
          title="Revenu Total" 
          value="124 500 DH" 
          icon={CreditCard} 
          trend="up" 
          trendValue="12.5%" 
        />
        <StatCard 
          title="Factures en attente" 
          value="45" 
          icon={FileText} 
          trend="down" 
          trendValue="3.2%" 
        />
        <StatCard 
          title="Nouveaux Clients" 
          value="128" 
          icon={Users} 
          trend="up" 
          trendValue="24.8%" 
        />
        <StatCard 
          title="Taux de Conversion" 
          value="64.2%" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="4.1%" 
        />
      </motion.div>

      {/* Main Content Area (Charts / Tables placeholders) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Rentabilité de la Flotte Auto (Revenus vs Entretien)
            </h3>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Année 2026
            </span>
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCharges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(val) => `${val/1000}k`} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  formatter={(value, name) => [`${value.toLocaleString()} MAD`, name === 'revenus' ? 'Revenus Locations' : "Charges (Entretien & Assurances)"]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                <Area type="monotone" name="revenus" dataKey="revenus" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenus)" />
                <Area type="monotone" name="charges" dataKey="charges" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCharges)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Activité Récente</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-4" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Nouvelle facture payée</p>
                  <p className="text-xs text-slate-500 mt-1">Il y a {i * 2} heures</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
