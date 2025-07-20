import { onCleanup, onMount } from 'solid-js'

/**
 * Adds an event listener to the window object.
 * The listener is automatically removed when the component is unmounted.
 */
export function AddWindowEvent<K extends keyof WindowEventMap>(props: {
  type: K
  listener: (this: Window, ev: WindowEventMap[K]) => any
  options?: boolean | AddEventListenerOptions
}) {
  onMount(() => window.addEventListener(props.type, props.listener))
  onCleanup(() => window.removeEventListener(props.type, props.listener))

  return null
}
