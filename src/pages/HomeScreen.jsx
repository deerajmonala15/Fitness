import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { Zap, Bell, ChefHat, Dumbbell, Plus, Lightbulb, ShoppingCart, X, Check, Sparkles } from 'lucide-react'
import './HomeScreen.css'

const foodDatabase = [
  { name: 'Grilled Chicken Breast', calories: 284, protein: 53, carbs: 0, fats: 6, grams: 200 },
  { name: 'Salmon Fillet', calories: 367, protein: 40, carbs: 0, fats: 22, grams: 200 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4, grams: 118 },
  { name: 'Avocado Toast', calories: 290, protein: 8, carbs: 28, fats: 18, grams: 180 },
  { name: 'Greek Yogurt', calories: 130, protein: 10, carbs: 17, fats: 4, grams: 150 },
  { name: 'Mixed Salad', calories: 85, protein: 4, carbs: 12, fats: 3, grams: 200 },
  { name: 'Protein Shake', calories: 220, protein: 30, carbs: 18, fats: 5, grams: 350 },
  { name: 'Brown Rice Bowl', calories: 216, protein: 5, carbs: 45, fats: 2, grams: 200 },
  { name: 'Egg Omelette', calories: 234, protein: 16, carbs: 2, fats: 18, grams: 150 },
  { name: 'Sweet Potato', calories: 103, protein: 2, carbs: 24, fats: 0, grams: 130 },
]

export default function HomeScreen() {
  const { addToIntake, setCurrentPage } = useContext(AppContext)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scannedFood, setScannedFood] = useState(null)
  const [showAdded, setShowAdded] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const startScan = () => {
    setIsScanning(true)
    setScanComplete(false)
    setScanProgress(0)
    setShowAdded(false)

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    setTimeout(() => {
      clearInterval(interval)
      setScanProgress(100)
      const food = foodDatabase[Math.floor(Math.random() * foodDatabase.length)]
      setScannedFood({ ...food, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
      setIsScanning(false)
      setScanComplete(true)
    }, 1800)
  }

  const handleAddToIntake = () => {
    if (scannedFood) {
      addToIntake(scannedFood)
      setShowAdded(true)
      setTimeout(() => setShowAdded(false), 2000)
    }
  }

  const resetScan = () => {
    setScanComplete(false)
    setScannedFood(null)
    setShowAdded(false)
    setScanProgress(0)
  }

  return (
    <div className="home-screen" id="home-screen">
      {/* Camera Background Simulation */}
      <div className="camera-bg">
        <div className="camera-noise" />
        <div className="camera-vignette" />
        <div className="grid-overlay" />
      </div>

      {/* Top Bar */}
      <div className="scanner-top-bar">
        <div className="app-brand">
          <Zap size={20} className="brand-icon" />
          <span className="brand-text">FitScan</span>
          <span className="brand-ai">AI</span>
        </div>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setCurrentPage('cooking')} id="btn-cooking">
            <ChefHat size={18} />
          </button>
          <button className="icon-btn" onClick={() => setCurrentPage('notifications')} id="btn-notifications">
            <Bell size={18} />
            <span className="badge">3</span>
          </button>
        </div>
      </div>

      {/* Quick Access Pills */}
      <div className="quick-pills">
        <button className="pill" onClick={() => setCurrentPage('fitness')} id="btn-fitness-pill">
          <Dumbbell size={14} />
          <span>Fitness</span>
        </button>
        <button className="pill" onClick={() => setCurrentPage('bodymodel')} id="btn-bodymodel-pill">
          <Sparkles size={14} />
          <span>3D Body</span>
        </button>
        <button className="pill" onClick={() => setCurrentPage('cooking')} id="btn-cooking-pill">
          <ChefHat size={14} />
          <span>Recipes</span>
        </button>
      </div>

      {/* Scanner Area */}
      <div className="scanner-area">
        <div className={`scanner-frame ${isScanning ? 'scanning' : ''} ${scanComplete ? 'complete' : ''}`}>
          {/* Corner brackets */}
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
          
          {/* Scan line */}
          {isScanning && (
            <div className="scan-line-container">
              <div className="scan-line" style={{ top: `${scanProgress}%` }} />
            </div>
          )}

          {/* Center content */}
          {!isScanning && !scanComplete && (
            <div className="scanner-idle">
              <div className="scanner-crosshair">
                <div className="crosshair-h" />
                <div className="crosshair-v" />
              </div>
              <p className="scanner-hint">Point camera at food</p>
            </div>
          )}

          {isScanning && (
            <div className="scanner-active">
              <div className="scan-rings">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
              </div>
              <p className="scanning-text">Analyzing...</p>
              <div className="scan-progress-bar">
                <div className="scan-progress-fill" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          )}

          {scanComplete && scannedFood && (
            <div className="scan-result animate-in">
              <Check size={24} className="result-check" />
              <p className="result-name">{scannedFood.name}</p>
            </div>
          )}

          {/* Pulse rings */}
          {!isScanning && !scanComplete && (
            <div className="idle-pulse">
              <div className="pulse-ring pulse-1" />
              <div className="pulse-ring pulse-2" />
            </div>
          )}
        </div>
      </div>

      {/* Scan Button */}
      {!scanComplete && (
        <button
          className={`scan-button ${isScanning ? 'scanning' : ''}`}
          onClick={startScan}
          disabled={isScanning}
          id="btn-scan"
        >
          <div className="scan-btn-inner">
            {isScanning ? (
              <div className="scan-btn-loader" />
            ) : (
              <Zap size={24} />
            )}
          </div>
          <span>{isScanning ? 'Scanning...' : 'Tap to Scan'}</span>
        </button>
      )}

      {/* Scan Results Panel */}
      {scanComplete && scannedFood && (
        <div className="results-panel glass animate-in" id="scan-results">
          <div className="results-header">
            <div>
              <h3 className="results-food-name">{scannedFood.name}</h3>
              <span className="results-qty">{scannedFood.grams}g serving</span>
            </div>
            <button className="icon-btn" onClick={resetScan}>
              <X size={18} />
            </button>
          </div>

          {/* Calories + Macros Row */}
          <div className="results-row">
            <div className="result-cal-badge">
              <span className="cal-value">{scannedFood.calories}</span>
              <span className="cal-unit">kcal</span>
            </div>
            <div className="macro-rings">
              {[
                { label: 'Protein', val: scannedFood.protein, max: 60, color: '#3b82f6', unit: 'g' },
                { label: 'Carbs', val: scannedFood.carbs, max: 60, color: '#f97316', unit: 'g' },
                { label: 'Fats', val: scannedFood.fats, max: 30, color: '#a855f7', unit: 'g' },
              ].map((m, i) => {
                const pct = Math.min((m.val / m.max) * 100, 100)
                const r = 18
                const circ = 2 * Math.PI * r
                return (
                  <div className="macro-ring-item" key={i}>
                    <svg viewBox="0 0 44 44" width="44" height="44">
                      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle
                        cx="22" cy="22" r={r}
                        fill="none" stroke={m.color} strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                        transform="rotate(-90 22 22)"
                      />
                    </svg>
                    <span className="mr-val">{m.val}{m.unit}</span>
                    <span className="mr-label">{m.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="results-actions">
            <button className="btn-primary" onClick={handleAddToIntake} id="btn-add-intake">
              {showAdded ? <><Check size={16} /> Added!</> : <><Plus size={16} /> Add to Intake</>}
            </button>
            <div className="results-actions-row">
              <button className="btn-secondary" onClick={() => setCurrentPage('cooking')} id="btn-diet-advice">
                <Lightbulb size={16} /> Diet Advice
              </button>
              <button className="btn-outline" onClick={() => setCurrentPage('orders')} id="btn-order-alt">
                <ShoppingCart size={14} /> Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
