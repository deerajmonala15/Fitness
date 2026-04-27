import { useState, createContext, useEffect } from 'react'
import './App.css'
import BottomNav from './components/BottomNav'
import HomeScreen from './pages/HomeScreen'
import Dashboard from './pages/Dashboard'
import BodyAnalysis from './pages/BodyAnalysis'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import CookingAssistant from './pages/CookingAssistant'
import BodyModel from './pages/BodyModel'
import FitnessTracking from './pages/FitnessTracking'

export const AppContext = createContext()

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [dailyIntake, setDailyIntake] = useState({
    calories: 1240,
    protein: 68,
    carbs: 142,
    fats: 38,
    water: 4,
  })
  const [scannedFoods, setScannedFoods] = useState([
    { name: 'Grilled Chicken Breast', calories: 284, protein: 53, carbs: 0, fats: 6, grams: 200, time: '8:30 AM' },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fats: 2, grams: 200, time: '12:15 PM' },
    { name: 'Greek Yogurt', calories: 130, protein: 10, carbs: 17, fats: 4, grams: 150, time: '3:00 PM' },
  ])
  const [profile, setProfile] = useState({
    name: 'Alex',
    height: 175,
    weight: 72,
    age: 25,
    goal: 'Muscle Gain',
    dailyGoal: 2400,
  })
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'water',   title: 'Hydration Reminder',  message: 'Time to drink water! You\'ve had 4 of 8 glasses today.', time: '2 min ago',  read: false },
    { id: 2, type: 'workout', title: 'Workout Time',         message: 'Your scheduled leg day workout starts in 30 minutes.',  time: '28 min ago', read: false },
    { id: 3, type: 'protein', title: 'Protein Intake Low',   message: 'You\'re 52g short of your protein goal. Consider a protein shake!', time: '1 hr ago',  read: true },
    { id: 4, type: 'steps',   title: 'Step Goal Progress',   message: 'Great progress! 6,420 of 10,000 steps completed.',       time: '2 hrs ago',  read: true },
    { id: 5, type: 'water',   title: 'Hydration Reminder',   message: 'Have you had water in the last hour?',                   time: '3 hrs ago',  read: true },
  ])

  // ── Dark Mode ──────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // ── Activity Reminders ─────────────────────────────────────
  const [reminders, setReminders] = useState([
    { id: 'water',   label: 'Water Reminder',   freq: 'Every 1 hour',  type: 'water',   enabled: true },
    { id: 'workout', label: 'Workout Reminder', freq: 'Daily at 6 PM', type: 'workout', enabled: true },
    { id: 'protein', label: 'Protein Intake',   freq: '3 times/day',   type: 'protein', enabled: true },
  ])

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => {
      if (r.id !== id) return r
      const nowEnabled = !r.enabled
      // Fire a notification when enabling a reminder
      if (nowEnabled) {
        const labels = { water: 'Water Reminder', workout: 'Workout Reminder', protein: 'Protein Intake' }
        const msgs   = {
          water:   'Water reminder is now active. Stay hydrated! 💧',
          workout: 'Workout reminder set for daily at 6 PM. 💪',
          protein: 'Protein intake reminders activated (3x/day). 🥩',
        }
        setNotifications(prev => [{
          id:      Date.now(),
          type:    r.type,
          title:   labels[id],
          message: msgs[id],
          time:    'Just now',
          read:    false,
        }, ...prev])
      }
      return { ...r, enabled: nowEnabled }
    }))
  }

  const addToIntake = (food) => {
    setDailyIntake(prev => ({
      ...prev,
      calories: prev.calories + food.calories,
      protein: prev.protein + food.protein,
      carbs: prev.carbs + food.carbs,
      fats: prev.fats + food.fats,
    }))
    setScannedFoods(prev => [food, ...prev])
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeScreen />
      case 'dashboard': return <Dashboard />
      case 'body': return <BodyAnalysis />
      case 'orders': return <Orders />
      case 'profile': return <Profile />
      case 'notifications': return <Notifications />
      case 'cooking': return <CookingAssistant />
      case 'bodymodel': return <BodyModel />
      case 'fitness': return <FitnessTracking />
      default: return <HomeScreen />
    }
  }

  return (
    <AppContext.Provider value={{
    currentPage, setCurrentPage,
      dailyIntake, setDailyIntake,
      scannedFoods, setScannedFoods,
      profile, setProfile,
      notifications, setNotifications,
      addToIntake,
      darkMode, setDarkMode,
      reminders, toggleReminder,
    }}>
      <div className="app-container">
        <div className="page-content">
          {renderPage()}
        </div>
        <BottomNav />
      </div>
    </AppContext.Provider>
  )
}

export default App
