// src/components/lightbox.tsx
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Portal } from "solid-js/web";

// src/utils.tsx
import { onCleanup, onMount } from "solid-js";
function AddWindowEvent(props) {
  onMount(() => window.addEventListener(props.type, props.listener));
  onCleanup(() => window.removeEventListener(props.type, props.listener));
  return null;
}

// src/components/lightbox.tsx
var [lbMedia, setLbMedia] = createStore({
  index: -1,
  media: []
});
var current = () => lbMedia.media[lbMedia.index];
var lightboxAdd = (media, index = 0, onChange) => {
  setLbMedia({
    media: Array.isArray(media) ? media : [media],
    index,
    onChange
  });
};
var closeLightbox = () => setLbMedia({ index: -1, onChange: void 0 });
function Lightbox() {
  let divRef;
  let mediaRef;
  const keyDownListener = (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      if (lbMedia.index > 0) {
        setLbMedia({ index: lbMedia.index - 1 });
        lbMedia.onChange?.(lbMedia.index);
      }
    } else if (e.key === "ArrowRight") {
      if (lbMedia.index < lbMedia.media.length - 1) {
        setLbMedia({ index: lbMedia.index + 1 });
        lbMedia.onChange?.(lbMedia.index);
      }
    }
  };
  return <Portal><Show when={lbMedia.index !== -1}><AddWindowEvent type="keydown" listener={keyDownListener} /><div
    ref={divRef}
    onClick={(e) => {
      if (e.target === divRef) {
        closeLightbox();
      }
    }}
    class="fixed z-[999] top-0 left-0 h-[100vh] w-[100vw] bg-zinc-900 bg-opacity-70 flex justify-center items-center overflow-hidden"
  ><img
    class={"max-h-[100vh] max-w-[100vw] object-contain"}
    loading="lazy"
    ref={mediaRef}
    src={current()?.url}
    alt={current()?.name}
  /></div></Show></Portal>;
}
export {
  Lightbox,
  lightboxAdd
};
