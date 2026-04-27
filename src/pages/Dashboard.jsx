import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { Flame, Footprints, Droplets, TrendingUp, Zap, Dumbbell, Apple, Clock, Plus, Minus } from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  const { dailyIntake, setDailyIntake, profile, scannedFoods, setCurrentPage } = useContext(AppContext)

  const caloriePercent = Math.min((dailyIntake.calories / profile.dailyGoal) * 100, 100)
  const proteinGoal = 120
  const carbsGoal = 250
  const fatsGoal = 65
  const stepsCount = 6420
  const stepsGoal = 10000
  const caloriesBurned = 420
  const waterGlasses = dailyIntake.water
  const waterGoal = 8

  return (
    <div className="dashboard" id="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <span className="subtitle">Today's Overview</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setCurrentPage('fitness')} id="btn-fitness-nav">
            <Dumbbell size={18} />
          </button>
        </div>
      </div>

      <div className="dash-content">
        {/* Calorie Ring */}
        <div className="calorie-ring-card card-glow animate-in" id="calorie-ring">
          <div className="ring-container">
            <svg viewBox="0 0 140 140" className="ring-svg">
              <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(57,255,20,0.08)" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="60"
                fill="none"
                stroke="url(#calorieGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${caloriePercent * 3.77} ${377 - caloriePercent * 3.77}`}
                strokeDashoffset="94.25"
                className="ring-progress"
              />
              <defs>
                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39ff14" />
                  <stop offset="100%" stopColor="#7cff6b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-center">
              <span className="ring-value">{dailyIntake.calories}</span>
              <span className="ring-label">of {profile.dailyGoal}</span>
              <span className="ring-unit">kcal</span>
            </div>
          </div>
          <div className="ring-legend">
            <div className="legend-item">
              <Flame size={14} className="legend-icon consumed" />
              <span>Consumed</span>
              <strong>{dailyIntake.calories}</strong>
            </div>
            <div className="legend-item">
              <TrendingUp size={14} className="legend-icon burned" />
              <span>Burned</span>
              <strong>{caloriesBurned}</strong>
            </div>
            <div className="legend-item">
              <Zap size={14} className="legend-icon remaining" />
              <span>Remaining</span>
              <strong>{Math.max(0, profile.dailyGoal - dailyIntake.calories + caloriesBurned)}</strong>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid animate-in-delay-1">
          <div className="stat-card" id="stat-steps">
            <div className="stat-icon-wrap steps">
              <Footprints size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stepsCount.toLocaleString()}</span>
              <span className="stat-label">Steps</span>
            </div>
            <div className="mini-progress">
              <div className="mini-fill" style={{ width: `${(stepsCount / stepsGoal) * 100}%`, background: 'var(--cyan)' }} />
            </div>
          </div>

          <div className="stat-card" id="stat-burned">
            <div className="stat-icon-wrap burned">
              <Flame size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{caloriesBurned}</span>
              <span className="stat-label">Burned</span>
            </div>
            <div className="mini-progress">
              <div className="mini-fill" style={{ width: '56%', background: 'var(--orange)' }} />
            </div>
          </div>

          <div className="stat-card" id="stat-water">
            <div className="stat-icon-wrap water">
              <Droplets size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{waterGlasses}/{waterGoal}</span>
              <span className="stat-label">Water</span>
            </div>
            <div className="mini-progress">
              <div className="mini-fill" style={{ width: `${(waterGlasses / waterGoal) * 100}%`, background: 'var(--blue)' }} />
            </div>
          </div>

          <div className="stat-card" id="stat-workout">
            <div className="stat-icon-wrap workout">
              <Dumbbell size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-value">45</span>
              <span className="stat-label">Min Active</span>
            </div>
            <div className="mini-progress">
              <div className="mini-fill" style={{ width: '75%', background: 'var(--purple)' }} />
            </div>
          </div>
        </div>

        {/* Water Tracker */}
        <div className="water-tracker card animate-in-delay-1" id="water-tracker">
          <div className="water-header">
            <div className="water-title-row">
              <Droplets size={16} className="water-icon" />
              <span className="water-title">Water Intake</span>
            </div>
            <span className="water-count">{waterGlasses} / {waterGoal} glasses</span>
          </div>
          <div className="water-glasses-row">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <div key={i} className={`water-glass ${i < waterGlasses ? 'filled' : ''}`}>
                <Droplets size={14} />
              </div>
            ))}
          </div>
          <div className="water-btns">
            <button
              className="water-btn minus"
              onClick={() => setDailyIntake(prev => ({ ...prev, water: Math.max(0, prev.water - 1) }))}
              disabled={waterGlasses <= 0}
              id="btn-water-minus"
            >
              <Minus size={14} />
            </button>
            <div className="progress-bar" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${(waterGlasses / waterGoal) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
            </div>
            <button
              className="water-btn plus"
              onClick={() => setDailyIntake(prev => ({ ...prev, water: Math.min(waterGoal, prev.water + 1) }))}
              disabled={waterGlasses >= waterGoal}
              id="btn-water-plus"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Macro Breakdown */}
        <div className="macro-section animate-in-delay-2">
          <h3 className="section-title">Macro Breakdown</h3>
          <div className="macro-cards">
            <div className="macro-card-d" id="macro-protein">
              <div className="macro-header-d">
                <span className="macro-name-d">Protein</span>
                <span className="macro-amount-d">{dailyIntake.protein}g / {proteinGoal}g</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(dailyIntake.protein / proteinGoal) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} />
              </div>
            </div>
            <div className="macro-card-d" id="macro-carbs">
              <div className="macro-header-d">
                <span className="macro-name-d">Carbs</span>
                <span className="macro-amount-d">{dailyIntake.carbs}g / {carbsGoal}g</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(dailyIntake.carbs / carbsGoal) * 100}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />
              </div>
            </div>
            <div className="macro-card-d" id="macro-fats">
              <div className="macro-header-d">
                <span className="macro-name-d">Fats</span>
                <span className="macro-amount-d">{dailyIntake.fats}g / {fatsGoal}g</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(dailyIntake.fats / fatsGoal) * 100}%`, background: 'linear-gradient(90deg, #a855f7, #c084fc)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Foods */}
        <div className="recent-foods animate-in-delay-3">
          <h3 className="section-title">
            Today's Intake
            <span className="see-all" onClick={() => setCurrentPage('home')}>+ Scan More</span>
          </h3>
          <div className="food-list">
            {scannedFoods.map((food, i) => (
              <div className="food-item" key={i} id={`food-item-${i}`}>
                <div className="food-icon-wrap">
                  <Apple size={16} />
                </div>
                <div className="food-details">
                  <span className="food-name">{food.name}</span>
                  <span className="food-meta">
                    <Clock size={10} /> {food.time} · {food.grams}g
                  </span>
                </div>
                <div className="food-cals">
                  <span className="food-cal-val">{food.calories}</span>
                  <span className="food-cal-unit">kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
