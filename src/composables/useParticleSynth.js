import { ref } from 'vue'
import _sample from 'lodash/sample'
import _throttle from 'lodash/throttle'

/**
 * Composable for managing Tone.js audio synthesis for the particle background.
 * @param {import('vue').Ref<object>} props - The component's props.
 * @returns {{
 *  initializeAudio: () => Promise<void>,
 *  playParticleThrottled: Function | null,
 *  playChord: () => void,
 *  releaseAll: () => void
 * }}
 */
export function useParticleSynth(props) {
  let Tone = null
  let leadSynth = null
  let chordSynth = null
  let leadFx = null
  let chordFx = null
  let tMin = 0
  let playParticleThrottled = null

  const isInitialized = ref(false)

  const playParticle = particle => {
    if (!leadSynth) return
    const octaves = ['1', '2', '3', '4', '5', '6']
    const pitches = ['C', 'E', 'G', 'B']
    const { radius, velocity, color } = particle
    const velocity_mag = Math.sqrt(Math.pow(velocity[0], 2), Math.pow(velocity[1], 2))
    const octave_idx = Math.max(Math.round((1 - radius / props.maxRadius.value) * (octaves.length - 1)), 0)
    const pitch_idx = Math.floor((velocity_mag / 0.0001) * pitches.length)
    const octave = octaves[octave_idx]
    const pitch = pitches[pitch_idx % pitches.length]
    const note = pitch + octave
    const note_velocity = color[3] * 3
    try {
      leadSynth.triggerAttackRelease(note, '4n', '+0', note_velocity)
    } catch (error) {
      console.warn('Error playing particle:', error)
    }
  }

  const playChord = () => {
    if (!chordSynth) return
    const chord1 = ['E3', 'G3', 'B3', 'D4']
    const chord2 = ['C3', 'E3', 'G3', 'B3']
    const chord3 = ['D3', 'G3', 'B3', 'D4']
    const chord = _sample([chord1, chord2, chord3])
    chordSynth.triggerAttackRelease(chord, '1:2:0')
  }

  const releaseAll = () => {
    if (leadSynth) leadSynth.releaseAll()
    if (chordSynth) chordSynth.releaseAll()
  }

  const initializeAudio = async () => {
    if (isInitialized.value) return
    // Dynamically import Tone.js
    Tone = await import('tone')
    try {
      await Tone.start()
      leadFx = new Tone.PingPongDelay('8t', 0.4).toDestination()
      leadSynth = new Tone.PolySynth(Tone.MonoSynth).connect(leadFx)
      leadSynth.set({
        oscillator: { type: 'sawtooth' },
        filter: { type: 'lowpass', rolloff: -24, frequency: 5000, Q: 10 },
        envelope: { release: '2n', releaseCurve: 'linear' },
        filterEnvelope: { attack: '8n', release: '2n', releaseCurve: 'exponential' },
        volume: -30,
      })
      chordFx = new Tone.AutoFilter('4n', 1500, 0.4).toDestination().start()
      chordSynth = new Tone.PolySynth(Tone.FMSynth).connect(chordFx)
      chordSynth.set({
        envelope: { attack: '2n', release: '1n', releaseCurve: 'linear' },
        modulationEnvelope: { attack: '1m', sustain: 1, release: '1n', releaseCurve: 'linear' },
        modulationIndex: 10,
        volume: -25,
      })
      Tone.getTransport().bpm.value = props.bpm.value
      tMin = Tone.Time('16n').toSeconds() * 1000
      playParticleThrottled = _throttle(particle => playParticle(particle), tMin, { trailing: false })
      isInitialized.value = true
    } catch (error) {
      console.warn('Error initializing Tone.js:', error)
    }
  }

  return {
    initializeAudio,
    get playParticleThrottled() {
      return playParticleThrottled
    },
    playChord,
    releaseAll,
  }
}
