import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

// Create styles with JSS - Updated to match Home's color scheme (primary green #10b981, secondary blue #3b82f6, etc.)
const useStyles = createUseStyles({
  '@global': {
    html: {
      '-webkit-text-size-adjust': '100%',
      '-ms-text-size-adjust': '100%',
      'text-size-adjust': '100%',
      'touch-action': 'manipulation',
    },
    body: {
      'touch-action': 'pan-x pan-y',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'overscroll-behavior': 'none',
    },
    '*': {
      '-webkit-tap-highlight-color': 'transparent',
    },
  },
  dashboard: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f9fafb',
    color: '#374151',
    minHeight: '100vh',
    margin: '0 auto',
    padding: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    width: '100%',
    '-webkit-overflow-scrolling': 'touch',
    'overflow-scrolling': 'touch',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#ffffff',
    color: '#374151',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem',
      padding: '0.75rem 1rem',
    },
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    flex: 1,
  },
  logoIcon: {
    fontSize: '2.5rem',
    animation: '$rotate 3s linear infinite',
    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  '@keyframes rotate': {
    'from': { transform: 'rotate(0deg)' },
    'to': { transform: 'rotate(360deg)' },
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  container: {
    padding: '2rem',
    width: '100%',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '0.5rem',
      width: '100%',
    },
  },
  alertSection: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    animation: '$pulse 3s infinite',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      padding: '1rem',
      marginBottom: '1rem',
    },
  },
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
    '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
  },
  alertContent: {
    flex: 1,
    '& h3': {
      margin: '0 0 0.5rem 0',
      color: '#856404',
      fontSize: '1.1rem',
    },
    '& p': {
      margin: 0,
      color: '#374151',
      fontSize: '0.95rem',
      opacity: 0.9,
    },
  },
  alertButton: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    minHeight: '44px',
    '&:hover': {
      backgroundColor: '#059669',
    },
    '@media (max-width: 768px)': {
      padding: '0.875rem 1.75rem',
      fontSize: '16px',
      minHeight: '44px',
      width: '100%',
    },
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      fontSize: '1.25rem',
    },
  },
  statTitle: {
    fontSize: '0.95rem',
    color: '#6b7280',
    fontWeight: 600,
    margin: 0,
  },
  statValue: {
    fontSize: '2.2rem',
    fontWeight: 800,
    margin: '0.5rem 0',
    color: '#10b981',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
    },
  },
  statTrend: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
    '&.positive': {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981',
    },
    '&.negative': {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
    },
  },
  chartSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  chartTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#10b981',
    margin: '0 0 1.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '200px',
    gap: '0.75rem',
    padding: '1rem 0',
    position: 'relative',
  },
  bar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barFill: {
    width: '100%',
    borderRadius: '6px 6px 0 0',
    transition: 'height 0.8s ease',
  },
  barLabel: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#6b7280',
    fontWeight: 500,
  },
  pieChart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    position: 'relative',
    margin: '1rem 0',
  },
  pieLegend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    '@media (max-width: 768px)': {
      fontSize: '0.85rem',
    },
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '3px',
  },
  processSection: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
      marginBottom: '1rem',
    },
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  processCard: {
    textAlign: 'center',
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-3px)',
    },
  },
  processIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    margin: '0 auto 1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  processTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#10b981',
    margin: '0 0 0.5rem 0',
  },
  processValue: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#374151',
    margin: '0 0 0.5rem 0',
  },
  zonesSection: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
      marginBottom: '1rem',
    },
  },
  zonesTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    '@media (max-width: 768px)': {
      display: 'block',
      overflowX: 'auto',
      fontSize: '14px',
    },
  },
  tableHeader: {
    backgroundColor: '#e5e7eb',
    '& th': {
      padding: '1rem',
      textAlign: 'left',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '2px solid #e5e7eb',
      fontSize: '0.9rem',
      '@media (max-width: 768px)': {
        padding: '0.75rem',
        fontSize: '0.85rem',
      },
    },
  },
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#f9fafb',
    },
    '&:hover': {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    '& td': {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '0.9rem',
      color: '#374151',
      '@media (max-width: 768px)': {
        padding: '0.75rem',
        fontSize: '0.85rem',
      },
    },
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
    '&.active': {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981',
    },
    '&.maintenance': {
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      color: '#f59e0b',
    },
    '&.full': {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
    },
  },
  progressBar: {
    width: '80px',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    display: 'inline-block',
    marginRight: '0.5rem',
    '@media (max-width: 768px)': {
      width: '60px',
    },
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
  },
  initiativesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
  initiativeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  initiativeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.5rem',
    },
  },
  initiativeIcon: {
    fontSize: '2rem',
  },
  initiativeTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#10b981',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  initiativeDesc: {
    color: '#6b7280',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
    },
  },
  initiativeProgress: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  initiativeProgressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  initiativeStats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#6b7280',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '0.25rem',
      fontSize: '0.85rem',
    },
  },
  timeFilter: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      gap: '0.25rem',
    },
  },
  filterButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
    '&.active': {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderColor: '#10b981',
    },
    '@media (max-width: 768px)': {
      padding: '0.75rem 1rem',
      fontSize: '16px',
      minHeight: '44px',
      flex: '1 1 auto',
      minWidth: '80px',
    },
  },
  impactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
  },
  impactCard: {
    textAlign: 'center',
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  impactIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  impactValue: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#10b981',
    margin: '0.5rem 0',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem',
    },
  },
  impactLabel: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: 500,
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
    },
  },
  noData: {
    textAlign: 'center',
    padding: '3rem',
    color: '#6b7280',
    fontSize: '1rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  // Enhanced Pie Chart Container
  pieChartContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '220px',
    height: 'auto',
    margin: '0 auto',
  },
  pieChartSvg: {
    transform: 'rotate(-90deg)',
  },
  pieCenterText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#10b981',
    backgroundColor: 'white',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid #f3f4f6',
  },
});

// Data for the dashboard - Updated wasteComposition colors to match theme
const initialData = {
  stats: {
    totalWaste: 12458,
    recyclingRate: 68,
    landfillReduction: 42,
    carbonOffset: 2850,
    efficiency: 92,
    activeVehicles: 47,
  },
  weeklyData: [
    { day: 'Mon', organic: 120, recyclable: 80, hazardous: 20 },
    { day: 'Tue', organic: 150, recyclable: 90, hazardous: 25 },
    { day: 'Wed', organic: 130, recyclable: 85, hazardous: 22 },
    { day: 'Thu', organic: 140, recyclable: 95, hazardous: 18 },
    { day: 'Fri', organic: 160, recyclable: 100, hazardous: 30 },
    { day: 'Sat', organic: 180, recyclable: 110, hazardous: 35 },
    { day: 'Sun', organic: 100, recyclable: 70, hazardous: 15 },
  ],
  dailyData: [
    { day: '8AM', organic: 20, recyclable: 15, hazardous: 5 },
    { day: '10AM', organic: 25, recyclable: 18, hazardous: 6 },
    { day: '12PM', organic: 30, recyclable: 20, hazardous: 8 },
    { day: '2PM', organic: 35, recyclable: 22, hazardous: 7 },
    { day: '4PM', organic: 28, recyclable: 19, hazardous: 9 },
    { day: '6PM', organic: 22, recyclable: 16, hazardous: 4 },
  ],
  monthlyData: [
    { day: 'Wk1', organic: 500, recyclable: 350, hazardous: 100 },
    { day: 'Wk2', organic: 550, recyclable: 380, hazardous: 110 },
    { day: 'Wk3', organic: 520, recyclable: 360, hazardous: 105 },
    { day: 'Wk4', organic: 580, recyclable: 400, hazardous: 120 },
  ],
  yearlyData: [
    { day: 'Q1', organic: 2000, recyclable: 1400, hazardous: 400 },
    { day: 'Q2', organic: 2200, recyclable: 1500, hazardous: 450 },
    { day: 'Q3', organic: 2100, recyclable: 1450, hazardous: 420 },
    { day: 'Q4', organic: 2300, recyclable: 1600, hazardous: 480 },
  ],
  wasteComposition: [
    { type: 'Organic', percentage: 45, color: '#10b981' },
    { type: 'Recyclable', percentage: 30, color: '#3b82f6' },
    { type: 'Hazardous', percentage: 10, color: '#ef4444' },
    { type: 'Other', percentage: 15, color: '#8b5cf6' },
  ],
  collectionZones: [
    { id: 1, zone: 'Downtown', status: 'active', fillLevel: 85, priority: 'High', nextCollection: 'Tomorrow 10:00 AM' },
    { id: 2, zone: 'North District', status: 'active', fillLevel: 45, priority: 'Low', nextCollection: 'Tomorrow 9:00 AM' },
    { id: 3, zone: 'Eastside', status: 'maintenance', fillLevel: 20, priority: 'Medium', nextCollection: 'June 15' },
    { id: 4, zone: 'Westgate', status: 'active', fillLevel: 78, priority: 'High', nextCollection: 'Tomorrow 8:30 AM' },
    { id: 5, zone: 'South Corridor', status: 'active', fillLevel: 60, priority: 'Medium', nextCollection: 'Tomorrow 11:00 AM' },
  ],
  initiatives: [
    {
      id: 1,
      title: 'Smart Bin Deployment',
      description: 'Installing IoT-enabled smart bins for real-time monitoring and optimized collection routes.',
      icon: '📡',
      progress: 65,
      impact: 'Reduces collection costs by 30%'
    },
    {
      id: 2,
      title: 'Community Composting',
      description: 'Establishing neighborhood composting centers to convert organic waste into fertilizer.',
      icon: '🌱',
      progress: 40,
      impact: 'Diverts 15 tons/month from landfills'
    },
    {
      id: 3,
      title: 'E-Waste Recycling',
      description: 'Quarterly collection events for electronics with certified data destruction.',
      icon: '💻',
      progress: 85,
      impact: 'Processed 2,400 devices this year'
    },
  ],
  environmentalImpact: {
    treesSaved: 2850,
    waterSaved: 4200000,
    energySaved: 18500,
    emissionsPrevented: 12400,
  }
};

// Custom Bar Chart Component - Updated colors to match theme
const BarChart = ({ data, colors }) => {
  const maxValue = Math.max(...data.map(item =>
    item.organic + item.recyclable + item.hazardous
  ));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '5px', padding: '10px 0', '@media (max-width: 768px)': { height: '180px', gap: '3px' } }}>
      {data.map((item, index) => {
        const total = item.organic + item.recyclable + item.hazardous;
        const organicHeight = (item.organic / maxValue) * 100;
        const recyclableHeight = (item.recyclable / maxValue) * 100;
        const hazardousHeight = (item.hazardous / maxValue) * 100;
      
        return (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '150px', justifyContent: 'flex-end', width: '100%', '@media (max-width: 768px)': { height: '130px' } }}>
              <div
                style={{
                  height: `${hazardousHeight}%`,
                  backgroundColor: colors.hazardous,
                  width: '100%',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <div
                style={{
                  height: `${recyclableHeight}%`,
                  backgroundColor: colors.recyclable,
                  width: '100%',
                }}
              />
              <div
                style={{
                  height: `${organicHeight}%`,
                  backgroundColor: colors.organic,
                  width: '100%',
                  borderRadius: '0 0 4px 4px',
                }}
              />
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#6b7280', '@media (max-width: 768px)': { fontSize: '0.75rem' } }}>{item.day}</div>
          </div>
        );
      })}
    </div>
  );
};

// Enhanced Custom Pie Chart Component with proper spacing
const EnhancedPieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  let cumulativeAngle = 0;
 
  // Create gradient effect for the chart
  const createGradient = (id, color) => {
    return (
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </linearGradient>
    );
  };
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '220px', height: '220px', margin: '0 auto' }}>
      <svg width="100%" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          {createGradient('gradient-organic', '#10b981')}
          {createGradient('gradient-recyclable', '#3b82f6')}
          {createGradient('gradient-hazardous', '#ef4444')}
          {createGradient('gradient-other', '#8b5cf6')}
        </defs>
       
        {/* Outer circle with shadow */}
        <circle cx="110" cy="110" r="98" fill="none" stroke="#f3f4f6" strokeWidth="1" />
       
        {data.map((item, index) => {
          const angle = (item.percentage / total) * 360;
          const startAngle = cumulativeAngle;
          cumulativeAngle += angle;
        
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + angle) * Math.PI) / 180;
        
          const largeArc = angle > 180 ? 1 : 0;
         
          // Outer arc (main pie slice)
          const x1 = 110 + 98 * Math.cos(startRad);
          const y1 = 110 + 98 * Math.sin(startRad);
          const x2 = 110 + 98 * Math.cos(endRad);
          const y2 = 110 + 98 * Math.sin(endRad);
         
          // Inner arc (for donut effect)
          const innerRadius = 40;
          const x3 = 110 + innerRadius * Math.cos(endRad);
          const y3 = 110 + innerRadius * Math.sin(endRad);
          const x4 = 110 + innerRadius * Math.cos(startRad);
          const y4 = 110 + innerRadius * Math.sin(startRad);
          const gradientId = `gradient-${item.type.toLowerCase()}`;
         
          return (
            <g key={index}>
              <path
                d={`M ${x1} ${y1}
                    A 98 98 0 ${largeArc} 1 ${x2} ${y2}
                    L ${x3} ${y3}
                    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                    Z`}
                fill={`url(#${gradientId})`}
                stroke="white"
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease' }}
              />
             
              {/* Percentage label */}
              {angle > 10 && (
                <text
                  x={110 + 70 * Math.cos(startRad + angle / 2 * Math.PI / 180)}
                  y={110 + 70 * Math.sin(startRad + angle / 2 * Math.PI / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  style={{ transform: 'rotate(90deg)', transformOrigin: `${110 + 70 * Math.cos(startRad + angle / 2 * Math.PI / 180)}px ${110 + 70 * Math.sin(startRad + angle / 2 * Math.PI / 180)}px` }}
                >
                  {item.percentage}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
     
      {/* Center text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#10b981',
        backgroundColor: 'white',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #f3f4f6',
      }}>
        Waste
        <br />
        Split
      </div>
    </div>
  );
};

// Alternative Pie Chart with better spacing
const ModernPieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  const radius = 90;
  const centerX = 110;
  const centerY = 110;
  const gap = 2; // Gap between slices in degrees
 
  let cumulativeAngle = 0;
 
  const slices = data.map((item, index) => {
    const angle = (item.percentage / total) * (360 - data.length * gap);
    const startAngle = cumulativeAngle + (index * gap);
    const endAngle = startAngle + angle;
    cumulativeAngle += angle;
   
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
   
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
   
    const largeArc = angle > 180 ? 1 : 0;
   
    return {
      path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color,
      percentage: item.percentage,
      type: item.type,
      midAngle: startAngle + angle / 2,
    };
  });
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '220px', height: '220px', margin: '0 auto' }}>
      <svg width="100%" height="220" viewBox="0 0 220 220">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(0,0,0,0.1)" />
          </filter>
        </defs>
       
        {/* Background circle */}
        <circle cx="110" cy="110" r="95" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" />
       
        {slices.map((slice, index) => (
          <g key={index} filter="url(#shadow)">
            <path
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
              style={{ transition: 'transform 0.3s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.transformOrigin = 'center';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
           
            {/* Percentage label */}
            {slice.percentage > 8 && (
              <text
                x={110 + 50 * Math.cos((slice.midAngle * Math.PI) / 180)}
                y={110 + 50 * Math.sin((slice.midAngle * Math.PI) / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              >
                {slice.percentage}%
              </text>
            )}
          </g>
        ))}
       
        {/* Center circle */}
        <circle cx="110" cy="110" r="40" fill="white" stroke="#f3f4f6" strokeWidth="2" />
      </svg>
     
      {/* Center text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#10b981',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{ fontSize: '1rem', fontWeight: '800' }}>100%</div>
        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [alertVisible, setAlertVisible] = useState(true);
  const [selectedZone, setSelectedZone] = useState(null);
  const [currentTime, setCurrentTime] = useState('7:00:00 PM');
  const [alertMessage, setAlertMessage] = useState({
    title: 'Predicted Overflow',
    desc: 'Eastside zone projected to reach 90% capacity in 4 hours. Preemptive dispatch recommended.'
  });
  const [pieChartType, setPieChartType] = useState('modern'); // 'modern' or 'enhanced'

  // Add viewport meta tag dynamically for mobile zoom fix
  useEffect(() => {
    // Set viewport meta tag to prevent mobile zoom issues
    const setViewportMeta = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
      }
      
      // Prevent initial zoom on mobile
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, shrink-to-fit=no';
    };

    setViewportMeta();
    
    // Also add touch-action to prevent pull-to-refresh on mobile
    document.body.style.touchAction = 'pan-x pan-y';
    
    return () => {
      // Cleanup if needed
      document.body.style.touchAction = '';
    };
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalWaste: prev.stats.totalWaste + Math.floor(Math.random() * 10),
          recyclingRate: Math.min(95, prev.stats.recyclingRate + (Math.random() > 0.5 ? 0.1 : -0.1)),
        }
      }));
    }, 5000);
   
    // Dynamic alert updates - future-oriented
    const alertInterval = setInterval(() => {
      const futureAlerts = [
        { title: 'Predicted Overflow', desc: 'Eastside zone projected to reach 90% capacity in 4 hours. Preemptive dispatch recommended.' },
        { title: 'Efficiency Forecast', desc: 'Route optimization AI predicts 15% fuel savings next week based on current trends.' },
        { title: 'Sustainability Milestone', desc: 'On track to divert 500 tons from landfill by end of Q4 2025.' },
        { title: 'Maintenance Reminder', desc: 'North District sensors due for calibration in 48 hours to maintain accuracy.' },
      ];
      const randomAlert = futureAlerts[Math.floor(Math.random() * futureAlerts.length)];
      setAlertMessage(randomAlert);
    }, 30000); // Update every 30 seconds for dynamic feel
   
    // Running time update
    const timeInterval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    }, 1000);
   
    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleZoneClick = (zoneId) => {
    setSelectedZone(zoneId);
    // In a real app, this would navigate to zone details or show a modal
    console.log(`Zone ${zoneId} selected`);
  };

  const handleAlertDismiss = () => {
    setAlertVisible(false);
  };

  const handleTimeFilter = (filter) => {
    setTimeFilter(filter);
    // Make some difference: Switch chart data based on filter
    let filteredChartData;
    let updatedStats = { ...data.stats };
    switch (filter) {
      case 'daily':
        filteredChartData = initialData.dailyData;
        updatedStats = {
          ...updatedStats,
          totalWaste: 250,
          recyclingRate: 72,
          efficiency: 88,
          activeVehicles: 12,
        };
        break;
      case 'weekly':
        filteredChartData = initialData.weeklyData;
        updatedStats = {
          ...updatedStats,
          totalWaste: 12458,
          recyclingRate: 68,
          efficiency: 92,
          activeVehicles: 47,
        };
        break;
      case 'monthly':
        filteredChartData = initialData.monthlyData;
        updatedStats = {
          ...updatedStats,
          totalWaste: 21500,
          recyclingRate: 70,
          efficiency: 90,
          activeVehicles: 45,
        };
        break;
      case 'yearly':
        filteredChartData = initialData.yearlyData;
        updatedStats = {
          ...updatedStats,
          totalWaste: 86200,
          recyclingRate: 65,
          efficiency: 89,
          activeVehicles: 50,
        };
        break;
      default:
        filteredChartData = initialData.weeklyData;
    }
    setData(prev => ({
      ...prev,
      weeklyData: filteredChartData,
      stats: updatedStats
    }));
    // In a real app, this would fetch new data based on the filter
    console.log(`Time filter changed to: ${filter}`);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getFillLevelColor = (level) => {
    if (level >= 80) return '#ef4444';
    if (level >= 60) return '#f59e0b';
    return '#10b981';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const chartData = data.weeklyData; // Use the updated data from filter

  return (
    <div className={classes.dashboard}>
      {/* Top Bar */}
      <div className={classes.topBar}>
        <div className={classes.logoSection}>
          <div className={classes.logoIcon}>♻️</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#10b981', '@media (max-width: 768px)': { fontSize: '1.25rem' } }}>Eco Impact Overview</h1>
           
          </div>
        </div>
        <div className={classes.dateSection}>
          <span>🕐</span>
          <span>{currentTime}</span>
        </div>
      </div>
      <div className={classes.container}>
        {/* Alert Banner */}
        {alertVisible && (
          <div className={classes.alertSection}>
            <div style={{ fontSize: '1.5rem' }}>⚠️</div>
            <div className={classes.alertContent}>
              <h3>{alertMessage.title}</h3>
              <p>{alertMessage.desc}</p>
            </div>
            <button className={classes.alertButton} onClick={handleAlertDismiss}>
              Dismiss Alert
            </button>
          </div>
        )}
        {/* Time Filter */}
        <div className={classes.timeFilter}>
          <button
            className={`${classes.filterButton} ${timeFilter === 'daily' ? 'active' : ''}`}
            onClick={() => handleTimeFilter('daily')}
          >
            Daily
          </button>
          <button
            className={`${classes.filterButton} ${timeFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => handleTimeFilter('weekly')}
          >
            Weekly
          </button>
          <button
            className={`${classes.filterButton} ${timeFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => handleTimeFilter('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${classes.filterButton} ${timeFilter === 'yearly' ? 'active' : ''}`}
            onClick={() => handleTimeFilter('yearly')}
          >
            Yearly
          </button>
        </div>
        {/* Main Statistics Grid */}
        <div className={classes.mainGrid}>
          <div className={classes.statCard}>
            <div className={classes.statHeader}>
              <h3 className={classes.statTitle}>Total Waste Processed</h3>
              <div className={classes.statIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                📊
              </div>
            </div>
            <div className={classes.statValue}>{formatNumber(data.stats.totalWaste)} kg</div>
            <div>
              <span className={`${classes.statTrend} positive`}>↑ 12.5%</span>
              <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                from last month
              </span>
            </div>
          </div>
          <div className={classes.statCard}>
            <div className={classes.statHeader}>
              <h3 className={classes.statTitle}>Recycling Rate</h3>
              <div className={classes.statIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                ♻️
              </div>
            </div>
            <div className={classes.statValue}>{data.stats.recyclingRate.toFixed(1)}%</div>
            <div>
              <span className={`${classes.statTrend} positive`}>↑ 8.2%</span>
              <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                exceeds target
              </span>
            </div>
          </div>
          <div className={classes.statCard}>
            <div className={classes.statHeader}>
              <h3 className={classes.statTitle}>Collection Efficiency</h3>
              <div className={classes.statIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                ⚡
              </div>
            </div>
            <div className={classes.statValue}>{data.stats.efficiency}%</div>
            <div>
              <span className={`${classes.statTrend} positive`}>↑ 3.1%</span>
              <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                optimal performance
              </span>
            </div>
          </div>
          <div className={classes.statCard}>
            <div className={classes.statHeader}>
              <h3 className={classes.statTitle}>Active Vehicles</h3>
              <div className={classes.statIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                🚛
              </div>
            </div>
            <div className={classes.statValue}>{data.stats.activeVehicles}</div>
            <div>
              <span className={`${classes.statTrend} positive`}>↑ 5.3%</span>
              <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                on duty
              </span>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className={classes.chartSection}>
          <div className={classes.chartCard}>
            <h3 className={classes.chartTitle}>📈 {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)} Waste Collection</h3>
            <BarChart
              data={chartData}
              colors={{ organic: '#10b981', recyclable: '#3b82f6', hazardous: '#ef4444' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.85rem', color: '#374151' }}>Organic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.85rem', color: '#374151' }}>Recyclable</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.85rem', color: '#374151' }}>Hazardous</span>
              </div>
            </div>
          </div>
          <div className={classes.chartCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 className={classes.chartTitle}>🥧 Waste Composition</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`${classes.filterButton} ${pieChartType === 'modern' ? 'active' : ''}`}
                  onClick={() => setPieChartType('modern')}
                  style={{ padding: '0.3rem 0.7rem', fontSize: '16px' }}
                >
                  Modern
                </button>
                <button
                  className={`${classes.filterButton} ${pieChartType === 'enhanced' ? 'active' : ''}`}
                  onClick={() => setPieChartType('enhanced')}
                  style={{ padding: '0.3rem 0.7rem', fontSize: '16px' }}
                >
                  Enhanced
                </button>
              </div>
            </div>
           
            {pieChartType === 'modern' ? (
              <ModernPieChart data={data.wasteComposition} />
            ) : (
              <EnhancedPieChart data={data.wasteComposition} />
            )}
           
            <div className={classes.pieLegend}>
              {data.wasteComposition.map((item, index) => (
                <div key={index} className={classes.legendItem} style={{ color: '#374151' }}>
                  <div className={classes.legendColor} style={{ backgroundColor: item.color }}></div>
                  <span>{item.type}: {item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Collection Zones */}
        <div className={classes.zonesSection}>
          <h3 className={classes.chartTitle}>🗺️ Collection Zones Status</h3>
          <div className={classes.tableContainer}>
            <table className={classes.zonesTable}>
              <thead className={classes.tableHeader}>
                <tr>
                  <th>Zone</th>
                  <th>Status</th>
                  <th>Fill Level</th>
                  <th>Priority</th>
                  <th>Next Collection</th>
                </tr>
              </thead>
              <tbody>
                {data.collectionZones.map((zone) => (
                  <tr
                    key={zone.id}
                    className={classes.tableRow}
                    onClick={() => handleZoneClick(zone.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ fontWeight: 600 }}>{zone.zone}</td>
                    <td>
                      <span className={`${classes.statusBadge} ${zone.status}`}>
                        {zone.status === 'active' && '🟢'}
                        {zone.status === 'maintenance' && '🟡'}
                        {zone.status === 'full' && '🔴'}
                        {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className={classes.progressBar}>
                          <div
                            className={classes.progressFill}
                            style={{
                              width: `${zone.fillLevel}%`,
                              backgroundColor: getFillLevelColor(zone.fillLevel)
                            }}
                          ></div>
                        </div>
                        <span style={{ fontWeight: 600 }}>{zone.fillLevel}%</span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: `${getPriorityColor(zone.priority)}20`,
                        color: getPriorityColor(zone.priority),
                      }}>
                        {zone.priority}
                      </span>
                    </td>
                    <td>{zone.nextCollection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Sustainability Initiatives */}
        <div className={classes.processSection}>
          <h3 className={classes.chartTitle}>🌟 Sustainability Initiatives</h3>
          <div className={classes.initiativesGrid}>
            {data.initiatives.map((initiative) => (
              <div key={initiative.id} className={classes.initiativeCard}>
                <div className={classes.initiativeHeader}>
                  <div className={classes.initiativeIcon}>{initiative.icon}</div>
                  <h4 className={classes.initiativeTitle}>{initiative.title}</h4>
                </div>
                <p className={classes.initiativeDesc}>{initiative.description}</p>
                <div className={classes.initiativeProgress}>
                  <div
                    className={classes.initiativeProgressFill}
                    style={{
                      width: `${initiative.progress}%`,
                      backgroundColor: '#10b981'
                    }}
                  ></div>
                </div>
                <div className={classes.initiativeStats}>
                  <span>Progress: {initiative.progress}%</span>
                  <span style={{ fontWeight: 600, color: '#10b981' }}>{initiative.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Environmental Impact */}
        <div className={classes.processSection}>
          <h3 className={classes.chartTitle}>🌍 Environmental Impact</h3>
          <div className={classes.impactGrid}>
            <div className={classes.impactCard}>
              <div className={classes.impactIcon}>🌳</div>
              <div className={classes.impactValue}>{formatNumber(data.environmentalImpact.treesSaved)}</div>
              <div className={classes.impactLabel}>Trees Equivalent Saved</div>
            </div>
          
            <div className={classes.impactCard}>
              <div className={classes.impactIcon}>💧</div>
              <div className={classes.impactValue}>{formatNumber(data.environmentalImpact.waterSaved)} L</div>
              <div className={classes.impactLabel}>Water Conserved</div>
            </div>
          
            <div className={classes.impactCard}>
              <div className={classes.impactIcon}>⚡</div>
              <div className={classes.impactValue}>{formatNumber(data.environmentalImpact.energySaved)} kWh</div>
              <div className={classes.impactLabel}>Energy Generated</div>
            </div>
          
            <div className={classes.impactCard}>
              <div className={classes.impactIcon}>☁️</div>
              <div className={classes.impactValue}>{formatNumber(data.environmentalImpact.emissionsPrevented)} tons</div>
              <div className={classes.impactLabel}>CO₂ Prevented</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;