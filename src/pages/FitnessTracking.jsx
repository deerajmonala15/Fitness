import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { ArrowLeft, Footprints, Flame, Timer, TrendingUp, Plus, Check, Dumbbell, Heart, Zap, MapPin } from 'lucide-react'
import './FitnessTracking.css'

const workoutLogs = [
  { id: 1, name: 'Upper Body Strength', type: 'strength', duration: '45 min', calories: 320, exercises: 6, time: 'Today, 7:00 AM', completed: true },
  { id: 2, name: 'Morning Jog', type: 'cardio', duration: '30 min', calories: 280, exercises: 1, time: 'Today, 6:00 AM', completed: true },
  { id: 3, name: 'HIIT Blast', type: 'hiit', duration: '20 min', calories: 250, exercises: 8, time: 'Yesterday', completed: true },
  { id: 4, name: 'Leg Day', type: 'strength', duration: '50 min', calories: 380, exercises: 7, time: 'Yesterday', completed: true },
  { id: 5, name: 'Evening Yoga', type: 'flexibility', duration: '30 min', calories: 120, exercises: 12, time: '2 days ago', completed: true },
]

const typeIcons = {
  strength: Dumbbell,
  cardio: Heart,
  hiit: Zap,
  flexibility: MapPin,
}

const typeColors = {
  strength: 'purple',
  cardio: 'red',
  hiit: 'orange',
  flexibility: 'cyan',
}

export default function FitnessTracking() {
  const { setCurrentPage } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState('overview')

  const stepsData = {
    current: 6420,
    goal: 10000,
    distance: '4.2 km',
    avgPace: '8:30 /km',
  }

  const caloriesBurned = {
    today: 420,
    goal: 750,
    active: 320,
    resting: 100,
  }

  const weeklyData = [
    { day: 'Mon', steps: 8200, cal: 520 },
    { day: 'Tue', steps: 6800, cal: 380 },
    { day: 'Wed', steps: 9100, cal: 610 },
    { day: 'Thu', steps: 7400, cal: 450 },
    { day: 'Fri', steps: 5200, cal: 320 },
    { day: 'Sat', steps: 10200, cal: 680 },
    { day: 'Sun', steps: 6420, cal: 420 },
  ]

  const maxSteps = Math.max(...weeklyData.map(d => d.steps))

  return (
    <div className="fitness-page" id="fitness-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" onClick={() => setCurrentPage('home')} id="btn-back-fitness">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>Fitness</h1>
            <span className="subtitle">Activity Tracking</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" id="btn-add-workout">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="fitness-tabs" id="fitness-tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab ${activeTab === 'workouts' ? 'active' : ''}`} onClick={() => setActiveTab('workouts')}>Workouts</button>
      </div>

      <div className="fitness-content">
        {activeTab === 'overview' && (
          <>
            {/* Steps Counter */}
            <div className="steps-card card-glow animate-in" id="steps-counter">
              <div className="steps-ring-wrap">
                <svg viewBox="0 0 120 120" className="steps-ring-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="url(#stepsGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(stepsData.current / stepsData.goal) * 326.7} 326.7`}
                    transform="rotate(-90 60 60)"
                    className="steps-progress"
                  />
                  <defs>
                    <linearGradient id="stepsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#39ff14" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="steps-center">
                  <Footprints size={20} className="steps-icon" />
                  <span className="steps-num">{stepsData.current.toLocaleString()}</span>
                  <span className="steps-goal">/ {stepsData.goal.toLocaleString()}</span>
                </div>
              </div>
              <div className="steps-details">
                <div className="step-detail-item">
                  <MapPin size={14} />
                  <span>{stepsData.distance}</span>
                </div>
                <div className="step-detail-item">
                  <Timer size={14} />
                  <span>{stepsData.avgPace}</span>
                </div>
              </div>
            </div>

            {/* Calories Burned */}
            <div className="burn-card card animate-in-delay-1" id="calories-burned">
              <div className="burn-header">
                <div className="burn-icon-wrap">
                  <Flame size={20} />
                </div>
                <div className="burn-info">
                  <span className="burn-label">Calories Burned</span>
                  <div className="burn-values">
                    <span className="burn-current">{caloriesBurned.today}</span>
                    <span className="burn-goal">/ {caloriesBurned.goal} kcal</span>
                  </div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(caloriesBurned.today / caloriesBurned.goal) * 100}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />
              </div>
              <div className="burn-split">
                <div className="burn-split-item">
                  <span className="bsi-label">Active</span>
                  <span className="bsi-value">{caloriesBurned.active} kcal</span>
                </div>
                <div className="burn-split-item">
                  <span className="bsi-label">Resting</span>
                  <span className="bsi-value">{caloriesBurned.resting} kcal</span>
                </div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="weekly-card card animate-in-delay-2" id="weekly-chart">
              <h3 className="section-title">
                Weekly Steps
                <span className="see-all"><TrendingUp size={14} /></span>
              </h3>
              <div className="weekly-chart">
                {weeklyData.map((day, i) => (
                  <div className="chart-bar-wrap" key={i}>
                    <div className="chart-bar">
                      <div
                        className="chart-fill"
                        style={{ height: `${(day.steps / maxSteps) * 100}%` }}
                      />
                    </div>
                    <span className="chart-day">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'workouts' && (
          <div className="workout-logs animate-in">
            <h3 className="section-title">Recent Workouts</h3>
            {workoutLogs.map((log, i) => {
              const Icon = typeIcons[log.type] || Dumbbell
              const color = typeColors[log.type] || 'purple'
              return (
                <div className="workout-item card" key={log.id} id={`workout-${log.id}`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={`workout-icon-wrap ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="workout-info">
                    <span className="workout-name">{log.name}</span>
                    <span className="workout-time">{log.time}</span>
                  </div>
                  <div className="workout-stats">
                    <div className="ws-item">
                      <Timer size={12} />
                      <span>{log.duration}</span>
                    </div>
                    <div className="ws-item">
                      <Flame size={12} />
                      <span>{log.calories} kcal</span>
                    </div>
                  </div>
                  {log.completed && (
                    <div className="workout-check">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
