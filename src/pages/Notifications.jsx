import { useContext } from 'react'
import { AppContext } from '../App'
import { ArrowLeft, Droplets, Dumbbell, Beef, Footprints, Check, Trash2 } from 'lucide-react'
import './Notifications.css'

const typeIcons = {
  water:   Droplets,
  workout: Dumbbell,
  protein: Beef,
  steps:   Footprints,
}

const typeColors = {
  water:   'blue',
  workout: 'purple',
  protein: 'orange',
  steps:   'cyan',
}

const reminderIcons = {
  water:   Droplets,
  workout: Dumbbell,
  protein: Beef,
}

const reminderColors = {
  water:   'blue',
  workout: 'purple',
  protein: 'orange',
}

export default function Notifications() {
  const {
    notifications, setNotifications,
    setCurrentPage,
    reminders, toggleReminder,
  } = useContext(AppContext)

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const clearAll    = () => setNotifications([])
  const dismiss     = (id) => setNotifications(prev => prev.filter(n => n.id !== id))

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notifications-page" id="notifications-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" onClick={() => setCurrentPage('home')} id="btn-back-notif">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>Notifications</h1>
            <span className="subtitle">{unreadCount} unread</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={markAllRead} id="btn-mark-all-read" title="Mark all read">
            <Check size={18} />
          </button>
          <button className="icon-btn" onClick={clearAll} id="btn-clear-all" title="Clear all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="notif-content">
        {notifications.length === 0 ? (
          <div className="empty-state animate-in">
            <div className="empty-icon">🔔</div>
            <h3>All caught up!</h3>
            <p>No notifications at the moment</p>
          </div>
        ) : (
          <div className="notif-list">
            {notifications.map((notif, i) => {
              const Icon  = typeIcons[notif.type]  || Droplets
              const color = typeColors[notif.type] || 'blue'
              return (
                <div
                  className={`notif-item ${notif.read ? 'read' : 'unread'} animate-in`}
                  key={notif.id}
                  id={`notif-${notif.id}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setNotifications(prev =>
                    prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
                  )}
                >
                  <div className={`notif-icon-wrap ${color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="notif-body">
                    <div className="notif-top">
                      <span className="notif-title">{notif.title}</span>
                      {!notif.read && <div className="notif-dot" />}
                    </div>
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <button
                    className="notif-dismiss"
                    onClick={(e) => { e.stopPropagation(); dismiss(notif.id) }}
                    title="Dismiss"
                  >×</button>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Active Reminders (fully functional toggles) ── */}
        <div className="reminder-settings card animate-in-delay-2" id="reminder-settings">
          <h3 className="section-title">Activity Reminders</h3>
          <p className="reminder-subtitle">Toggle reminders on/off. Enabling fires a notification.</p>
          <div className="reminder-list">
            {reminders.map(r => {
              const Icon  = reminderIcons[r.type]  || Droplets
              const color = reminderColors[r.type] || 'blue'
              return (
                <div className={`reminder-item ${r.enabled ? 'enabled' : 'disabled'}`} key={r.id}>
                  <div className={`reminder-icon ${color}`}><Icon size={14} /></div>
                  <div className="reminder-info">
                    <span className="reminder-name">{r.label}</span>
                    <span className="reminder-freq">{r.freq}</span>
                  </div>
                  <button
                    className={`toggle ${r.enabled ? 'active' : ''}`}
                    onClick={() => toggleReminder(r.id)}
                    id={`toggle-reminder-${r.id}`}
                    aria-pressed={r.enabled}
                  >
                    <div className="toggle-dot" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
