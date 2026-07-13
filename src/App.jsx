import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { formatDate, formatTime } from './utils/dateTime';
import { modules, suppics, supplyTrend } from './data/dashboardData';
import Sidebar from './components/dashboard/Sidebar';
import TopBar from './components/dashboard/TopBar';
import SupplyDashboard from './components/dashboard/SupplyDashboard';
import QualityDashboard from './components/dashboard/QualityDashboard';
import ProductivityDashboard from './components/dashboard/ProductivityDashboard';
import { fetchSharePointDashboardData } from './services/sharePointApi';

function App() {
  const [activeModule, setActiveModule] = useState('supply');
  const [now, setNow] = useState(() => new Date());
  const [productionTarget, setProductionTarget] = useState(100);
  const [mhpTarget, setMhpTarget] = useState(1.8);
  const [qualityForm, setQualityForm] = useState({
    issueTitle: 'Valve inspection overdue',
    description: 'Create a follow-up record for the missing inspection cycle.',
    owner: 'S. Rivera',
    priority: 'High',
    status: 'In Progress',
    completed: false,
  });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => ({
      date: formatDate(now),
      time: formatTime(now),
    }),
    [now],
  );

  const activeModuleConfig = modules.find((module) => module.id === activeModule) ?? modules[0];

  useEffect(() => {
    void fetchSharePointDashboardData();
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar modules={modules} activeModule={activeModule} onSelectModule={setActiveModule} />

      <main className="dashboard-main">
        <div className="dashboard-main__inner">
          <TopBar
            date={stats.date}
            time={stats.time}
            activeLabel={activeModuleConfig.label}
            title={activeModuleConfig.title}
          />

          {activeModule === 'supply' && <SupplyDashboard metrics={supplyMetrics} trend={supplyTrend} />}

          {activeModule === 'quality' && (
            <QualityDashboard
              qualityForm={qualityForm}
              onChange={(field, value) => setQualityForm((current) => ({ ...current, [field]: value }))}
            />
          )}

          {activeModule === 'productivity' && (
            <ProductivityDashboard
              productionTarget={productionTarget}
              mhpTarget={mhpTarget}
              onProductionTargetChange={setProductionTarget}
              onMhpTargetChange={setMhpTarget}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
