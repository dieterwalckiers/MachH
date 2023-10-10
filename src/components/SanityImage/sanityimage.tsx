import { $, component$ } from '@builder.io/qwik';
import {
  Image,
  type ImageTransformerProps,
  useImageProvider,
} from 'qwik-image';

export interface SanityimageProps {
  url: string,
  width?: number,
  height?: number,
  alt: string,
  resolutionsOverride?: number[],
  placeholderColor?: string,
  className?: string;
}

const Sanityimage = component$<SanityimageProps>(({ url, width, height, alt, resolutionsOverride, placeholderColor, className }) => {

  const imageTransformer$ = $(
    ({ /*src,*/ width, height }: ImageTransformerProps): string => {
      return `${url}?w=${width}&h=${height}&fit=crop&auto=format`;
    }
  );

  // Global Provider (required)
  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    // resolutions: [640],
    imageTransformer$,
    ...(resolutionsOverride ? { resolutions: resolutionsOverride } : {})
  });


  return (
    <Image
      layout='fixed' // CAREFUL! SanityImage is only used for fixed layout images (non responsive)
      objectFit='cover'
      width={width}
      height={height}
      alt={alt}
      placeholder={placeholderColor}
      class={className || ""}
    />
  );
});


export default Sanityimage;