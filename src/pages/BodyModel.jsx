import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { ArrowLeft, X, RefreshCcw, Dumbbell, ChevronRight } from 'lucide-react'
import './BodyModel.css'

const exerciseDatabase = {
  'chest':          { name: 'Chest',         sub: 'Pectorals',          tip: 'Train 2x/week for best growth',  list: ['Bench Press', 'Cable Flyes', 'Push-Ups', 'Dumbbell Press'] },
  'front-deltoids': { name: 'Shoulders',     sub: 'Front Deltoids',     tip: 'Pairs with push day',            list: ['Overhead Press', 'Front Raises', 'Arnold Press', 'Lateral Raises'] },
  'biceps':         { name: 'Biceps',        sub: 'Biceps Brachii',     tip: 'Mind-muscle connection is key',  list: ['Barbell Curls', 'Hammer Curls', 'Preacher Curls', 'Cable Curls'] },
  'triceps':        { name: 'Triceps',       sub: 'Triceps Brachii',    tip: '2/3 of total arm mass',          list: ['Skull Crushers', 'Rope Pushdowns', 'Dips', 'Close-Grip Bench'] },
  'abs':            { name: 'Core',          sub: 'Rectus Abdominis',   tip: 'Abs are made in the kitchen',    list: ['Crunches', 'Planks', 'Leg Raises', 'Cable Crunches'] },
  'obliques':       { name: 'Obliques',      sub: 'Side Core',          tip: 'Key for waist definition',       list: ['Russian Twists', 'Side Planks', 'Bicycle Crunches'] },
  'quadriceps':     { name: 'Quads',         sub: 'Quadriceps',         tip: 'Biggest muscle group in body',   list: ['Squats', 'Leg Press', 'Leg Extensions', 'Walking Lunges'] },
  'adductor':       { name: 'Inner Thigh',   sub: 'Adductors',          tip: 'Crucial for hip stability',      list: ['Sumo Squats', 'Adductor Machine', 'Side Lunges'] },
  'calves':         { name: 'Calves',        sub: 'Gastrocnemius',      tip: 'Use high reps (15–20)',           list: ['Calf Raises', 'Jump Rope', 'Box Jumps'] },
  'trapezius':      { name: 'Traps',         sub: 'Trapezius',          tip: 'Upper back powerhouse',          list: ['Shrugs', 'Upright Rows', 'Face Pulls'] },
  'upper-back':     { name: 'Back',          sub: 'Latissimus Dorsi',   tip: 'V-taper muscle',                 list: ['Pull-Ups', 'Lat Pulldown', 'Bent-Over Rows'] },
  'back-deltoids':  { name: 'Rear Delts',    sub: 'Post. Deltoids',     tip: 'Often skipped, always needed',   list: ['Face Pulls', 'Rear Delt Flyes', 'Reverse Pec Deck'] },
  'lower-back':     { name: 'Lower Back',    sub: 'Erector Spinae',     tip: 'Core stability foundation',      list: ['Deadlifts', 'Back Extensions', 'Good Mornings'] },
  'gluteal':        { name: 'Glutes',        sub: 'Gluteus Maximus',    tip: 'Largest single muscle',          list: ['Hip Thrusts', 'Glute Bridges', 'Romanian DL', 'Donkey Kicks'] },
  'hamstring':      { name: 'Hamstrings',    sub: 'Biceps Femoris',     tip: 'Injury prevention muscle',       list: ['Romanian Deadlifts', 'Leg Curls', 'Nordic Curls'] },
  'abductors':      { name: 'Outer Thigh',   sub: 'Abductors',          tip: 'Hip stability & shape',          list: ['Clamshells', 'Fire Hydrants', 'Cable Kickbacks'] },
  'forearm':        { name: 'Forearms',      sub: 'Brachioradialis',    tip: 'Grip strength matters',          list: ['Wrist Curls', 'Reverse Curls', 'Farmers Walk'] },
}

// x%, y% positions as percentage of the image container
// Body silhouette in AI images spans roughly x: 36%–64% (arms included)
const muscleSpots = {
  male: {
    // FRONT VIEW — only muscles visible from the anterior
    anterior: [
      { id: 'chest',          x: 50,  y: 28 },
      { id: 'front-deltoids', x: 36,  y: 22 },   // shoulder cap, front
      { id: 'biceps',         x: 33,  y: 34 },   // front of left upper arm
      { id: 'abs',            x: 50,  y: 44 },
      { id: 'obliques',       x: 40,  y: 46 },
      { id: 'quadriceps',     x: 42,  y: 63 },
      { id: 'adductor',       x: 51,  y: 65 },
      { id: 'calves',         x: 42,  y: 82 },
    ],
    // BACK VIEW — only muscles visible from the posterior
    posterior: [
      { id: 'trapezius',      x: 50,  y: 20 },
      { id: 'upper-back',     x: 50,  y: 30 },
      { id: 'back-deltoids',  x: 36,  y: 22 },   // shoulder cap, back
      { id: 'triceps',        x: 33,  y: 34 },   // BACK of left upper arm
      { id: 'forearm',        x: 33,  y: 45 },
      { id: 'lower-back',     x: 50,  y: 40 },
      { id: 'gluteal',        x: 50,  y: 52 },
      { id: 'hamstring',      x: 42,  y: 64 },
      { id: 'abductors',      x: 38,  y: 62 },
      { id: 'calves',         x: 42,  y: 81 },
    ],
  },
  female: {
    // FRONT VIEW — only muscles visible from the anterior
    anterior: [
      { id: 'chest',          x: 50,  y: 27 },
      { id: 'front-deltoids', x: 37,  y: 21 },
      { id: 'biceps',         x: 34,  y: 33 },
      { id: 'abs',            x: 50,  y: 43 },
      { id: 'obliques',       x: 41,  y: 45 },
      { id: 'quadriceps',     x: 42,  y: 62 },
      { id: 'adductor',       x: 51,  y: 64 },
      { id: 'calves',         x: 42,  y: 81 },
    ],
    // BACK VIEW — only muscles visible from the posterior
    posterior: [
      { id: 'trapezius',      x: 50,  y: 19 },
      { id: 'upper-back',     x: 50,  y: 29 },
      { id: 'back-deltoids',  x: 37,  y: 21 },
      { id: 'triceps',        x: 34,  y: 33 },   // back of left upper arm
      { id: 'lower-back',     x: 50,  y: 39 },
      { id: 'gluteal',        x: 50,  y: 52 },
      { id: 'hamstring',      x: 42,  y: 63 },
      { id: 'abductors',      x: 39,  y: 61 },
      { id: 'calves',         x: 42,  y: 80 },
    ],
  },
}


export default function BodyModel() {
  const { setCurrentPage } = useContext(AppContext)
  const [gender,   setGender]   = useState('male')
  const [view,     setView]     = useState('anterior')
  const [selected, setSelected] = useState(null)

  const spots = muscleSpots[gender][view]
  const bodyImg = `/${gender}-${view === 'anterior' ? 'front' : 'back'}.png`

  const toggleView   = () => { setView(v => v === 'anterior' ? 'posterior' : 'anterior'); setSelected(null) }
  const pickGender   = g  => { setGender(g); setSelected(null) }

  return (
    <div className="bodymodel-page" id="bodymodel-page">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" onClick={() => setCurrentPage('home')} id="btn-back-model">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Muscle Map</h1>
            <span className="subtitle">Tap any muscle to explore</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="body-controls">
        <div className="gender-toggle">
          <button className={`gender-btn ${gender === 'male'   ? 'active' : ''}`} onClick={() => pickGender('male')}>
            <span className="gender-icon">♂</span> Male
          </button>
          <button className={`gender-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => pickGender('female')}>
            <span className="gender-icon">♀</span> Female
          </button>
        </div>
        <button className="view-toggle-btn" onClick={toggleView}>
          <RefreshCcw size={13} />
          {view === 'anterior' ? 'Back View' : 'Front View'}
        </button>
      </div>

      {/* View pill */}
      <div className="view-label">
        <span className="view-pill">
          {view === 'anterior' ? '↑ Anterior · Front' : '↑ Posterior · Back'}
        </span>
      </div>

      <div className="model-content">
        {/* Body image with hotspot dots */}
        <div className="body-map-container" id="body-figure">
          <div className="body-image-wrap">
            <img
              src={bodyImg}
              alt={`${gender} ${view} body`}
              className="body-image"
              draggable={false}
            />
            {spots.map(s => {
              const info = exerciseDatabase[s.id]
              const isActive = selected?.id === s.id
              return (
                <button
                  key={s.id}
                  className={`muscle-dot ${isActive ? 'active' : ''}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  onClick={() => setSelected(isActive ? null : { ...s, ...info })}
                  title={info?.name}
                >
                  <span className="dot-core" />
                  <span className="dot-ring" />
                </button>
              )
            })}
          </div>

          <div className="map-legend">
            <span className="legend-pill"><span className="lp-dot" />Tap to explore</span>
            <span className="legend-pill"><span className="lp-dot active-lp" />Selected</span>
          </div>
        </div>

        {/* Muscle detail card */}
        {selected ? (
          <div className="muscle-detail-card animate-in" id="muscle-detail-panel">
            <div className="mdc-header">
              <div className="mdc-icon-wrap"><Dumbbell size={18} /></div>
              <div className="mdc-title">
                <h3>{selected.name}</h3>
                <span>{selected.sub}</span>
              </div>
              <button className="icon-btn" onClick={() => setSelected(null)}><X size={16} /></button>
            </div>
            {selected.tip && <div className="mdc-tip">💡 {selected.tip}</div>}
            <div className="mdc-exercises">
              <p className="mdc-section-label">Recommended Exercises</p>
              {selected.list.map((ex, i) => (
                <div className="mdc-exercise-row" key={i}>
                  <span className="mdc-ex-num">{i + 1}</span>
                  <span className="mdc-ex-name">{ex}</span>
                  <ChevronRight size={14} className="mdc-ex-arrow" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="muscle-empty-state">
            <Dumbbell size={28} color="var(--text-muted)" />
            <p>Select a muscle group to see targeted exercises</p>
          </div>
        )}
      </div>
    </div>
  )
}
