import * as solid_js from 'solid-js';

type MediaProps = {
    url: string;
    name?: string;
};
declare const lightboxAdd: (media: MediaProps | MediaProps[], index?: number, onChange?: (index: number) => void) => void;
declare function Lightbox(): solid_js.JSX.Element;

export { Lightbox, lightboxAdd };
