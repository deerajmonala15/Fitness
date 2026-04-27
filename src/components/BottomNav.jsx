import { useContext } from 'react'
import { AppContext } from '../App'
import { Home, LayoutDashboard, User, ShoppingBag, ScanLine } from 'lucide-react'
import './BottomNav.css'

const navItems = [
  { id: 'home', icon: Home, label: 'Scan' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'body', icon: ScanLine, label: 'Body' },
  { id: 'orders', icon: ShoppingBag, label: 'Orders' },
  { id: 'profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const { currentPage, setCurrentPage } = useContext(AppContext)

  return (
    <nav className="bottom-nav glass" id="bottom-navigation">
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = currentPage === item.id
        return (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <div className="nav-icon-wrap">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              {isActive && <div className="nav-glow" />}
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
