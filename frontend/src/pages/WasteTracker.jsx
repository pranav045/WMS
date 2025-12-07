// pages/WasteTracker.js (FIXED VISIBILITY ISSUES)
import React, { useState, useEffect,useRef} from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const wasteAPI = {
  saveEntry: async (entry) => axios.post(`${API_BASE}/waste/entries`, entry),
  getUserEntries: async () => axios.get(`${API_BASE}/waste/entries`),
  deleteEntry: async (entryId) => axios.delete(`${API_BASE}/waste/entries/${entryId}`),
  updateEntry: async (entryId, updates) => axios.put(`${API_BASE}/waste/entries/${entryId}`, updates),
};

const useStyles = createUseStyles({
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#1f2937',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    '@media (min-width: 768px)': {
      padding: '2rem',
    },
  },
  heroText: {
    textAlign: 'center',
    marginBottom: '2rem',
    '& h1': {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#10b981',
      marginBottom: '0.5rem',
      '@media (min-width: 768px)': {
        fontSize: '1.75rem',
      },
    },
    '& p': {
      color: '#6b7280',
      fontSize: '0.875rem',
    },
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#111827',
    margin: '0.25rem 0',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  progressCard: {
    gridColumn: 'span 2',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
    '@media (min-width: 640px)': {
      gridColumn: 'span 4',
    },
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  progressTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
  },
  progressNumbers: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#10b981',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '3px',
    transition: 'width 1s ease-in-out',
  },
  section: {
    marginBottom: '2rem',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  wasteTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  },
  wasteTypeButton: {
    padding: '1rem 0.5rem',
    background: '#f9fafb',
    border: '2px solid #e5e7eb',
    
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80px',
    '&:hover': {
      background: '#f3f4f6',
      borderColor: '#10b981',
      '& $wasteTypeLabel': {
        opacity: 1,
        transform: 'translateY(0)',
      }
    },
    '&.selected': {
      background: '#10b981',
      borderColor: '#10b981',
      transform: 'scale(1.05)',
      '& $wasteTypeIcon': {
        color: '#ffffff',
      },
      '& $wasteTypeLabel': {
        color: '#ffffff',
        opacity: 1,
        transform: 'translateY(0)',
      }
    },
  },
  wasteTypeIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    transition: 'all 0.2s',
  },
  wasteTypeLabel: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#6b7280',
    // opacity: 0,
    transform: 'translateY(5px)',
    transition: 'all 0.2s',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#374151',
    fontSize: '0.875rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    minHeight: '80px',
    resize: 'vertical',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#059669',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginTop: '1.5rem',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  insightCard: {
    padding: '1rem',
    background: '#f0fdf4',
    borderRadius: '8px',
    border: '1px solid #bbf7d0',
    textAlign: 'center',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  insightIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  insightValue: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#059669',
    margin: '0.5rem 0',
  },
  insightLabel: {
    fontSize: '0.75rem',
    color: '#059669',
    fontWeight: 500,
  },
  entriesList: {
    marginTop: '1rem',
  },
  entryItem: {
    padding: '1rem',
    marginBottom: '0.75rem',
    background: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    borderLeft: '3px solid #10b981',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#f9fafb',
    },
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  entryType: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    color: '#1f2937',
  },
  entryQuantity: {
    fontWeight: 700,
    color: '#10b981',
  },
  entryDetails: {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  },
  entryDate: {
    color: '#9ca3af',
    fontSize: '0.75rem',
  },
  entryNotes: {
    marginTop: '0.5rem',
    padding: '0.75rem',
    background: '#f9fafb',
    borderRadius: '6px',
    borderLeft: '3px solid #10b981',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  entryActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.75rem',
  },
  actionButton: {
  padding: '0.375rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',
  border: '1px solid #d1d5db',
  background: '#ffffff',
  userSelect: 'none',
  
  // Default
  color: '#6b7280', // neutral-600

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(52, 235, 64, 0.08)',
  },

  '&:active': {
    transform: 'scale(0.95)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },

  '&.edit': {
    color: '#1d4ed8',        // blue-700
    borderColor: '#93c5fd',
    '&:hover': {
      background: '#dbeafe', // light blue
      boxShadow: '0 4px 10px rgba(29,78,216,0.15)',
    },
  },

  '&.delete': {
    color: '#b91c1c',        // red-700
    borderColor: '#fca5a5',
    '&:hover': {
      background: '#fee2e2', // light red
      boxShadow: '0 4px 10px rgba(185,28,28,0.15)',
    },
  },
},

  filterTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  filterTab: {
    padding: '0.5rem 1rem',
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    color:'black',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#e5e7eb',
    },
    '&.active': {
      background: '#10b981',
      color: '#ffffff',
      borderColor: '#10b981',
    },
  },
  notification: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '1px solid #10b981',
    color: '#059669',
    fontSize: '0.875rem',
    fontWeight: 500,
    zIndex: 1000,
    animation: '$slideIn 0.3s ease-out',
    '@media (min-width: 768px)': {
      top: '2rem',
      right: '2rem',
    },
  },
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280',
  },
  noData: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280',
  },
});

const wasteTypes = [
  { value: 'plastic', label: 'Plastic', icon: '🥤', color: '#ef4444' },
  { value: 'paper', label: 'Paper', icon: '📄', color: '#3b82f6' },
  { value: 'glass', label: 'Glass', icon: '🍶', color: '#10b981' },
  { value: 'metal', label: 'Metal', icon: '🥫', color: '#f59e0b' },
  { value: 'organic', label: 'Organic', icon: '🍎', color: '#8b5cf6' },
  { value: 'electronic', label: 'E-Waste', icon: '💻', color: '#1f2937' },
];

const WasteTracker = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const addEntrySectionRef = useRef(null);
  const [wasteEntries, setWasteEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState(null);
  const [showInsights, setShowInsights] = useState(false);

  const [formData, setFormData] = useState({
    wasteType: 'plastic',
    quantity: '',
    unit: 'kg',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    disposalMethod: 'recycling',
    location: 'home',
  });

  useEffect(() => {
    if (user) {
      loadWasteEntries();
    }
  }, [user]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadWasteEntries = async () => {
    setLoading(true);
    try {
      const response = await wasteAPI.getUserEntries();
      if (response.data.success) {
        setWasteEntries(response.data.entries);
      }
    } catch (error) {
      console.error('Failed to load entries:', error);
      showNotification('Failed to load waste entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      showNotification('Please enter a valid quantity');
      return;
    }

    setSubmitting(true);
    
    try {
      const entryData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
      };

      const response = await wasteAPI.saveEntry(entryData);
      if (response.data.success) {
        showNotification('Waste entry saved successfully!');
        await loadWasteEntries();
        setFormData({
          wasteType: 'plastic',
          quantity: '',
          unit: 'kg',
          date: new Date().toISOString().split('T')[0],
          notes: '',
          disposalMethod: 'recycling',
          location: 'home',
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      showNotification('Failed to save waste entry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Delete this waste entry?')) {
      try {
        const response = await wasteAPI.deleteEntry(entryId);
        if (response.data.success) {
          showNotification('Entry deleted');
          await loadWasteEntries();
        }
      } catch (error) {
        console.error('Delete error:', error);
        showNotification('Failed to delete entry');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWasteTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, wasteType: type.value }));
  };

  const getWasteType = (typeValue) => {
    return wasteTypes.find(t => t.value === typeValue) || wasteTypes[0];
  };

  const filteredEntries = wasteEntries.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'recent') {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }
    if (filter === 'high') return entry.quantity >= 5;
    return entry.wasteType === filter;
  });

  const totalWaste = wasteEntries.reduce((total, entry) => total + entry.quantity, 0);
  const totalRecycled = wasteEntries
    .filter(entry => entry.disposalMethod === 'recycling')
    .reduce((total, entry) => total + entry.quantity, 0);
  
  const recyclingRate = totalWaste > 0 ? (totalRecycled / totalWaste) * 100 : 0;
  const recyclingGoal = 50;
  const monthlyProgress = Math.min((totalRecycled / recyclingGoal) * 100, 100);

  
const scrollToAddEntry = () => {
    addEntrySectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  if (!user) {
    return (
      <div className={classes.container}>
        <div className={classes.noData}>
          <p>Please log in to track your waste.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      {/* Centered Green Title */}
      <div className={classes.heroText}>
        <h1>Track Your Waste & Save The Planet 🌱</h1>
        <p>Every kilogram counts towards a greener future</p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={classes.notification}>
          {notification}
        </div>
      )}

      {/* Stats Section */}
      <div className={classes.statsSection}>
        <div className={classes.statCard}>
          <div className={classes.statIcon}>🗑️</div>
          <div className={classes.statValue}>{totalWaste.toFixed(1)}</div>
          <div className={classes.statLabel}>Total Waste (kg)</div>
        </div>
        
        <div className={classes.statCard}>
          <div className={classes.statIcon}>♻️</div>
          <div className={classes.statValue}>{recyclingRate.toFixed(0)}%</div>
          <div className={classes.statLabel}>Recycling Rate</div>
        </div>
        
        <div className={classes.statCard}>
          <div className={classes.statIcon}>📊</div>
          <div className={classes.statValue}>{wasteEntries.length}</div>
          <div className={classes.statLabel}>Total Entries</div>
        </div>
        
        <div className={classes.statCard}>
          <div className={classes.statIcon}>🌍</div>
          <div className={classes.statValue}>
            {Math.round(totalRecycled * 1.5)}
          </div>
          <div className={classes.statLabel}>CO₂ Saved (kg)</div>
        </div>

        {/* Monthly Progress Card */}
        <div className={classes.progressCard}>
          <div className={classes.progressHeader}>
            <div className={classes.progressTitle}>Monthly Recycling Progress</div>
            <div className={classes.progressNumbers}>
              {totalRecycled.toFixed(1)}/{recyclingGoal} kg
            </div>
          </div>
          <div className={classes.progressBar}>
            <div 
              className={classes.progressFill} 
              style={{ width: `${monthlyProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Waste Section */}
      <div ref={addEntrySectionRef} className={classes.section}>
        <div className={classes.sectionTitle}>➕ Add Waste Entry</div>
        
        <div className={classes.wasteTypeGrid}>
          {wasteTypes.map(type => (
            <button
              key={type.value}
              type="button"
              className={`${classes.wasteTypeButton} ${formData.wasteType === type.value ? 'selected' : ''}`}
              onClick={() => handleWasteTypeSelect(type)}
            >
              <div className={classes.wasteTypeIcon}>{type.icon}</div>
              <div className={classes.wasteTypeLabel}>{type.label}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={classes.formGroup}>
              <label className={classes.label}>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                step="0.1"
                min="0.1"
                className={classes.input}
                placeholder="0.0"
                required
              />
            </div>
            
            <div className={classes.formGroup}>
              <label className={classes.label}>Unit</label>
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className={classes.select}
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                <option value="items">items</option>
                <option value="liters">liters</option>
              </select>
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={classes.input}
                required
              />
            </div>
            
            <div className={classes.formGroup}>
              <label className={classes.label}>Location</label>
              <select 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className={classes.select}
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>

          <div className={classes.formGroup}>
            <label className={classes.label}>Disposal Method</label>
            <select 
              name="disposalMethod" 
              value={formData.disposalMethod} 
              onChange={handleChange}
              className={classes.select}
            >
              <option value="recycling">Recycling</option>
              <option value="composting">Composting</option>
              <option value="landfill">Landfill</option>
              <option value="donation">Donation</option>
            </select>
          </div>

          <div className={classes.formGroup}>
            <label className={classes.label}>Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={classes.textarea}
              placeholder="Any additional information..."
              rows="2"
            />
          </div>

          <button 
            type="submit" 
            className={classes.button} 
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Waste Entry'}
          </button>
        </form>
      </div>

      {/* Environmental Impact */}
      <div className={classes.section}>
        <div 
          className={classes.sectionTitle}
          style={{ cursor: 'pointer' }}
          onClick={() => setShowInsights(!showInsights)}
        >
          🌍 Environmental Impact
          <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: 'auto' }}>
            {showInsights ? '▲' : '▼'}
          </span>
        </div>
        
        {showInsights && (
          <div className={classes.insightsGrid}>
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>🌳</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 0.3)}
              </div>
              <div className={classes.insightLabel}>Trees Saved</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>💧</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 1000).toLocaleString()}
              </div>
              <div className={classes.insightLabel}>Liters Water</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>⚡</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 50).toLocaleString()}
              </div>
              <div className={classes.insightLabel}>kWh Energy</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>☁️</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 1.5)}
              </div>
              <div className={classes.insightLabel}>kg CO₂</div>
            </div>
          </div>
        )}
      </div>

      {/* Waste Entries */}
      <div className={classes.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className={classes.sectionTitle}>📋 Waste Entries</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {filteredEntries.length} entries
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={classes.filterTabs}>
          <button 
            className={`${classes.filterTab} ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`${classes.filterTab} ${filter === 'recent' ? 'active' : ''}`}
            onClick={() => setFilter('recent')}
          >
            Recent
          </button>
          <button 
            className={`${classes.filterTab} ${filter === 'high' ? 'active' : ''}`}
            onClick={() => setFilter('high')}
          >
            High Quantity
          </button>
          {wasteTypes.map(type => (
            <button 
              key={type.value}
              className={`${classes.filterTab} ${filter === type.value ? 'active' : ''}`}
              onClick={() => setFilter(type.value)}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={classes.loading}>Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className={classes.noData}>
            {filter === 'all' 
              ? 'No waste entries yet. Add your first entry!' 
              : 'No entries match your filter'}
          </div>
        ) : (
          <div className={classes.entriesList}>
            {filteredEntries
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(entry => {
                const type = getWasteType(entry.wasteType);
                return (
                  <div key={entry.id} className={classes.entryItem}>
                    <div className={classes.entryHeader}>
                      <div className={classes.entryType}>
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                        <span style={{ 
                          marginLeft: '0.5rem',
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontWeight: 400
                        }}>
                          ({entry.disposalMethod})
                        </span>
                      </div>
                      <div className={classes.entryQuantity}>
                        {entry.quantity} {entry.unit}
                      </div>
                    </div>
                    
                    <div className={classes.entryDetails}>
                      📍 {entry.location}
                    </div>
                    
                    <div className={classes.entryDate}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    
                    {entry.notes && (
                      <div className={classes.entryNotes}>
                        📝 {entry.notes}
                      </div>
                    )}
                    
                    <div className={classes.entryActions}>
                      <button 
                        className={`${classes.actionButton} ${classes.edit}`}
                        onClick={() => {
                          setFormData({
                            wasteType: entry.wasteType,
                            quantity: entry.quantity.toString(),
                            unit: entry.unit,
                            date: entry.date,
                            notes: entry.notes || '',
                            disposalMethod: entry.disposalMethod || 'Recycling',
                            location: entry.location || 'Home',
                          });
                          scrollToAddEntry();
                          showNotification('Edit the form above to update this entry');
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className={`${classes.actionButton} ${classes.delete}`}
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteTracker;