import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, ChefHat, ArrowRight } from 'lucide-react'
import useStore from '../store/useStore'

export default function Home() {
    const { numberOfPeople, setNumberOfPeople } = useStore()
    const navigate = useNavigate()

    const handleIncrement = () => {
        if (numberOfPeople < 60) setNumberOfPeople(numberOfPeople + 1)
    }

    const handleDecrement = () => {
        if (numberOfPeople > 1) setNumberOfPeople(numberOfPeople - 1)
    }

    return (
        <div className="page-container" style={{ justifyContent: 'center' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(./background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                    zIndex: -1
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '2rem', textAlign: 'center' }}
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <ChefHat size={64} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                </motion.div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Arroz Murcia
                </h1>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
                    El auténtico sabor, a tu medida.
                </p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Comensales
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={handleDecrement}
                            className="btn-icon"
                            style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                        >
                            -
                        </button>

                        <div style={{ textAlign: 'center', width: '80px' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>
                                {numberOfPeople}
                            </span>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                                {numberOfPeople === 1 ? 'Persona' : 'Personas'}
                            </div>
                        </div>

                        <button
                            onClick={handleIncrement}
                            className="btn-icon"
                            style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                        >
                            +
                        </button>
                    </div>

                    <input
                        type="range"
                        min="1"
                        max="60"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                        style={{ marginTop: '2rem', width: '80%' }}
                    />
                </div>

                <button
                    onClick={() => navigate('./ingredients')}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    Ver Ingredientes <ArrowRight size={20} />
                </button>
            </motion.div>
        </div>
    )
}
