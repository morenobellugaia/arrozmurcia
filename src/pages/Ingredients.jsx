import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChefHat, Box, Drumstick, Citrus, Cherry, Droplet, GlassWater, CookingPot, Leaf, Users, Bean, Ham, Torus, Apple, Sprout, Popcorn } from 'lucide-react'
import useStore from '../store/useStore'
import { ingredients } from '../data/recipes'

const IconMap = {
    Box, Drumstick, Citrus, Cherry, Droplet, GlassWater, CookingPot, Leaf, Bean, Ham, Torus, Apple, Sprout, Popcorn
}

export default function Ingredients() {
    const { numberOfPeople } = useStore()
    const navigate = useNavigate()

    return (
        <div className="page-container">
            <header className="header" style={{ paddingTop: '1rem' }}>
                <button onClick={() => navigate('../')} className="btn-icon">
                    <ArrowLeft size={24} />
                </button>
                <h1>Ingredientes</h1>
                <div style={{ marginLeft: 'auto', background: 'var(--glass)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                    <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {numberOfPeople}
                </div>
            </header>

            <motion.div
                className="ingredients-list"
                style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}
            >
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {ingredients.map((ing, i) => {
                        const Icon = IconMap[ing.icon] || Box
                        const amount = ing.baseAmount * numberOfPeople
                        // Format amount (if it's a decimal close to integer, round it, otherwise keep 1 decimal)
                        const displayAmount = amount % 1 === 0 ? amount : amount.toFixed(1).replace('.0', '')

                        return (
                            <motion.div
                                key={ing.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel"
                                style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}
                            >
                                <div style={{
                                    background: 'rgba(255, 107, 107, 0.1)',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    color: 'var(--primary)',
                                    marginRight: '1rem'
                                }}>
                                    <Icon size={24} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{ing.name}</div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                                        {displayAmount}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                                        {ing.unit}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>

            <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                <button
                    onClick={() => navigate('/cooking')}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '16px' }}
                >
                    <ChefHat size={24} />
                    Empezar a Cocinar
                </button>
            </div>
        </div>
    )
}
