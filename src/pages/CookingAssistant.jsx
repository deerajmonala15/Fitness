import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { ArrowLeft, Clock, Flame, Users, ChevronDown, ChevronUp, Play, ExternalLink, Star, BookOpen, Bot, Drumstick, Coffee, Fish } from 'lucide-react'
import './CookingAssistant.css'

const recipes = [
  {
    id: 1,
    name: 'High-Protein Chicken Stir Fry',
    emoji: <Drumstick size={28} color="var(--accent)" />,
    time: '25 min',
    calories: 380,
    protein: 42,
    servings: 2,
    rating: 4.8,
    difficulty: 'Easy',
    ingredients: ['300g chicken breast', '1 cup broccoli', '1 bell pepper', '2 tbsp soy sauce', '1 tbsp olive oil', '2 cloves garlic', 'Ginger, salt & pepper'],
    steps: ['Cut chicken into strips and season', 'Heat oil in wok, cook chicken 5 min', 'Add veggies, stir fry 3 min', 'Add soy sauce, garlic, ginger', 'Cook 2 more minutes, serve hot'],
    videoUrl: '#',
  },
  {
    id: 2,
    name: 'Greek Yogurt Protein Bowl',
    emoji: <Coffee size={28} color="var(--blue)" />,
    time: '5 min',
    calories: 320,
    protein: 35,
    servings: 1,
    rating: 4.9,
    difficulty: 'Easy',
    ingredients: ['200g Greek yogurt', '1 scoop protein powder', '1/2 cup granola', 'Mixed berries', '1 tbsp honey', 'Chia seeds'],
    steps: ['Add yogurt to bowl', 'Mix in protein powder', 'Top with granola and berries', 'Drizzle honey and sprinkle chia seeds'],
    videoUrl: '#',
  },
  {
    id: 3,
    name: 'Salmon with Quinoa & Avocado',
    emoji: <Fish size={28} color="var(--orange)" />,
    time: '30 min',
    calories: 520,
    protein: 45,
    servings: 2,
    rating: 4.7,
    difficulty: 'Medium',
    ingredients: ['2 salmon fillets', '1 cup quinoa', '1 avocado', 'Lemon juice', 'Olive oil', 'Salt, pepper, dill'],
    steps: ['Cook quinoa per package directions', 'Season salmon, pan-sear 4 min per side', 'Slice avocado', 'Plate quinoa, top with salmon and avocado', 'Drizzle lemon juice and olive oil'],
    videoUrl: '#',
  },
  {
    id: 4,
    name: 'Overnight Protein Oats',
    emoji: <Coffee size={28} color="var(--purple)" />,
    time: '5 min + overnight',
    calories: 410,
    protein: 30,
    servings: 1,
    rating: 4.6,
    difficulty: 'Easy',
    ingredients: ['1/2 cup oats', '1 scoop protein powder', '1 cup almond milk', '1 tbsp peanut butter', '1 banana', 'Cinnamon'],
    steps: ['Mix oats, protein powder, and milk', 'Add peanut butter and cinnamon', 'Refrigerate overnight', 'Top with sliced banana in the morning'],
    videoUrl: '#',
  },
  {
    id: 5,
    name: 'Turkey & Sweet Potato Meal Prep',
    emoji: <Drumstick size={28} color="var(--red)" />,
    time: '40 min',
    calories: 450,
    protein: 38,
    servings: 4,
    rating: 4.8,
    difficulty: 'Medium',
    ingredients: ['500g ground turkey', '3 sweet potatoes', '2 cups green beans', 'Olive oil', 'Paprika, garlic powder', 'Salt & pepper'],
    steps: ['Preheat oven to 400°F', 'Cube sweet potatoes, roast 20 min', 'Cook turkey in pan with seasonings', 'Steam green beans', 'Divide into 4 meal prep containers'],
    videoUrl: '#',
  },
]

export default function CookingAssistant() {
  const { setCurrentPage } = useContext(AppContext)
  const [expandedRecipe, setExpandedRecipe] = useState(null)

  const toggleRecipe = (id) => {
    setExpandedRecipe(prev => prev === id ? null : id)
  }

  return (
    <div className="cooking-page" id="cooking-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" onClick={() => setCurrentPage('home')} id="btn-back-cook">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>AI Chef</h1>
            <span className="subtitle">Smart Recipes</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" id="btn-bookmarks">
            <BookOpen size={18} />
          </button>
        </div>
      </div>

      <div className="cook-content">
        {/* AI Suggestion Banner */}
        <div className="ai-banner card-glow animate-in" id="ai-banner">
          <div className="ai-banner-emoji"><Bot size={36} color="var(--accent)" /></div>
          <div className="ai-banner-text">
            <h3>AI Recommendation</h3>
            <p>Based on your macro goals, try <strong>high-protein meals</strong> with at least 35g protein per serving.</p>
          </div>
        </div>

        {/* Recipe List */}
        <div className="recipe-list">
          {recipes.map((recipe, i) => (
            <div
              className={`recipe-card card animate-in ${expandedRecipe === recipe.id ? 'expanded' : ''}`}
              key={recipe.id}
              id={`recipe-${recipe.id}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <button className="recipe-header-btn" onClick={() => toggleRecipe(recipe.id)}>
                <div className="recipe-emoji">{recipe.emoji}</div>
                <div className="recipe-info">
                  <h4 className="recipe-name">{recipe.name}</h4>
                  <div className="recipe-meta">
                    <span><Clock size={11} /> {recipe.time}</span>
                    <span><Flame size={11} /> {recipe.calories} kcal</span>
                    <span><Star size={11} fill="#eab308" stroke="#eab308" /> {recipe.rating}</span>
                  </div>
                </div>
                <div className="recipe-expand-icon">
                  {expandedRecipe === recipe.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {expandedRecipe === recipe.id && (
                <div className="recipe-details animate-in">
                  {/* Quick Stats */}
                  <div className="recipe-stats">
                    <div className="rstat">
                      <span className="rstat-val">{recipe.protein}g</span>
                      <span className="rstat-lbl">Protein</span>
                    </div>
                    <div className="rstat">
                      <span className="rstat-val">{recipe.calories}</span>
                      <span className="rstat-lbl">Calories</span>
                    </div>
                    <div className="rstat">
                      <span className="rstat-val">{recipe.servings}</span>
                      <span className="rstat-lbl">Servings</span>
                    </div>
                    <div className="rstat">
                      <span className="rstat-val">{recipe.difficulty}</span>
                      <span className="rstat-lbl">Level</span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="recipe-section">
                    <h5>Ingredients</h5>
                    <ul className="ingredient-list">
                      {recipe.ingredients.map((ing, j) => (
                        <li key={j}>
                          <div className="ing-dot" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="recipe-section">
                    <h5>Instructions</h5>
                    <ol className="steps-list">
                      {recipe.steps.map((step, j) => (
                        <li key={j}>
                          <span className="step-num">{j + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Video Link */}
                  <button className="video-btn btn-secondary" id={`video-${recipe.id}`}>
                    <Play size={14} /> Watch Tutorial
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
