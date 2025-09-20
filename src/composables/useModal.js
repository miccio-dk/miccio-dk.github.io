import { ref } from 'vue'

/**
 * A composable for managing modal state.
 * @returns {{
 *   selectedItem: import('vue').Ref<any>,
 *   showItem: (item: any) => void,
 *   closeItem: () => void
 * }}
 */
export function useModal() {
  const selectedItem = ref(null)

  const showItem = item => {
    selectedItem.value = item
  }

  const closeItem = () => {
    selectedItem.value = null
  }

  return {
    selectedItem,
    showItem,
    closeItem,
  }
}
