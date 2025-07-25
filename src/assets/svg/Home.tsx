import * as React from 'react';
import type { SVGProps } from 'react';
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m23.121 9.069-7.585-7.586a5.01 5.01 0 0 0-7.072 0L.879 9.069A2.98 2.98 0 0 0 0 11.19v9.817a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V11.19a2.98 2.98 0 0 0-.879-2.121M15 22.007H9v-3.934a3 3 0 0 1 6 0Zm7-1a1 1 0 0 1-1 1h-4v-3.934a5 5 0 0 0-10 0v3.934H3a1 1 0 0 1-1-1V11.19a1 1 0 0 1 .293-.707L9.878 2.9a3.01 3.01 0 0 1 4.244 0l7.585 7.586a1 1 0 0 1 .293.704Z" />
  </svg>
);
export default SvgHome;
