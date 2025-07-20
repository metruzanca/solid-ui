import { Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Portal } from 'solid-js/web'
import { AddWindowEvent } from '../utils'

type MediaProps = {
  url: string
  name?: string
}

const [lbMedia, setLbMedia] = createStore<{
  media: MediaProps[]
  index: number
  onChange?: (index: number) => void
}>({
  index: -1,
  media: [],
})

const current = () => lbMedia.media[lbMedia.index]

export const lightboxAdd = (
  media: MediaProps | MediaProps[],
  index: number = 0,
  onChange?: (index: number) => void,
) => {
  setLbMedia({
    media: Array.isArray(media) ? media : [media],
    index: index,
    onChange,
  })
}

const closeLightbox = () => setLbMedia({ index: -1, onChange: undefined })

export function Lightbox() {
  let divRef: HTMLDivElement | undefined
  let mediaRef: HTMLElement | undefined

  const keyDownListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      if (lbMedia.index > 0) {
        setLbMedia({ index: lbMedia.index - 1 })
        lbMedia.onChange?.(lbMedia.index)
      }
    } else if (e.key === 'ArrowRight') {
      if (lbMedia.index < lbMedia.media.length - 1) {
        setLbMedia({ index: lbMedia.index + 1 })
        lbMedia.onChange?.(lbMedia.index)
      }
    }
  }

  return (
    <Portal>
      <Show when={lbMedia.index !== -1}>
        <AddWindowEvent type="keydown" listener={keyDownListener} />
        <div
          ref={divRef}
          onClick={e => {
            if (e.target === divRef) {
              closeLightbox()
            }
          }}
          class="fixed z-[999] top-0 left-0 h-[100vh] w-[100vw] bg-zinc-900 bg-opacity-70 flex justify-center items-center overflow-hidden"
        >
          <img
            class={'max-h-[100vh] max-w-[100vw] object-contain'}
            loading="lazy"
            ref={mediaRef as HTMLImageElement}
            src={current()?.url}
            alt={current()?.name}
          />
        </div>
      </Show>
    </Portal>
  )
}
