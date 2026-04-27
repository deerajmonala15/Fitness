import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { ShoppingCart, Star, Clock, Flame, Check, Filter, Beef, Salad, Dumbbell, Fish, Egg, Croissant, Drumstick, Utensils } from 'lucide-react'
import './Orders.css'

const meals = [
  { id: 1, name: 'Grilled Chicken Bowl', desc: 'Brown rice, grilled chicken, avocado, veggies', price: 299, calories: 520, protein: 48, rating: 4.8, time: '25 min', category: 'muscle', img: <Drumstick size={32} color="var(--accent)" /> },
  { id: 2, name: 'Protein Power Bowl', desc: 'Quinoa, salmon, edamame, sesame dressing', price: 349, calories: 580, protein: 52, rating: 4.9, time: '30 min', category: 'muscle', img: <Fish size={32} color="var(--blue)" /> },
  { id: 3, name: 'Lean Turkey Wrap', desc: 'Whole wheat wrap, turkey, greens, hummus', price: 199, calories: 340, protein: 35, rating: 4.6, time: '15 min', category: 'loss', img: <Utensils size={32} color="var(--orange)" /> },
  { id: 4, name: 'Egg White Omelette', desc: 'Egg whites, spinach, mushroom, feta cheese', price: 149, calories: 220, protein: 28, rating: 4.7, time: '20 min', category: 'loss', img: <Egg size={32} color="var(--yellow)" /> },
  { id: 5, name: 'Steak & Sweet Potato', desc: 'Lean steak, roasted sweet potato, greens', price: 399, calories: 620, protein: 55, rating: 4.9, time: '35 min', category: 'muscle', img: <Beef size={32} color="var(--red)" /> },
  { id: 6, name: 'Green Detox Salad', desc: 'Kale, apple, nuts, lemon vinaigrette', price: 249, calories: 280, protein: 12, rating: 4.5, time: '10 min', category: 'loss', img: <Salad size={32} color="var(--green)" /> },
  { id: 7, name: 'Protein Pancakes', desc: 'Oat flour, protein powder, banana, berries', price: 279, calories: 380, protein: 32, rating: 4.7, time: '20 min', category: 'muscle', img: <Croissant size={32} color="var(--orange)" /> },
  { id: 8, name: 'Tuna Poke Bowl', desc: 'Sushi rice, fresh tuna, cucumber, soy sauce', price: 329, calories: 420, protein: 38, rating: 4.8, time: '15 min', category: 'loss', img: <Fish size={32} color="var(--cyan)" /> },
]

export default function Orders() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filteredMeals = activeCategory === 'all' ? meals : meals.filter(m => m.category === activeCategory)

  const addToCart = (meal) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === meal.id)
      if (exists) {
        return prev.map(i => i.id === meal.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...meal, qty: 1 }]
    })
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="orders-page" id="orders-page">
      <div className="page-header">
        <div>
          <h1>Healthy Meals</h1>
          <span className="subtitle">Protein-Rich Options</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setShowCart(!showCart)} id="btn-cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filters" id="category-filters">
        <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
          <Filter size={14} /> All
        </button>
        <button className={`filter-btn ${activeCategory === 'muscle' ? 'active' : ''}`} onClick={() => setActiveCategory('muscle')}>
          <Dumbbell size={14} /> Muscle Gain
        </button>
        <button className={`filter-btn ${activeCategory === 'loss' ? 'active' : ''}`} onClick={() => setActiveCategory('loss')}>
          <Salad size={14} /> Weight Loss
        </button>
      </div>

      {/* Cart Panel */}
      {showCart && cart.length > 0 && (
        <div className="cart-panel glass animate-in" id="cart-panel">
          <h3>Your Cart</h3>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <span className="cart-emoji">{item.img}</span>
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-qty">x{item.qty}</span>
              </div>
              <span className="cart-item-price">₹{(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <strong>₹{cartTotal}</strong>
          </div>
          <button className="btn-primary cart-checkout" id="btn-checkout">
            <Check size={16} /> Place Order
          </button>
        </div>
      )}

      {/* Meal Cards */}
      <div className="meals-grid">
        {filteredMeals.map((meal, i) => (
          <div className="meal-card card animate-in" key={meal.id} id={`meal-${meal.id}`} style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="meal-emoji">{meal.img}</div>
            <div className="meal-info">
              <div className="meal-top">
                <h4 className="meal-name">{meal.name}</h4>
                <div className="meal-rating">
                  <Star size={12} fill="#eab308" stroke="#eab308" />
                  <span>{meal.rating}</span>
                </div>
              </div>
              <p className="meal-desc">{meal.desc}</p>
              <div className="meal-meta">
                <span className="meal-meta-item">
                  <Flame size={12} /> {meal.calories} kcal
                </span>
                <span className="meal-meta-item">
                  <Beef size={12} /> {meal.protein}g protein
                </span>
                <span className="meal-meta-item">
                  <Clock size={12} /> {meal.time}
                </span>
              </div>
              <div className="meal-bottom">
                <span className="meal-price">₹{meal.price}</span>
                <button className="add-btn" onClick={() => addToCart(meal)}>
                  <ShoppingCart size={14} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
