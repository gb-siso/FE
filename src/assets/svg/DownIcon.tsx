import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      y={0.5}
      stroke="#FF7B91"
      strokeWidth={2}
      opacity="100%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97z" />
    </svg>
  </svg>
);
export default SvgDownIcon;
