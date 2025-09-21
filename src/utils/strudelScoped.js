// Build a *scoped* Strudel runtime (no globals).
// Everything lives under the returned object `S`.
export async function initStrudelScoped(options = {}) {
  const [{ setTime, ...Core }, Mini, Tonal, WebAudio, Transpiler] = await Promise.all([
    import('@strudel/core'),
    import('@strudel/mini'),
    import('@strudel/tonal'),
    import('@strudel/webaudio'),
    import('@strudel/transpiler'),
  ])

  const { initAudioOnFirstClick, registerSynthSounds, webaudioRepl } = WebAudio
  const { transpiler } = Transpiler

  // Ensure AudioContext resumes on first user gesture
  initAudioOnFirstClick()
  if (options.miniAllStrings !== false) Mini.miniAllStrings?.()

  // Create a REPL/scheduler pair like @strudel/web does, but scoped
  const repl = webaudioRepl({ transpiler, ...(options.replOptions ?? {}) })

  // provide half-ready strudel instance to prebake
  const st_half = {
    core: Core,
    mini: Mini,
    tonal: Tonal,
    webaudio: WebAudio,
    transpiler: Transpiler,
  }

  // Preload stock synths, optional user prebake
  await Promise.all([registerSynthSounds(), Promise.resolve(options.prebake?.(st_half))])

  // Load default samples
  if (options.loadDefaultSamples) {
    const ds = 'https://raw.githubusercontent.com/felixroos/dough-samples/main/'
    console.log('Loading default samples from', ds)
    await Promise.all([
      WebAudio.samples(`${ds}/tidal-drum-machines.json`),
      WebAudio.samples(`${ds}/piano.json`),
      WebAudio.samples(`${ds}/Dirt-Samples.json`),
      WebAudio.samples(`${ds}/EmuSP12.json`),
      WebAudio.samples(`${ds}/vcsl.json`),
      WebAudio.samples(`${ds}/mridangam.json`),
    ])
  }

  // Hook Strudel time to WebAudio scheduler
  setTime(() => repl.scheduler.now())

  // Convenience helpers (match @strudel/web behavior without patching prototypes)
  const evaluate = (code, autoplay = true) => repl.evaluate(code, autoplay)
  const setPattern = (p, autoplay = true) => {
    repl.setPattern(p, autoplay)
    return p
  }
  const play = p => setPattern(p, true)
  const hush = () => repl.stop()

  // Return a neat namespace to pass around
  const st = {
    ...st_half,
    // runtime handles
    repl,
    scheduler: repl.scheduler,
    now: () => repl.scheduler.now(),
    // high-level API
    evaluate,
    setPattern,
    play,
    hush,
  }

  return st
}
