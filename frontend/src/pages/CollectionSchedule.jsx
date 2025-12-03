import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const getCountdown = (targetDateStr) => {
  const now = new Date();
  const target = new Date(targetDateStr);
  const diff = target - now;

  if (diff < 0) {
    return { text: 'Overdue', color: '#ef4444' };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let text = '';
  if (days > 0) {
    text = `${days}d ${hours}h`;
  } else if (hours > 0) {
    text = `${hours}h ${minutes}m`;
  } else {
    text = `${minutes}m`;
  }

  return { text, color: '#10B981' }; // Changed from #3b82f6 to #10B981
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return '#10B981'; // Changed from #3b82f6
    case 'scheduled':
    case 'confirmed': return '#10B981'; // Changed from #3b82f6
    case 'cancelled': return '#ef4444';
    case 'pending': return '#f59e0b';
    default: return '#6b7280';
  }
};

const getTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'recycling': return 'R';
    case 'organic waste': return 'O';
    case 'general waste': return 'G';
    case 'e-waste': return 'E';
    default: return 'S';
  }
};

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p className="loading-text">Loading your collection schedule...</p>
  </div>
);

const ToastMessage = ({ message }) => {
  if (!message.text) return null;
  return (
    <div className={`toast toast-${message.type}`}>
      {message.text}
    </div>
  );
};

const MetricsOverview = ({ stats, user }) => (
  <section className="metrics-section">
    <h2 className="section-title">Your Metrics</h2>
    <div className="metrics-grid">
      <div className="metric-card">
        <h3 className="metric-title">Collections This Week</h3>
        <p className="metric-value">{stats.thisWeek}</p>
        <p className="metric-description">Upcoming pickups</p>
      </div>
      <div className="metric-card">
        <h3 className="metric-title">Next Pickup</h3>
        <p className="metric-value">{stats.nextPickupDays === 'N/A' ? 'N/A' : `${stats.nextPickupDays}d`}</p>
        <p className="metric-description">From today</p>
      </div>
      <div className="metric-card">
        <h3 className="metric-title">Recycling Rate</h3>
        <p className="metric-value">{stats.recyclingRate}%</p>
        <p className="metric-description">{user?.name || 'Your'} goal</p>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.recyclingRate}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CollectionSchedule = () => {
  const { user, logout } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [points, setPoints] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [stats, setStats] = useState({ thisWeek: 0, nextPickupDays: 0, recyclingRate: 72 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [issueType, setIssueType] = useState('missed-pickup');
  const [description, setDescription] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reminderLoading, setReminderLoading] = useState({});
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [searchQuery, setSearchQuery] = useState('');

  const getToken = () => localStorage.getItem('token');

  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api',
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const showMessage = (text, type = 'success') => setMessage({ text, type });

  useEffect(() => {
    if (!user) {
      showMessage('Please log in to access your schedule.', 'info');
      setLoading(false);
      return;
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    let filtered = [...schedule];
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type.toLowerCase() === filterType.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.items.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'type') {
      filtered.sort((a, b) => a.type.localeCompare(b.type));
    }
    setFilteredSchedule(filtered);
  }, [schedule, filterType, searchQuery, sortBy]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [scheduleRes, pointsRes] = await Promise.all([api.get('/collection/schedule'), api.get('/collection/points')]);
      const now = new Date();
      const mappedSchedule = scheduleRes.data.map(item => ({
        id: item.id, type: item.types[0] || 'General Waste', date: item.nextPickup, status: item.status,
        items: item.types, frequency: item.frequency, area: item.area, estimatedTime: item.estimatedTime
      })).filter(item => new Date(item.date) > now);
      setSchedule(mappedSchedule);
      setPoints(pointsRes.data);
      calculateStats(mappedSchedule);
      updateCountdowns(mappedSchedule);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      if (error.response?.status === 401) {
        showMessage('Session expired. Please log in again.', 'error');
        logout();
        return;
      } else {
        const fallbackNow = new Date('2025-12-02');
        const userCity = user.address?.city || 'Eco City';
        const fallbackSchedule = generateFallbackSchedule(userCity, fallbackNow);
        const fallbackPoints = generateFallbackPoints();
        setSchedule(fallbackSchedule);
        setPoints(fallbackPoints);
        calculateStats(fallbackSchedule);
        updateCountdowns(fallbackSchedule);
        showMessage('Using demo data. Connect to service for real-time updates.', 'warning');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackSchedule = (userCity, now) => {
    const baseSchedule = [
      {
        id: 1,
        type: 'Recycling',
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'scheduled',
        items: ['Plastic', 'Paper', 'Glass', 'Metal'],
        frequency: 'Weekly',
        area: 'Downtown',
        estimatedTime: '6:00 AM - 8:00 AM'
      },
      {
        id: 2,
        type: 'Organic Waste',
        date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'confirmed',
        items: ['Food Scraps', 'Yard Waste'],
        frequency: 'Bi-weekly',
        area: 'Northside',
        estimatedTime: '7:00 AM - 9:00 AM'
      },
      {
        id: 3,
        type: 'E-waste',
        date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        items: ['Electronics', 'Batteries'],
        frequency: 'Monthly',
        area: 'Sustainable Ville',
        estimatedTime: '5:00 AM - 7:00 AM'
      }
    ];

    const cityToAreaMap = {
      'Eco City': 'Downtown',
      'Green District': 'Northside',
      'Sustainable Ville': 'Sustainable Ville'
    };
    const userArea = cityToAreaMap[userCity] || 'Downtown';
    return baseSchedule.filter(item => item.area === userArea || userArea === 'Downtown');
  };

  const generateFallbackPoints = () => [
    {
      id: 1,
      name: "Downtown Recycling Center",
      address: "123 Main Street, Eco City",
      types: ["plastic", "paper", "glass", "metal"],
      hours: "8:00 AM - 6:00 PM",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      capacity: 65,
      waitTime: "5 min"
    },
    {
      id: 2,
      name: "Northside E-waste Facility",
      address: "456 Oak Avenue, Green District",
      types: ["electronic", "batteries"],
      hours: "9:00 AM - 5:00 PM",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      capacity: 45,
      waitTime: "10 min"
    },
    {
      id: 3,
      name: "Community Compost Site",
      address: "789 Park Road, Sustainable Ville",
      types: ["organic"],
      hours: "7:00 AM - 7:00 PM",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      capacity: 85,
      waitTime: "2 min"
    }
  ];

  useEffect(() => {
    if (schedule.length > 0) {
      const interval = setInterval(() => updateCountdowns(schedule), 60000);
      return () => clearInterval(interval);
    }
  }, [schedule]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const updateCountdowns = (sched) => {
    const newCountdowns = {};
    sched.forEach(item => newCountdowns[item.id] = getCountdown(item.date));
    setCountdowns(newCountdowns);
  };

  const calculateStats = (sched) => {
    const now = new Date();
    const thisWeekStart = new Date(now); thisWeekStart.setDate(now.getDate() - now.getDay());
    const thisWeekEnd = new Date(thisWeekStart); thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
    const thisWeekCount = sched.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= thisWeekStart && itemDate <= thisWeekEnd;
    }).length;
    const futureDiffs = sched.map(item => Math.ceil((new Date(item.date) - now) / (1000 * 60 * 60 * 24))).filter(d => d > 0);
    const daysToNext = futureDiffs.length > 0 ? Math.min(...futureDiffs) : 'N/A';
    setStats({ thisWeek: thisWeekCount, nextPickupDays: daysToNext, recyclingRate: user?.recyclingGoal || 72 });
  };

  const handleRemindMe = async (item) => {
    if (!user) return showMessage('Please log in to set reminders.', 'error');
    const itemId = item.id;
    setReminderLoading(prev => ({ ...prev, [itemId]: true }));
    try {
      const response = await api.post('/collection/set-reminder', { scheduleId: item.id, reminderTime: 24, nextPickup: item.date });
      if (response.data.success) {
        showMessage('Reminder set successfully. Notification scheduled 24 hours prior.', 'success');
        if (Notification.permission === 'granted') {
          const countdown = getCountdown(item.date);
          new Notification('Collection Reminder', { body: `${item.type} collection in ${countdown.text}. Prepare ${item.items.join(', ')}.` });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => permission === 'granted' && (() => {
            const countdown = getCountdown(item.date);
            new Notification('Collection Reminder', { body: `${item.type} collection in ${countdown.text}. Prepare ${item.items.join(', ')}.` });
          })());
        }
      } else throw new Error('Invalid response');
    } catch (error) {
      console.error('Failed to set reminder:', error);
      if (error.response?.status === 401) {
        showMessage('Session expired. Please log in again.', 'error');
        logout();
      } else showMessage('Failed to set reminder. Please check your connection.', 'error');
    } finally {
      setReminderLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleReportIssue = () => {
    if (!user) return showMessage('Please log in to report issues.', 'error');
    setModalOpen(true);
  };

  const submitIssue = async () => {
    if (!selectedItem || !issueType || !description.trim()) return showMessage('Please fill all fields.', 'error');
    setSubmitLoading(true);
    try {
      const response = await api.post('/collection/report-issue', { scheduleId: selectedItem.id, issueType, description });
      if (response.data.success) showMessage(`Issue reported successfully. Ticket: ${response.data.ticketId}.`, 'success');
      else throw new Error('Invalid response');
    } catch (error) {
      console.error('Failed to report issue:', error);
      if (error.response?.status === 401) {
        showMessage('Session expired. Please log in again.', 'error');
        logout();
      } else showMessage('Failed to report issue. Please check your connection.', 'error');
    } finally {
      setModalOpen(false);
      setIssueType('missed-pickup');
      setDescription('');
      setSelectedItem(null);
      setSubmitLoading(false);
      fetchData();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setIssueType('missed-pickup');
    setDescription('');
    setSelectedItem(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <GlobalStyles />
      <ToastMessage message={message} />
      <main className="main-content">
        <header className="header">
          <h1 className="header-title">Collection Schedule</h1>
          <p className="header-subtitle">Manage your upcoming waste collections</p>
        </header>
        <MetricsOverview stats={stats} user={user} />
        <Controls 
          filterType={filterType} 
          setFilterType={setFilterType} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          filteredCount={filteredSchedule.length}
          totalCount={schedule.length}
        />
        <UpcomingCollections 
          schedule={filteredSchedule} 
          countdowns={countdowns} 
          user={user}
          reminderLoading={reminderLoading}
          onRemindMe={handleRemindMe}
          onReportIssue={(item) => { setSelectedItem(item); handleReportIssue(); }}
        />
        {points.length > 0 && <DropOffLocations points={points} />}
        <ComplianceGuidelines showMessage={showMessage} />
      </main>
      <ReportIssueModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        issueType={issueType}
        onIssueTypeChange={setIssueType}
        description={description}
        onDescriptionChange={setDescription}
        onSubmit={submitIssue}
        submitLoading={submitLoading}
      />
    </div>
  );
};

const Controls = ({ filterType, setFilterType, sortBy, setSortBy, searchQuery, setSearchQuery, filteredCount, totalCount }) => (
  <section className="controls-section">
    <div className="controls-grid">
      <div className="control-group">
        <label className="control-label">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by type, area, or materials..."
          className="search-input"
        />
      </div>
      <div className="control-group">
        <label className="control-label">Filter by Type</label>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-select">
          <option value="all">All Types</option>
          <option value="Recycling">Recycling</option>
          <option value="Organic Waste">Organic Waste</option>
          <option value="E-waste">E-waste</option>
          <option value="General Waste">General Waste</option>
        </select>
      </div>
      <div className="control-group">
        <label className="control-label">Sort By</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
          <option value="date-asc">Date (Soonest)</option>
          <option value="date-desc">Date (Latest)</option>
          <option value="type">Type (A-Z)</option>
        </select>
      </div>
      <div className="results-info">
        <p className="results-text">{filteredCount} of {totalCount} collections</p>
      </div>
    </div>
  </section>
);

const UpcomingCollections = ({ schedule, countdowns, user, reminderLoading, onRemindMe, onReportIssue }) => (
  <section className="collections-section">
    {schedule.length === 0 ? (
      <p className="empty-state">No collections match your filters. Adjust search or filters above.</p>
    ) : (
      <div className="collections-list">
        {schedule.map(item => (
          <CollectionCard
            key={item.id}
            item={item}
            countdown={countdowns[item.id] || getCountdown(item.date)}
            user={user}
            isReminding={reminderLoading[item.id]}
            onRemindMe={onRemindMe}
            onReportIssue={onReportIssue}
          />
        ))}
      </div>
    )}
  </section>
);

const CollectionCard = ({ item, countdown, user, isReminding, onRemindMe, onReportIssue }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="collection-card">
      <div className="card-header">
        <div className="type-indicator">
          <span className="type-icon">{getTypeIcon(item.type)}</span>
          <div>
            <h3 className="type-name">{item.type}</h3>
            <p className="type-meta">{item.frequency} • {item.area}</p>
          </div>
        </div>
        <span className="status-indicator" style={{ backgroundColor: getStatusColor(item.status) }}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      </div>
      <div className="card-body">
        <p className="schedule-info">{formattedDate}</p>
        <p className="countdown-indicator" style={{ color: countdown.color }}>
          Time to collection: {countdown.text}
        </p>
        <p className="time-window">Service window: {item.estimatedTime}</p>
        <div className="materials-list">
          {item.items.map((material, index) => (
            <span key={index} className="material-tag">{material}</span>
          ))}
        </div>
      </div>
      {user && (
        <div className="card-actions">
          <button
            className="action-button primary"
            onClick={() => onRemindMe(item)}
            disabled={isReminding}
          >
            {isReminding ? 'Setting Reminder...' : 'Set Reminder'}
          </button>
          <button
            className="action-button secondary"
            onClick={() => onReportIssue(item)}
          >
            Report Issue
          </button>
          <button
            className="action-button export"
            onClick={() => {
              const dataStr = `Collection: ${item.type}\nDate: ${item.date}\nItems: ${item.items.join(', ')}\n`;
              const dataBlob = new Blob([dataStr], {type: 'text/plain'});
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${item.type.replace(/\s+/g, '_')}_collection.txt`;
              link.click();
            }}
          >
            Export Details
          </button>
        </div>
      )}
    </article>
  );
};

const DropOffLocations = ({ points }) => (
  <section className="locations-section">
    <h2 className="section-title">Drop-off Locations</h2>
    <div className="locations-grid">
      {points.map(point => (
        <LocationCard key={point.id} point={point} />
      ))}
    </div>
  </section>
);

const LocationCard = ({ point }) => (
  <div className="location-card">
    <h3 className="location-name">{point.name}</h3>
    <address className="location-address">{point.address}</address>
    <p className="location-hours">Operating hours: {point.hours}</p>
    <div className="capacity-section">
      <span className="capacity-label">Capacity utilization</span>
      <div className="capacity-bar">
        <div 
          className="capacity-fill"
          style={{ 
            width: `${point.capacity}%`,
            backgroundColor: point.capacity > 70 ? '#ef4444' : point.capacity > 50 ? '#f59e0b' : '#10B981' // Changed from #3b82f6
          }} 
        />
      </div>
      <p className="capacity-text">{point.capacity}% occupied | Estimated wait: {point.waitTime}</p>
    </div>
    <div className="accepted-materials">
      {point.types.map((type, index) => (
        <span key={index} className="material-tag small">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      ))}
    </div>
  </div>
);

const ComplianceGuidelines = ({ showMessage }) => (
  <section className="guidelines-section">
    <h2 className="section-title">Compliance Guidelines</h2>
    <div className="guidelines-grid">
      <GuidelinePanel
        title="Preparation Requirements"
        items={[
          'Rinse all containers prior to disposal',
          'Flatten and bundle cardboard materials',
          'Segregate waste by designated categories',
          'Utilize only approved collection receptacles'
        ]}
        onClick={() => showMessage('Adherence to these guidelines ensures efficient processing and minimizes contamination.', 'info')}
      />
      <GuidelinePanel
        title="Prohibited Actions"
        items={[
          'Do not intermix recyclables with general waste',
          'Exclude plastic bags from recycling streams',
          'Hazardous materials require specialized handling',
          'Avoid overfilling any collection containers'
        ]}
        onClick={() => showMessage('Non-compliance may result in service delays or additional fees.', 'warning')}
      />
    </div>
  </section>
);

const GuidelinePanel = ({ title, items, onClick }) => (
  <div className="guideline-panel" onClick={onClick}>
    <h3 className="panel-title">{title}</h3>
    <ul className="guideline-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const ReportIssueModal = ({ 
  isOpen, 
  onClose, 
  selectedItem, 
  issueType, 
  onIssueTypeChange, 
  description, 
  onDescriptionChange, 
  onSubmit, 
  submitLoading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3 className="modal-title">Report Service Issue</h3>
          <p className="modal-subtitle">
            Collection: {selectedItem?.type} on {new Date(selectedItem?.date).toLocaleDateString()}
          </p>
        </header>
        <form className="issue-form">
          <div className="form-group">
            <label className="form-label">Issue Category <span className="required">*</span></label>
            <select
              value={issueType}
              onChange={e => onIssueTypeChange(e.target.value)}
              disabled={submitLoading}
              className="form-input"
            >
              <option value="missed-pickup">Missed Collection</option>
              <option value="bin-full">Container Overflow</option>
              <option value="wrong-type">Incorrect Material Removal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Detailed Description <span className="required">*</span></label>
            <textarea
              value={description}
              onChange={e => onDescriptionChange(e.target.value)}
              placeholder="Provide specifics about the issue..."
              rows={4}
              disabled={submitLoading}
              className="form-input textarea"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn neutral" onClick={onClose} disabled={submitLoading}>
              Cancel
            </button>
            <button 
              type="button"
              className="btn primary"
              onClick={onSubmit} 
              disabled={submitLoading}
            >
              {submitLoading ? 'Processing...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GlobalStyles = () => (
  <style jsx global>{`
    :root {
      --color-primary: #10B981; /* Changed from #3b82f6 */
      --color-primary-dark: #059669; /* Added for consistency with RecyclingTips */
      --color-success: #10B981; /* Changed from #3b82f6 */
      --color-warning: #f59e0b;
      --color-danger: #ef4444;
      --color-neutral: #6b7280;
      --color-text: #e0e0e0;
      --color-text-secondary: #a0a0a0;
      --color-bg: #1a1a1a;
      --color-surface: #2d2d2d;
      --color-border: #404040;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
      --border-radius: 8px;
      --transition: all 0.2s ease-in-out;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--color-text);
      background-color: var(--color-bg);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .header {
      text-align: center;
      margin-bottom: 0;
      padding: 0;
    }

    .header-title {
      margin: 0 0 0.25rem 0;
      font-size: 2.5rem;
      font-weight: 400;
      color: var(--color-text);
      letter-spacing: -0.01em;
    }

    .header-subtitle {
      margin: 0;
      font-size: 1rem;
      color: var(--color-text-secondary);
      font-weight: 400;
    }

    .section-title {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .empty-state {
      text-align: center;
      color: var(--color-text-secondary);
      font-style: italic;
      margin: 0;
      padding: 1.5rem;
      background: var(--color-surface);
      border-radius: var(--border-radius);
      border: 1px solid var(--color-border);
    }

    /* Controls */
    .controls-section {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.25rem;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .control-group {
      display: flex;
      flex-direction: column;
    }

    .control-label {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .search-input, .filter-select, .sort-select {
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      background: #404040;
      transition: var(--transition);
      color: var(--color-text);
    }

    .search-input:focus, .filter-select:focus, .sort-select:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .filter-select, .sort-select {
      color: var(--color-text-secondary);
    }

    .filter-select option, .sort-select option {
      background: #404040;
      color: var(--color-text-secondary);
    }

    .filter-select option:hover, .sort-select option:hover {
      background: #555;
      color: var(--color-text-secondary);
    }

    .results-info {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: 1 / -1;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .results-text {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    /* Metrics */
    .metrics-section {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.5rem;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .metric-card {
      padding: 1.5rem;
      text-align: center;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      transition: var(--transition);
      background: #404040;
    }

    .metric-card:hover {
      box-shadow: var(--shadow-md);
      background: #555;
    }

    .metric-title {
      margin: 0 0 0.75rem 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--color-primary);
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.025em;
    }

    .metric-description {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .progress-container {
      margin-top: 1rem;
    }

    .progress-bar {
      height: 4px;
      background: var(--color-border);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(to right, var(--color-success), var(--color-primary-dark)); /* Added gradient */
      transition: width 0.3s ease;
    }

    /* Collections */
    .collections-section {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.5rem;
    }

    .collections-list {
      display: grid;
      gap: 1rem;
    }

    .collection-card {
      display: grid;
      gap: 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.5rem;
      background: #404040;
      transition: var(--transition);
    }

    .collection-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary);
      background: #555;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .type-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .type-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-primary);
      color: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .type-name {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .type-meta {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }

    .status-indicator {
      padding: 0.375rem 0.75rem;
      color: #1a1a1a;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
      text-transform: capitalize;
      letter-spacing: 0.05em;
    }

    .card-body {
      display: grid;
      gap: 0.75rem;
    }

    .schedule-info,
    .time-window {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .countdown-indicator {
      margin: 0;
      font-weight: 600;
      font-size: 0.9375rem;
    }

    .materials-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .material-tag {
      padding: 0.25rem 0.75rem;
      background: #555;
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .action-button {
      flex: 1;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: var(--border-radius);
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.875rem;
    }

    .action-button.primary {
      background: var(--color-primary);
      color: #1a1a1a;
    }

    .action-button.primary:hover:not(:disabled) {
      background: var(--color-primary-dark); /* Changed from #1d4ed8 */
      box-shadow: var(--shadow-sm);
    }

    .action-button.primary:disabled {
      background: var(--color-neutral);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .action-button.secondary {
      background: transparent;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }

    .action-button.secondary:hover:not(:disabled) {
      background: var(--color-primary);
      color: #1a1a1a;
    }

    .action-button.export {
      background: var(--color-success);
      color: #1a1a1a;
      border: 1px solid var(--color-success);
    }

    .action-button.export:hover:not(:disabled) {
      background: var(--color-primary-dark); /* Changed from #1d4ed8 */
    }

    /* Locations */
    .locations-section {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.5rem;
    }

    .locations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .location-card {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: #404040;
      transition: var(--transition);
    }

    .location-card:hover {
      box-shadow: var(--shadow-md);
      background: #555;
    }

    .location-name {
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .location-address,
    .location-hours {
      margin: 0 0 0.5rem 0;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .capacity-section {
      margin: 1rem 0;
    }

    .capacity-label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .capacity-bar {
      height: 4px;
      background: var(--color-border);
      border-radius: 2px;
      overflow: hidden;
    }

    .capacity-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .capacity-text {
      margin: 0.5rem 0 0 0;
      font-size: 0.75rem;
      color: var(--color-text-secondary);
    }

    .accepted-materials {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .material-tag.small {
      font-size: 0.6875rem;
      padding: 0.25rem 0.5rem;
    }

    /* Guidelines */
    .guidelines-section {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 1.5rem;
    }

    .guidelines-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .guideline-panel {
      padding: 1.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: #404040;
      cursor: pointer;
      transition: var(--transition);
    }

    .guideline-panel:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow-sm);
      background: #555;
    }

    .panel-title {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .guideline-list {
      margin: 0;
      padding-left: 1.25rem;
      list-style: none;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .guideline-list li {
      position: relative;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }

    .guideline-list li::before {
      content: '•';
      position: absolute;
      left: -1.25rem;
      color: var(--color-primary);
      font-weight: bold;
      font-size: 1.125rem;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    .modal-content {
      background: var(--color-surface);
      border-radius: var(--border-radius);
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-lg);
    }

    .modal-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      border-bottom: 1px solid var(--color-border);
    }

    .modal-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .modal-subtitle {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .issue-form {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: var(--color-text);
      font-size: 0.875rem;
    }

    .required {
      color: var(--color-danger);
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      transition: var(--transition);
      background: #404040;
      color: var(--color-text);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); /* Updated color */
    }

    .form-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .textarea {
      resize: vertical;
      min-height: 120px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--border-radius);
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.875rem;
    }

    .btn.primary {
      background: var(--color-primary);
      color: #1a1a1a;
    }

    .btn.primary:hover:not(:disabled) {
      background: var(--color-primary-dark); /* Changed from #1d4ed8 */
    }

    .btn.neutral {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }

    .btn.neutral:hover:not(:disabled) {
      background: #404040;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Toast */
    .toast {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      color: #1a1a1a;
      font-weight: 500;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      max-width: 350px;
      animation: slideIn 0.3s ease;
    }

    .toast-success { background: var(--color-success); }
    .toast-error { background: var(--color-danger); }
    .toast-warning { background: var(--color-warning); }
    .toast-info { background: var(--color-primary); }

    /* Loading */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      padding: 2rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top: 3px solid var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    .loading-text {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 1rem;
    }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    /* Responsive */
    @media (max-width: 768px) {
      .container { padding: 0 0.5rem; }
      .metrics-grid, .guidelines-grid, .locations-grid { grid-template-columns: 1fr; gap: 1rem; }
      .controls-grid { grid-template-columns: 1fr; }
      .card-actions { flex-direction: column; gap: 0.5rem; }
      .form-actions { flex-direction: column; }
      .toast { right: 0.5rem; left: 0.5rem; max-width: none; }
      .header-title { font-size: 2rem; }
    }

    @media (max-width: 480px) {
      .metrics-grid { gap: 1rem; }
      .collection-card, .location-card, .guideline-panel { padding: 1.25rem; }
      .metrics-section, .collections-section, .locations-section, .guidelines-section { padding: 1.25rem; }
    }
  `}</style>
);

export default CollectionSchedule;