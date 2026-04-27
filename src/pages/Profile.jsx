import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { User, Edit3, Save, Target, Scale, Ruler, Calendar, Flame, Award, ChevronRight, Settings, LogOut, Moon, Bell, Shield, HelpCircle } from 'lucide-react'
import './Profile.css'

export default function Profile() {
  const { profile, setProfile, dailyIntake, setCurrentPage, darkMode, setDarkMode } = useContext(AppContext)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({ ...profile })

  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)

  const handleSave = () => {
    setProfile(editData)
    setEditing(false)
  }

  const menuItems = [
    { icon: Bell,        label: 'Notifications', desc: 'Reminders & alerts',     action: () => setCurrentPage('notifications') },
    { icon: Target,      label: 'Goals',         desc: 'Set your fitness goals' },
    { icon: Moon,        label: 'Dark Mode',      desc: darkMode ? 'Enabled' : 'Disabled', toggle: true, enabled: darkMode, onToggle: () => setDarkMode(d => !d) },
    { icon: Shield,      label: 'Privacy',        desc: 'Account security' },
    { icon: HelpCircle,  label: 'Help & Support', desc: 'FAQ & contact us' },
    { icon: Settings,    label: 'Settings',        desc: 'App preferences' },
  ]

  return (
    <div className="profile-page" id="profile-page">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <span className="subtitle">Your Health Data</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => editing ? handleSave() : setEditing(true)} id="btn-edit-profile">
            {editing ? <Save size={18} /> : <Edit3 size={18} />}
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-section animate-in" id="avatar-section">
          <div className="avatar-ring">
            <div className="avatar">
              <User size={32} />
            </div>
          </div>
          <h2 className="profile-name">{profile.name}</h2>
          <div className="profile-badges">
            <span className="chip"><Award size={10} /> {profile.goal}</span>
            <span className="chip"><Flame size={10} /> Active</span>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="physical-stats animate-in-delay-1" id="physical-stats">
          <h3 className="section-title">Physical Data</h3>
          <div className="stat-cards-row">
            <div className="profile-stat-card">
              <Ruler size={18} className="pstat-icon" />
              {editing ? (
                <input
                  type="number"
                  className="edit-input"
                  value={editData.height}
                  onChange={(e) => setEditData({ ...editData, height: Number(e.target.value) })}
                />
              ) : (
                <span className="pstat-value">{profile.height}</span>
              )}
              <span className="pstat-label">Height (cm)</span>
            </div>
            <div className="profile-stat-card">
              <Scale size={18} className="pstat-icon" />
              {editing ? (
                <input
                  type="number"
                  className="edit-input"
                  value={editData.weight}
                  onChange={(e) => setEditData({ ...editData, weight: Number(e.target.value) })}
                />
              ) : (
                <span className="pstat-value">{profile.weight}</span>
              )}
              <span className="pstat-label">Weight (kg)</span>
            </div>
            <div className="profile-stat-card">
              <Calendar size={18} className="pstat-icon" />
              {editing ? (
                <input
                  type="number"
                  className="edit-input"
                  value={editData.age}
                  onChange={(e) => setEditData({ ...editData, age: Number(e.target.value) })}
                />
              ) : (
                <span className="pstat-value">{profile.age}</span>
              )}
              <span className="pstat-label">Age</span>
            </div>
          </div>
        </div>

        {/* BMI Card */}
        <div className="bmi-profile-card card-glow animate-in-delay-2" id="bmi-profile">
          <div className="bmi-prof-header">
            <span className="bmi-prof-label">Body Mass Index</span>
            <span className="bmi-prof-value">{bmi}</span>
          </div>
          <div className="bmi-prof-bar">
            <div className="bmi-prof-zones">
              <div className="bp-zone" style={{ background: 'var(--yellow)' }} />
              <div className="bp-zone" style={{ background: 'var(--accent)' }} />
              <div className="bp-zone" style={{ background: 'var(--orange)' }} />
              <div className="bp-zone" style={{ background: 'var(--red)' }} />
            </div>
            <div className="bmi-prof-pointer" style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }} />
          </div>
          <span className="bmi-prof-status">
            {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Weight' : bmi < 30 ? 'Overweight' : 'Obese'}
          </span>
        </div>

        {/* Daily Goal */}
        <div className="daily-goal-card card animate-in-delay-2" id="daily-goal">
          <div className="goal-header">
            <div>
              <span className="goal-label">Daily Calorie Goal</span>
              {editing ? (
                <input
                  type="number"
                  className="edit-input goal-input"
                  value={editData.dailyGoal}
                  onChange={(e) => setEditData({ ...editData, dailyGoal: Number(e.target.value) })}
                />
              ) : (
                <span className="goal-value">{profile.dailyGoal} kcal</span>
              )}
            </div>
            <div className="goal-progress-ring">
              <svg viewBox="0 0 48 48" width="48" height="48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--bg-tertiary)" strokeWidth="4" />
                <circle
                  cx="24" cy="24" r="20"
                  fill="none" stroke="var(--accent)" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.min((dailyIntake.calories / profile.dailyGoal) * 125.6, 125.6)} 125.6`}
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <span className="goal-pct">{Math.round((dailyIntake.calories / profile.dailyGoal) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="profile-menu animate-in-delay-3" id="profile-menu">
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <button className="menu-item" key={i}
                onClick={item.onToggle || item.action}
                id={`menu-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="menu-icon">
                  <Icon size={18} />
                </div>
                <div className="menu-info">
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-desc">{item.desc}</span>
                </div>
                {item.toggle ? (
                  <div className={`toggle ${item.enabled ? 'active' : ''}`}>
                    <div className="toggle-dot" />
                  </div>
                ) : (
                  <ChevronRight size={16} className="menu-arrow" />
                )}
              </button>
            )
          })}
        </div>

        <button className="logout-btn" id="btn-logout">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  )
}
