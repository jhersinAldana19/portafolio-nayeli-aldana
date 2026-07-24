import { useEffect, useRef } from 'react'
import { Reveal } from './Reveal'
import supplyVideo from '../../assets/Supply_chain.mp4'

export function SupplyVideo() {
  const rootRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    let unlocked = false
    let inView = false

    const playWithAudio = async () => {
      video.muted = false
      video.volume = 1
      try {
        await video.play()
        unlocked = true
        return true
      } catch {
        return false
      }
    }

    const playFallbackMuted = async () => {
      video.muted = true
      try {
        await video.play()
      } catch {
        // ignore
      }
    }

    const unlockAudio = async () => {
      if (unlocked || !inView) return
      const ok = await playWithAudio()
      if (ok) removeUnlockListeners()
    }

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
    }

    const addUnlockListeners = () => {
      window.addEventListener('pointerdown', unlockAudio, { passive: true })
      window.addEventListener('keydown', unlockAudio)
      window.addEventListener('touchstart', unlockAudio, { passive: true })
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        inView = entry.isIntersecting

        if (!entry.isIntersecting) {
          video.pause()
          return
        }

        const playedWithAudio = await playWithAudio()
        if (!playedWithAudio) {
          await playFallbackMuted()
          addUnlockListeners()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
      removeUnlockListeners()
    }
  }, [])

  return (
    <section id="supply" ref={rootRef} className="section section--video" aria-label="Supply Chain">
      <Reveal className="video-block">
        <div className="video-frame">
          <video
            ref={videoRef}
            className="video-frame__media"
            src={supplyVideo}
            playsInline
            loop
            autoPlay
            preload="auto"
            title="Supply Chain"
          >
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </Reveal>
    </section>
  )
}
