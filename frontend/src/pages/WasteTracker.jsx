// pages/WasteTracker.js (UPDATED - Integrate with real API, use AuthContext, colors matching Home theme)
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

const API_BASE = 'http://localhost:5000/api';

// Real API integration
const wasteAPI = {
  // Save waste entry for current authenticated user
  saveEntry: async (entry) => {
    return axios.post(`${API_BASE}/waste/entries`, entry);
  },

  // Get current authenticated user's waste entries
  getUserEntries: async () => {
    return axios.get(`${API_BASE}/waste/entries`);
  },

  // Delete waste entry
  deleteEntry: async (entryId) => {
    return axios.delete(`${API_BASE}/waste/entries/${entryId}`);
  },

  // Update waste entry
  updateEntry: async (entryId, updates) => {
    return axios.put(`${API_BASE}/waste/entries/${entryId}`, updates);
  }
};

const useStyles = createUseStyles({
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: 'var(--text-dark)',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'var(--light-color)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  animatedHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    '& p': {
      fontSize: '1.4rem',
      color: 'var(--text-light)',
      margin: 0,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    width: '100%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 'var(--border-radius-lg)',
    padding: '1.5rem',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border-color)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)',
    },
    color: 'var(--text-dark)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text-dark)',
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    backgroundColor: 'white',
    color: 'var(--text-dark)',
    transition: 'border-color 0.3s',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
    '&[type="number"]': {
      '-moz-appearance': 'textfield',
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    backgroundColor: 'white',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
    '& option': {
      backgroundColor: 'white',
      color: 'var(--text-dark)',
    },
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    backgroundColor: 'white',
    color: 'var(--text-dark)',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'border-color 0.3s',
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--primary-color)',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  button: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    padding: '0.875rem 1.5rem',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    '&:hover': {
      backgroundColor: 'var(--primary-dark)',
    },
    '&:disabled': {
      backgroundColor: 'var(--text-light)',
      cursor: 'not-allowed',
    },
  },
  loadingButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'var(--light-color)',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-dark)',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: 'var(--primary-color)',
    margin: '0.25rem 0',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  wasteTypeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    backgroundColor: 'var(--light-color)',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateX(5px)',
    },
  },
  wasteTypeColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    marginRight: '0.75rem',
  },
  wasteTypeInfo: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  wasteTypeName: {
    fontWeight: '600',
    color: 'var(--text-dark)',
  },
  wasteTypeQuantity: {
    fontWeight: 700,
    color: 'var(--primary-color)',
    fontSize: '1.1rem',
  },
  entriesList: {
    maxHeight: '400px',
    overflowY: 'auto',
    marginTop: '1rem',
  },
  entryItem: {
    padding: '1rem',
    marginBottom: '0.75rem',
    backgroundColor: 'white',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    borderLeft: '4px solid',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateX(5px)',
      backgroundColor: 'var(--light-color)',
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
    fontSize: '0.95rem',
  },
  entryDate: {
    color: 'var(--text-light)',
    fontSize: '0.85rem',
  },
  entryDetails: {
    color: 'var(--text-light)',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  },
  entryNotes: {
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    fontStyle: 'italic',
    marginTop: '0.5rem',
  },
  entryActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.75rem',
  },
  actionButton: {
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  editButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--secondary-color)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--accent-color)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
    },
  },
  noData: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--text-light)',
    fontSize: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--text-light)',
    fontSize: '1rem',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--accent-color)',
    color: 'var(--accent-color)',
    padding: '1rem',
    borderRadius: 'var(--border-radius)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid var(--primary-color)',
    color: 'var(--primary-dark)',
    padding: '1rem',
    borderRadius: 'var(--border-radius)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  chartContainer: {
    height: '200px',
    marginTop: '1rem',
    position: 'relative',
  },
  chartBar: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '150px',
    gap: '0.5rem',
    padding: '1rem 0',
  },
  chartItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartFill: {
    width: '100%',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.5s ease',
  },
  chartLabel: {
    marginTop: '0.5rem',
    fontSize: '0.8rem',
    color: 'var(--text-light)',
    textAlign: 'center',
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--border-color)',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '1rem 0',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    backgroundColor: 'var(--primary-color)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    color: 'var(--text-dark)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--primary-color)',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--text-light)',
    '&:hover': {
      color: 'var(--text-dark)',
    },
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  insightCard: {
    padding: '1rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 'var(--border-radius)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    textAlign: 'center',
    color: 'var(--text-dark)',
  },
  insightIcon: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  insightValue: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--primary-color)',
    margin: '0.25rem 0',
  },
  insightLabel: {
    fontSize: '0.85rem',
    color: 'var(--primary-dark)',
  },
  filterBar: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'var(--light-color)',
      color: 'var(--text-dark)',
    },
    '&.active': {
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      borderColor: 'var(--primary-color)',
    },
  },
});

// Waste types with more detailed information (colors updated to theme)
const wasteTypes = [
  { value: 'plastic', label: 'Plastic', color: '#ef4444', icon: '🥤', description: 'Bottles, packaging, bags' },
  { value: 'paper', label: 'Paper', color: '#3b82f6', icon: '📄', description: 'Newspapers, cardboard, office paper' },
  { value: 'glass', label: 'Glass', color: '#10b981', icon: '🍶', description: 'Bottles, jars, containers' },
  { value: 'metal', label: 'Metal', color: '#f59e0b', icon: '🥫', description: 'Cans, foil, scrap metal' },
  { value: 'organic', label: 'Organic', color: '#8b5cf6', icon: '🍎', description: 'Food scraps, yard waste' },
  { value: 'electronic', label: 'E-Waste', color: '#1f2937', icon: '💻', description: 'Electronics, batteries' },
  { value: 'hazardous', label: 'Hazardous', color: '#ef4444', icon: '⚠️', description: 'Chemicals, paint, medical' },
  { value: 'textile', label: 'Textile', color: '#06b6d4', icon: '👕', description: 'Clothing, fabrics, shoes' },
];

const WasteTracker = () => {
  const classes = useStyles();
  const { user } = useAuth(); // Use real authenticated user
  const [wasteEntries, setWasteEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [timeFilter, setTimeFilter] = useState('week');

  const [formData, setFormData] = useState({
    wasteType: 'plastic',
    quantity: '',
    unit: 'kg',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    disposalMethod: 'recycling',
    location: 'home',
  });

  // Load user's waste entries on component mount or user change
  useEffect(() => {
    if (user) {
      loadWasteEntries();
    }
  }, [user]);

  const loadWasteEntries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await wasteAPI.getUserEntries();
      if (response.data.success) {
        // Entries are already normalized with 'id' and 'date' as string
        setWasteEntries(response.data.entries);
      }
    } catch (error) {
      console.error('Failed to load entries:', error);
      showMessage('error', 'Failed to load waste entries');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      showMessage('error', 'Please enter a valid quantity');
      return;
    }

    setSubmitting(true);
    
    try {
      const entryData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
      };

      if (editingEntry) {
        const response = await wasteAPI.updateEntry(editingEntry.id, entryData);
        if (response.data.success) {
          showMessage('success', 'Waste entry updated successfully');
          setEditingEntry(null);
          setShowEditModal(false);
        }
      } else {
        const response = await wasteAPI.saveEntry(entryData);
        if (response.data.success) {
          showMessage('success', 'Waste entry saved successfully');
        }
      }

      // Refresh entries
      await loadWasteEntries();
      
      // Reset form
      if (!editingEntry) {
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
      showMessage('error', 'Failed to save waste entry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      wasteType: entry.wasteType,
      quantity: entry.quantity.toString(),
      unit: entry.unit,
      date: entry.date,
      notes: entry.notes || '',
      disposalMethod: entry.disposalMethod || 'recycling',
      location: entry.location || 'home',
    });
    setShowEditModal(true);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await wasteAPI.deleteEntry(entryId);
        if (response.data.success) {
          showMessage('success', 'Waste entry deleted');
          await loadWasteEntries();
        }
      } catch (error) {
        console.error('Delete error:', error);
        showMessage('error', 'Failed to delete entry');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  // Calculate statistics
  const getTotalByType = (type) => {
    return wasteEntries
      .filter(entry => entry.wasteType === type)
      .reduce((total, entry) => total + entry.quantity, 0);
  };

  const totalWaste = wasteEntries.reduce((total, entry) => total + entry.quantity, 0);
  const totalRecycled = wasteEntries
    .filter(entry => entry.disposalMethod === 'recycling')
    .reduce((total, entry) => total + entry.quantity, 0);
  
  const recyclingRate = totalWaste > 0 ? (totalRecycled / totalWaste) * 100 : 0;
  const recyclingGoal = user?.recyclingGoal || 20;
  const monthlyProgress = (totalRecycled / recyclingGoal) * 100;

  // Get waste type for display
  const getWasteType = (typeValue) => {
    return wasteTypes.find(t => t.value === typeValue) || wasteTypes[0];
  };

  // Chart data for waste composition
  const chartData = wasteTypes.map(type => ({
    label: type.label,
    value: getTotalByType(type.value),
    color: type.color
  })).filter(item => item.value > 0);

  const maxChartValue = Math.max(...chartData.map(item => item.value), 1);

  if (!user) {
    return (
      <div className={classes.container}>
        <div className={classes.noData}>
          <p>Please log in to access your waste tracker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {/* Animated Header */}
      {/* Animated Header – BIGGER & BOLDER */}
<div className={classes.animatedHeader}>
  <h1 style={{
    fontSize: '2rem',           // ← this makes it HUGE
    fontWeight: 800,
    margin: '0 0 1rem 0',
    background: 'linear-gradient(90deg, var(--primary-color), var(--primary-dark))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  }}>
    Track your waste disposal
   
    and monitor your environmental impact
  </h1>
  <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
    Every kilogram counts – start making a difference today!
  </p>
</div>

      {/* Messages */}
      {message.text && (
        <div className={message.type === 'error' ? classes.error : classes.success}>
          {message.text}
        </div>
      )}

      {/* Main Grid */}
      <div className={classes.grid}>
        {/* Add Entry Form */}
        <div className={classes.card}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            {editingEntry ? 'Edit Waste Entry' : 'Add New Waste Entry'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label className={classes.label}>Waste Type</label>
              <select 
                name="wasteType" 
                value={formData.wasteType} 
                onChange={handleChange}
                className={classes.select}
                required
              >
                {wasteTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>
            
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
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lb">Pounds (lb)</option>
                  <option value="items">Items</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <option value="public">Public Area</option>
                  <option value="other">Other</option>
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
                <option value="incineration">Incineration</option>
                <option value="donation">Donation</option>
                <option value="reuse">Reuse</option>
              </select>
            </div>
            
            <div className={classes.formGroup}>
              <label className={classes.label}>Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={classes.textarea}
                placeholder="Any additional information about this waste..."
                rows="3"
              />
            </div>
            
            <button 
              type="submit" 
              className={classes.button} 
              disabled={submitting}
            >
              {submitting ? (
                <span className={classes.loadingButton}>
                  <span>⏳</span> Saving...
                </span>
              ) : editingEntry ? 'Update Entry' : 'Save Entry'}
            </button>
          </form>
        </div>

        {/* Statistics and Insights */}
        <div className={classes.card}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            Your Waste Statistics
          </h2>
          
          {loading ? (
            <div className={classes.loading}>Loading statistics...</div>
          ) : wasteEntries.length === 0 ? (
            <div className={classes.noData}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <p>No waste data yet</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                Start tracking to see your statistics
              </p>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className={classes.statsGrid}>
                <div className={classes.statItem}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🗑️</div>
                  <div className={classes.statValue}>{totalWaste.toFixed(1)}</div>
                  <div className={classes.statLabel}>Total Waste ({formData.unit})</div>
                </div>
                
                <div className={classes.statItem}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>♻️</div>
                  <div className={classes.statValue}>{recyclingRate.toFixed(0)}%</div>
                  <div className={classes.statLabel}>Recycling Rate</div>
                </div>
                
                <div className={classes.statItem}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📈</div>
                  <div className={classes.statValue}>{wasteEntries.length}</div>
                  <div className={classes.statLabel}>Total Entries</div>
                </div>
                
                <div className={classes.statItem}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                  <div className={classes.statValue}>{recyclingGoal}</div>
                  <div className={classes.statLabel}>Monthly Goal (kg)</div>
                </div>
              </div>

              {/* Monthly Progress */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Monthly Recycling Progress</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                    {totalRecycled.toFixed(1)}/{recyclingGoal} kg
                  </span>
                </div>
                <div className={classes.progressBar}>
                  <div 
                    className={classes.progressFill} 
                    style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Waste Composition */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-dark)' }}>
                  Waste Composition
                </h3>
                
                {chartData.length > 0 ? (
                  <div className={classes.chartContainer}>
                    <div className={classes.chartBar}>
                      {chartData.map((item, index) => (
                        <div key={index} className={classes.chartItem}>
                          <div 
                            className={classes.chartFill}
                            style={{ 
                              height: `${(item.value / maxChartValue) * 100}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                          <div className={classes.chartLabel}>
                            {item.label}<br />
                            <small>{item.value.toFixed(1)}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-light)', padding: '1rem' }}>
                    No waste composition data
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Waste Entries List */}
      <div className={classes.card} style={{ marginTop: '2rem', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Waste Entries</h2>
          
          <div className={classes.filterBar}>
            <button 
              className={`${classes.filterButton} ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`${classes.filterButton} ${filter === 'recent' ? 'active' : ''}`}
              onClick={() => setFilter('recent')}
            >
              Recent
            </button>
            <button 
              className={`${classes.filterButton} ${filter === 'high' ? 'active' : ''}`}
              onClick={() => setFilter('high')}
            >
              High Quantity
            </button>
            {wasteTypes.map(type => (
              <button 
                key={type.value}
                className={`${classes.filterButton} ${filter === type.value ? 'active' : ''}`}
                onClick={() => setFilter(type.value)}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={classes.loading}>Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className={classes.noData}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p>No waste entries found</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
              {filter === 'all' 
                ? 'Start tracking your waste disposal' 
                : 'No entries match your filter'}
            </p>
          </div>
        ) : (
          <div className={classes.entriesList}>
            {filteredEntries
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(entry => {
                const type = getWasteType(entry.wasteType);
                return (
                  <div 
                    key={entry.id} 
                    className={classes.entryItem}
                    style={{ borderLeftColor: type.color }}
                  >
                    <div className={classes.entryHeader}>
                      <div className={classes.entryType}>
                        <span style={{ color: type.color }}>{type.icon}</span>
                        <strong>{type.label}</strong>
                        <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
                          ({entry.disposalMethod})
                        </span>
                      </div>
                      <div className={classes.entryDate}>
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <div className={classes.entryDetails}>
                      <strong>{entry.quantity} {entry.unit}</strong> • {entry.location}
                    </div>
                    
                    {entry.notes && (
                      <div className={classes.entryNotes}>
                        {entry.notes}
                      </div>
                    )}
                    
                    <div className={classes.entryActions}>
                      <button 
                        className={`${classes.actionButton} ${classes.editButton}`}
                        onClick={() => handleEdit(entry)}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className={`${classes.actionButton} ${classes.deleteButton}`}
                        onClick={() => handleDelete(entry.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Environmental Insights */}
      {wasteEntries.length > 0 && (
        <div className={classes.card} style={{ marginTop: '2rem', width: '100%' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            Environmental Impact Insights
          </h2>
          
          <div className={classes.insightsGrid}>
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>🌳</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 0.3)}
              </div>
              <div className={classes.insightLabel}>Trees Saved Equivalent</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>💧</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 1000)}
              </div>
              <div className={classes.insightLabel}>Liters of Water Saved</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>⚡</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 50)}
              </div>
              <div className={classes.insightLabel}>kWh Energy Saved</div>
            </div>
            
            <div className={classes.insightCard}>
              <div className={classes.insightIcon}>☁️</div>
              <div className={classes.insightValue}>
                {Math.round(totalRecycled * 1.5)}
              </div>
              <div className={classes.insightLabel}>kg CO₂ Reduced</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className={classes.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modalHeader}>
              <h3 className={classes.modalTitle}>Edit Waste Entry</h3>
              <button 
                className={classes.closeButton}
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEntry(null);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={classes.formGroup}>
                <label className={classes.label}>Waste Type</label>
                <select 
                  name="wasteType" 
                  value={formData.wasteType} 
                  onChange={handleChange}
                  className={classes.select}
                  required
                >
                  {wasteTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
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
                  required
                />
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
                <label className={classes.label}>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className={classes.textarea}
                  rows="3"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button 
                  type="submit" 
                  className={classes.button}
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Update Entry'}
                </button>
                <button 
                  type="button"
                  className={classes.button}
                  style={{ backgroundColor: 'var(--text-light)' }}
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEntry(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteTracker;