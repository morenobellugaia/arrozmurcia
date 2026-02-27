import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, CheckCircle, Timer } from 'lucide-react'
import { steps } from '../data/recipes'

export default function Cooking() {
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(steps[0].duration)
    const [isActive, setIsActive] = useState(false)
    const audioCtxRef = useRef(null)

    const playBeep = (times) => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        const ctx = audioCtxRef.current
        if (ctx.state === 'suspended') {
            ctx.resume()
        }

        const playSingleBeep = (timeOffset) => {
            const osc = ctx.createOscillator()
            const gainNode = ctx.createGain()
            osc.connect(gainNode)
            gainNode.connect(ctx.destination)

            osc.type = 'sine'
            osc.frequency.setValueAtTime(880, ctx.currentTime + timeOffset)

            gainNode.gain.setValueAtTime(0, ctx.currentTime + timeOffset)
            gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + timeOffset + 0.05)
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.2)

            osc.start(ctx.currentTime + timeOffset)
            osc.stop(ctx.currentTime + timeOffset + 0.2)
        }

        if (times === 1) {
            playSingleBeep(0)
        } else if (times === 2) {
            playSingleBeep(0)
            playSingleBeep(0.3)
        }
    }

    const currentStep = steps[currentStepIndex]
    const isLastStep = currentStepIndex === steps.length - 1

    useEffect(() => {
        let interval = null
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                const newTime = timeLeft - 1
                setTimeLeft(newTime)
                if (newTime <= 10 && newTime > 0) {
                    playBeep(1)
                } else if (newTime === 0) {
                    playBeep(2)
                }
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
            // You could auto-advance here if desired, but manual is safer for cooking
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, currentStepIndex])

    // Reset timer when step changes
    useEffect(() => {
        setTimeLeft(steps[currentStepIndex].duration)
        setIsActive(false)
        speak(steps[currentStepIndex].title)
    }, [currentStepIndex])

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = 'es-ES'
            window.speechSynthesis.speak(utterance)
        }
    }

    const toggleTimer = () => setIsActive(!isActive)

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1)
        }
    }

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1)
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const progress = ((steps[currentStepIndex].duration - timeLeft) / steps[currentStepIndex].duration) * 100

    return (
        <div className="page-container" style={{ paddingBottom: '80px' }}>
            <header className="header" style={{ paddingTop: '1rem' }}>
                <button onClick={() => navigate('/ingredients')} className="btn-icon">
                    <ArrowLeft size={24} />
                </button>
                <h1>Cocinando</h1>
                <div style={{ marginLeft: 'auto', background: 'var(--glass)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                    Paso {currentStepIndex + 1}/{steps.length}
                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel"
                        style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                    >
                        {/* Background Progress */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                height: '4px',
                                width: `${progress}%`,
                                background: 'var(--primary)',
                                transition: 'width 1s linear'
                            }}
                        />

                        <div style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            {currentStep.title}
                        </div>

                        <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '1rem', color: timeLeft < 10 && timeLeft > 0 ? '#ff6b6b' : 'var(--text-light)' }}>
                            {formatTime(timeLeft)}
                        </div>

                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-light)', marginBottom: '2rem' }}>
                            {currentStep.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button onClick={timeLeft === 0 ? nextStep : toggleTimer} className="btn-primary" style={{ borderRadius: '50%', width: '64px', height: '64px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {timeLeft === 0 && !isLastStep ? <SkipForward size={32} style={{ marginLeft: '4px' }} /> :
                                    timeLeft === 0 && isLastStep ? <CheckCircle size={32} /> :
                                        isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="glass-panel" style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 40px)',
                maxWidth: '560px',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100
            }}>
                <button onClick={prevStep} disabled={currentStepIndex === 0} className="btn-icon" style={{ opacity: currentStepIndex === 0 ? 0.5 : 1 }}>
                    <SkipBack size={24} />
                </button>

                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Siguiente:</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                        {isLastStep ? '¡A comer!' : steps[currentStepIndex + 1].title}
                    </div>
                </div>

                <button onClick={nextStep} disabled={isLastStep && timeLeft > 0} className="btn-icon" style={{ opacity: isLastStep && timeLeft > 0 ? 0.5 : 1 }}>
                    <SkipForward size={24} />
                </button>
            </div>
        </div>
    )
}
