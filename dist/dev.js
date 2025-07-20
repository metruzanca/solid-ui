import { delegateEvents, createComponent, Portal, use, effect, setAttribute, template } from 'solid-js/web';
import { Show, onMount, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

// src/components/lightbox.tsx
function AddWindowEvent(props) {
  onMount(() => window.addEventListener(props.type, props.listener));
  onCleanup(() => window.removeEventListener(props.type, props.listener));
  return null;
}

// src/components/lightbox.tsx
var _tmpl$ = /* @__PURE__ */ template(`<div class="fixed z-[999] top-0 left-0 h-[100vh] w-[100vw] bg-zinc-900 bg-opacity-70 flex justify-center items-center overflow-hidden"><img class="max-h-[100vh] max-w-[100vw] object-contain"loading=lazy>`);
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
var closeLightbox = () => setLbMedia({
  index: -1,
  onChange: void 0
});
function Lightbox() {
  let divRef;
  let mediaRef;
  const keyDownListener = (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      if (lbMedia.index > 0) {
        setLbMedia({
          index: lbMedia.index - 1
        });
        lbMedia.onChange?.(lbMedia.index);
      }
    } else if (e.key === "ArrowRight") {
      if (lbMedia.index < lbMedia.media.length - 1) {
        setLbMedia({
          index: lbMedia.index + 1
        });
        lbMedia.onChange?.(lbMedia.index);
      }
    }
  };
  return createComponent(Portal, {
    get children() {
      return createComponent(Show, {
        get when() {
          return lbMedia.index !== -1;
        },
        get children() {
          return [createComponent(AddWindowEvent, {
            type: "keydown",
            listener: keyDownListener
          }), (() => {
            var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
            _el$.$$click = (e) => {
              if (e.target === divRef) {
                closeLightbox();
              }
            };
            var _ref$ = divRef;
            typeof _ref$ === "function" ? use(_ref$, _el$) : divRef = _el$;
            var _ref$2 = mediaRef;
            typeof _ref$2 === "function" ? use(_ref$2, _el$2) : mediaRef = _el$2;
            effect((_p$) => {
              var _v$ = current()?.url, _v$2 = current()?.name;
              _v$ !== _p$.e && setAttribute(_el$2, "src", _p$.e = _v$);
              _v$2 !== _p$.t && setAttribute(_el$2, "alt", _p$.t = _v$2);
              return _p$;
            }, {
              e: void 0,
              t: void 0
            });
            return _el$;
          })()];
        }
      });
    }
  });
}
delegateEvents(["click"]);

export { Lightbox, lightboxAdd };
