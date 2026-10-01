import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Tv, 
  Gamepad2, 
  PackageCheck
} from 'lucide-react';
import { normalizeCategory, CATEGORY_DEFAULT_IMAGES } from '../data/mockDeals';

interface ProductImageProps {
  src?: string;
  alt: string;
  category?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  badge?: React.ReactNode;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category = 'Mobiles & iPhones',
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[4/3]',
  badge,
}) => {
  const normalized = normalizeCategory(category);
  const primaryFallback = CATEGORY_DEFAULT_IMAGES[normalized] || CATEGORY_DEFAULT_IMAGES['Mobiles & iPhones'];

  // State: 0 = trying provided src, 1 = trying primaryFallback, 2 = show SVG graphic
  const [errorStep, setErrorStep] = useState<number>(src ? 0 : 1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (errorStep === 0 && src !== primaryFallback) {
      setErrorStep(1);
    } else {
      setErrorStep(2);
    }
  };

  const getCategoryIcon = () => {
    switch (normalized) {
      case 'Mobiles & iPhones':
        return <Smartphone className="w-12 h-12 text-indigo-500" />;
      case 'Laptops & Computers':
        return <Laptop className="w-12 h-12 text-blue-500" />;
      case 'Audio & Headphones':
        return <Headphones className="w-12 h-12 text-violet-500" />;
      case 'Smartwatches & Wearables':
        return <Watch className="w-12 h-12 text-amber-500" />;
      case 'Smart TVs & Home Electronics':
        return <Tv className="w-12 h-12 text-rose-500" />;
      case 'Gaming Consoles & Accessories':
        return <Gamepad2 className="w-12 h-12 text-emerald-500" />;
      default:
        return <PackageCheck className="w-12 h-12 text-slate-500" />;
    }
  };

  const currentSrc = errorStep === 0 && src ? src : primaryFallback;

  return (
    <div
      className={`relative ${aspectRatio} w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/80 flex items-center justify-center p-3 select-none ${containerClassName}`}
    >
      {badge}

      {errorStep < 2 ? (
        <>
          {/* Subtle loading shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-slate-200/50 animate-pulse flex items-center justify-center">
              <span className="sr-only">Loading product image...</span>
            </div>
          )}

          <img
            src={currentSrc}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`max-h-full max-w-full w-auto h-auto object-contain object-center drop-shadow-sm transition-transform duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </>
      ) : (
        /* Clean Vector SVG Placeholder Graphic */
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-100/90 border border-dashed border-slate-200 rounded-xl">
          <div className="p-3 bg-white rounded-2xl shadow-xs mb-2">
            {getCategoryIcon()}
          </div>
          <span className="text-[11px] font-bold text-slate-800 line-clamp-1 max-w-[90%]">
            {alt}
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">
            {normalized} · 100% Genuine
          </span>
        </div>
      )}
    </div>
  );
};
