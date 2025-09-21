import { onUnmounted, shallowRef, readonly, ref } from 'vue'
import { initStrudelScoped } from '@/utils/strudelScoped'

const strudel = shallowRef(null)
const isReady = ref(false)

export function useStrudel() {
  async function init(options) {
    if (strudel.value) return

    const instance = await initStrudelScoped(options)
    strudel.value = instance
    isReady.value = true
  }

  onUnmounted(() => {
    strudel.value?.hush()
  })

  return {
    strudel: readonly(strudel),
    isReady: readonly(isReady),
    init,
  }
}
