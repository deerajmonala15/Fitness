import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { Upload, Camera, Target, Heart, Activity, TrendingUp, Scale, Ruler, Brain } from 'lucide-react'
import './BodyAnalysis.css'

export default function BodyAnalysis() {
  const { profile, setCurrentPage } = useContext(AppContext)
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1)
  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
  const bodyType = bmi < 18.5 ? 'Ectomorph' : bmi < 25 ? 'Mesomorph' : 'Endomorph'

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  return (
    <div className="body-analysis" id="body-analysis-page">
      <div className="page-header">
        <div>
          <h1>Body Analysis</h1>
          <span className="subtitle">AI-Powered Assessment</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setCurrentPage('bodymodel')} id="btn-3d-model">
            <Brain size={18} />
          </button>
        </div>
      </div>

      <div className="body-content">
        {/* Upload Section */}
        <div className="upload-section card animate-in" id="upload-section">
          {!analyzed && !analyzing ? (
            <>
              <div className="upload-area">
                <div className="upload-icon-ring">
                  <Camera size={28} />
                </div>
                <h3>Upload Full Body Photo</h3>
                <p>Our AI will analyze your body composition</p>
              </div>
              <div className="upload-actions">
                <button className="btn-primary" onClick={handleAnalyze} id="btn-analyze">
                  <Upload size={16} /> Upload & Analyze
                </button>
                <button className="btn-secondary" onClick={handleAnalyze} id="btn-camera-analyze">
                  <Camera size={16} /> Take Photo
                </button>
              </div>
            </>
          ) : analyzing ? (
            <div className="analyzing-state">
              <div className="analyze-loader">
                <div className="loader-ring" />
                <Activity size={24} className="loader-icon" />
              </div>
              <h3>Analyzing Body Composition...</h3>
              <p>AI is processing your photo</p>
              <div className="analyze-steps">
                <div className="analyze-step done">
                  <div className="step-dot" />
                  <span>Body detection</span>
                </div>
                <div className="analyze-step active">
                  <div className="step-dot" />
                  <span>Composition analysis</span>
                </div>
                <div className="analyze-step">
                  <div className="step-dot" />
                  <span>Health assessment</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {analyzed && (
          <>
            {/* Result Cards */}
            <div className="analysis-results animate-in">
              {/* Body Type */}
              <div className="result-card body-type-card" id="body-type-result">
                <div className="result-badge">
                  <Target size={16} />
                  <span>Body Type</span>
                </div>
                <div className="body-type-display">
                  <div className="body-silhouette">
                    <div className="silhouette-body">
                      <div className="sil-head" />
                      <div className="sil-torso" />
                      <div className="sil-legs" />
                    </div>
                  </div>
                  <div className="body-type-info">
                    <h2 className="gradient-text">{bodyType}</h2>
                    <span className="body-type-desc">
                      {bodyType === 'Ectomorph' && 'Lean build, fast metabolism'}
                      {bodyType === 'Mesomorph' && 'Athletic build, gains muscle easily'}
                      {bodyType === 'Endomorph' && 'Wider build, stores fat easily'}
                    </span>
                  </div>
                </div>
              </div>

              {/* BMI Card */}
              <div className="result-card bmi-card" id="bmi-result">
                <div className="result-badge">
                  <Scale size={16} />
                  <span>BMI Score</span>
                </div>
                <div className="bmi-display">
                  <div className="bmi-value-wrap">
                    <span className="bmi-number">{bmi}</span>
                    <span className="bmi-category" data-cat={bmiCategory.toLowerCase()}>{bmiCategory}</span>
                  </div>
                  <div className="bmi-scale">
                    <div className="bmi-zones">
                      <div className="bmi-zone under" />
                      <div className="bmi-zone normal" />
                      <div className="bmi-zone over" />
                      <div className="bmi-zone obese" />
                    </div>
                    <div className="bmi-indicator" style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }} />
                    <div className="bmi-labels">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="body-stats-grid animate-in-delay-1">
                <div className="body-stat" id="body-stat-height">
                  <Ruler size={16} className="body-stat-icon" />
                  <span className="body-stat-val">{profile.height} cm</span>
                  <span className="body-stat-lbl">Height</span>
                </div>
                <div className="body-stat" id="body-stat-weight">
                  <Scale size={16} className="body-stat-icon" />
                  <span className="body-stat-val">{profile.weight} kg</span>
                  <span className="body-stat-lbl">Weight</span>
                </div>
                <div className="body-stat" id="body-stat-bf">
                  <Activity size={16} className="body-stat-icon" />
                  <span className="body-stat-val">18%</span>
                  <span className="body-stat-lbl">Body Fat</span>
                </div>
              </div>

              {/* Health Condition */}
              <div className="health-card card animate-in-delay-2" id="health-condition">
                <div className="result-badge">
                  <Heart size={16} />
                  <span>Health Condition</span>
                </div>
                <div className="health-status">
                  <div className="health-indicator good">
                    <div className="health-pulse" />
                    Good
                  </div>
                  <p>Your health metrics are within a healthy range. Maintaining regular exercise and balanced nutrition is recommended.</p>
                </div>
              </div>

              {/* Suggested Goal */}
              <div className="goal-card card-glow animate-in-delay-3" id="suggested-goal">
                <div className="result-badge">
                  <TrendingUp size={16} />
                  <span>Suggested Goal</span>
                </div>
                <div className="goal-content">
                  <h3>{profile.goal}</h3>
                  <p>Based on your body analysis, we recommend focusing on {profile.goal.toLowerCase()} with a structured meal plan and workout routine.</p>
                  <div className="goal-tags">
                    <span className="chip">High Protein</span>
                    <span className="chip">Strength Training</span>
                    <span className="chip">Progressive Overload</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
