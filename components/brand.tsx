'use client';

import { useId } from 'react';
import brandImage from '@/lib/brand-image.json';

export default function Brand() {
  const filterId = 'rao-brand-' + useId().replace(/:/g, '');
  return <a className="brand" href="/" aria-label="raosocialblade.com home">
    <svg className="original-brand-logo" viewBox="141 98 456 152" role="img" aria-label="Rao Social Blade — Empowering Brands in the Digital Era" style={{color:'#155DFC'}}>
      <defs><filter id={filterId} colorInterpolationFilters="sRGB"><feFlood floodColor="currentColor"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs>
      <image href={brandImage.logo} width="730" height="342" filter={'url(#'+filterId+')'}/>
    </svg>
  </a>;
}
