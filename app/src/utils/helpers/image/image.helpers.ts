import { envConfig } from "@/utils/config";
import { commonHelpers } from "..";

import type { ImageLoader } from "next/image";

export const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${envConfig.CDN_HOST}${src}?w=${width}&q=${quality || 75}`;
};

export const imagePathLoader = (pathname?: string) => {
  if (!pathname) return "";
  return `${envConfig.CDN_HOST}${pathname ?? ""}`;
};

export const appImageLoader = (payload: {
  src?: string;
  width?: SafeNumber;
  quality?: number;
}) => {
  const { src, width = 1200 } = payload || {};

  if (!src) return src!;

  return `/api/common/app-image?pathname=${src ?? ""}&media_query=${
    parseInt(`${width}`) > 600 ? "desktop" : "mobile"
  }`;
};

export const optimizedImageLoader = (payload: {
  src?: string;
  width?: SafeNumber;
  quality?: number;
}) => {
  const { src, width = 1200, quality = 80 } = payload || {};

  return `/_next/image?url=${src ?? ""}&w=${width}&q=${quality}`;
};

// export const generateEncodedShimmerSvg = ({
//   width,
//   height,
// }: {
//   width: SafeNumber;
//   height: SafeNumber;
// }) =>
//   `data:image/svg+xml;base64,${commonHelpers.encodeBase64(
//     `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g-clXSsN">
//       <stop stop-color="#F5F5F5" offset="20%" />
//       <stop stop-color="#EAE9E9" offset="50%" />
//       <stop stop-color="#F5F5F5" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${width}" height="${height}" fill="#F5F5F5" />
//   <rect id="r-clXSsN" width="${width}" height="${height}" fill="url(#g-clXSsN)" />
//   <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="4s" repeatCount="indefinite"  />
// </svg>`
//   )}`;

export const generateEncodedShimmerSvg = () =>
  `data:image/svg+xml;base64,${commonHelpers.encodeBase64(
    `<svg viewBox="0 0 24 24" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g-clXSsN">
      <stop stop-color="#F5F5F5" offset="20%" />
      <stop stop-color="#EAE9E9" offset="50%" />
      <stop stop-color="#F5F5F5" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="24" height="24" fill="#F5F5F5" />
  <rect width="24" height="24" id="r-clXSsN" fill="url(#g-clXSsN)" />
  <animate xlink:href="#r-clXSsN" attributeName="x" from="-24" to="24" dur="2s" repeatCount="indefinite"  />
</svg>`
  )}`;

export const generateEncodedCustomReversedLogoSvg = (payload?: {
  bgFill?: string;
  arrow1Fill?: string;
  arrow2Fill?: string;
}) => {
  const { bgFill, arrow1Fill, arrow2Fill } = payload || {};

  return `data:image/svg+xml;base64,${commonHelpers.encodeBase64(
    `<svg viewBox="0 0 83 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect width="83" height="100" fill="${bgFill ?? "none"}"/>
      <path d="M24.7201 15.0795C26.7287 15.5996 28.7374 16.109 30.746 16.6291C22.3076 17.8391 14.1455 19.8876 6.34475 23.7828C14.3793 22.5198 22.2651 21.9891 30.1402 23.6448C30.1402 23.7191 30.1509 23.7828 30.1509 23.8571C29.2369 23.9739 28.3229 24.08 27.4089 24.2074C20.2139 25.2157 13.2315 26.9139 6.95053 30.7879C4.49553 32.3057 2.29559 34.1207 0.616408 36.5194C0.425109 36.7953 0.255065 37.0819 0.127533 37.4215C0.308204 37.2942 0.488875 37.1774 0.669547 37.0501C2.48689 35.8082 4.54867 35.1184 6.65296 34.5452C9.47993 33.7704 12.36 33.2397 15.272 32.9319C18.014 32.6453 20.7559 32.4224 23.4979 32.1889C24.3162 32.1146 25.1346 32.0934 25.9529 32.0404C25.9635 32.0934 25.9635 32.1465 25.9742 32.1996C24.9114 32.4649 23.8486 32.7303 22.7858 33.0062C17.5889 34.3966 12.5832 36.2328 8.03456 39.1728C5.367 40.8923 2.97576 42.9301 1.22219 45.6154C0.818335 46.2204 0.499503 46.889 0.180671 47.5471C2.89074 44.8406 6.38726 43.7155 9.90504 42.7497C13.0083 41.89 16.186 41.3274 19.3425 40.6269C19.4062 40.6163 19.4806 40.6269 19.7144 40.6269C19.4275 40.8286 19.2787 40.9559 19.1086 41.0515C15.1658 43.2379 11.4142 45.6897 8.00268 48.6509C5.18633 51.1027 2.6463 53.7986 0.860846 57.1207C0.552642 57.6939 0.308204 58.2989 0 58.9675C0.159416 58.9463 0.23381 58.9463 0.276321 58.9145C4.95252 55.8365 9.94755 53.321 14.9426 50.8162C21.6274 47.4622 28.3548 44.225 35.3266 41.4972C37.8241 40.5208 40.3641 39.6504 43.0104 39.1516C44.7533 38.8226 46.4963 38.5891 48.2499 39.0879C49.5783 39.4594 49.6421 39.5868 49.0788 40.8286C47.9948 43.2379 46.9001 45.6578 45.8161 48.0672C45.6354 48.4705 45.4654 48.8844 45.3698 49.309C44.9765 51.0178 45.8799 51.92 47.5697 51.4211C48.8663 51.039 50.131 50.5084 51.385 49.9989C60.121 46.4963 68.8464 42.9726 77.5824 39.47C79.6335 38.6527 80.9089 37.1774 81.3446 35.0228C81.5465 34.0251 81.4934 33.0274 81.1533 32.051C77.6568 22.0846 74.1709 12.1183 70.6637 2.16252C70.4831 1.64245 70.1961 1.12237 69.8667 0.676591C69.2502 -0.161898 68.3469 -0.236194 67.6561 0.538613C67.1991 1.05869 66.8271 1.6849 66.5296 2.31112C65.3392 4.86904 64.1808 7.4482 63.033 10.0273C62.8524 10.4519 62.6717 10.5262 62.2466 10.3776C59.664 9.51788 57.0177 8.89167 54.297 8.70062C52.3734 8.57326 50.4392 8.41405 48.5262 8.54142C46.5707 8.66878 44.6152 9.07211 42.6809 9.44359C37.3564 10.4731 32.1489 11.9378 27.0901 13.9014C26.3036 14.2092 25.5278 14.5382 24.7413 14.8566C24.7307 14.9309 24.7307 15.0052 24.7201 15.0795Z" fill="${
        arrow1Fill ?? "#ED0F77"
      }"/>
      <path d="M38.4107 89.7001C40.7456 89.4244 43.0167 89.2228 45.2561 88.8622C51.072 87.9395 56.6756 86.3062 61.9821 83.7184C66.5775 81.4805 70.7378 78.6382 74.2719 74.9261C78.273 70.7262 81.0642 65.8687 82.1892 60.1309C83.3566 54.1173 82.4758 48.4008 79.5254 43.013C79.4723 42.9281 79.4086 42.8433 79.3662 42.7796C78.3155 44.0099 77.3179 45.272 76.2353 46.4493C72.4465 50.6068 67.9572 53.831 62.9161 56.3128C58.3737 58.5506 53.5979 60.0566 48.631 61.0006C45.4365 61.6051 42.2101 61.9339 38.9732 62.1354C38.8564 62.146 38.7291 62.1354 38.5168 62.1354C38.5168 61.7536 38.5168 61.3824 38.5168 61.0218C38.5381 58.7733 38.5699 56.5355 38.5911 54.287C38.5911 53.937 38.5487 53.5764 38.4532 53.237C38.1029 51.9537 36.9992 51.4234 35.5452 51.9431C34.7492 52.2295 33.9745 52.6643 33.274 53.1522C24.2212 59.4733 15.1683 65.805 6.11542 72.1367C5.06474 72.8792 4.18386 73.7488 3.92915 75.064C3.63199 76.5488 4.14141 77.8215 5.28761 78.7442C6.69914 79.879 8.20618 80.9078 9.68138 81.9578C17.6305 87.6107 25.5796 93.2743 33.55 98.906C34.1655 99.3409 34.8978 99.7015 35.6301 99.8924C37.2963 100.327 38.3895 99.4151 38.4001 97.6863C38.4107 95.2152 38.4107 92.7334 38.4107 90.2622C38.4107 90.0713 38.4107 89.8804 38.4107 89.7001Z" fill="${
        arrow2Fill ?? "#383838"
      }"/>
    </g>
  </svg>
`
  )}`;
};

export const generateEncodedErrorImageSvg = () =>
  `data:image/svg+xml;base64,${commonHelpers.encodeBase64(
    `<svg viewBox="0 0 1067 353" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_177_628)">
    <mask id="mask0_177_628" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="1067" height="353">
    <path d="M1066.31 0H0V352.73H1066.31V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_177_628)">
    <g filter="url(#filter0_d_177_628)">
    <g filter="url(#filter1_d_177_628)">
    <path d="M89.8 28.4C89.8 34.0166 88.1346 39.507 85.0144 44.1772C81.8943 48.8473 77.4594 52.4874 72.2705 54.6372C67.0817 56.787 61.3719 57.35 55.8631 56.255C50.3543 55.16 45.2939 52.4562 41.3217 48.4854C37.3495 44.5146 34.6439 39.4551 33.5469 33.9467C32.45 28.4383 33.011 22.7283 35.159 17.5387C37.307 12.3491 40.9455 7.91296 45.6145 4.79113C50.2836 1.66929 55.7734 0.00197942 61.39 1.76071e-06C65.1204 -0.00131175 68.8145 0.732307 72.2613 2.15895C75.7081 3.5856 78.8401 5.67732 81.4783 8.31463C84.1166 10.9519 86.2094 14.0832 87.6372 17.5295C89.0651 20.9758 89.8 24.6696 89.8 28.4Z" fill="black"/>
    </g>
    <g filter="url(#filter2_d_177_628)">
    <path d="M29.48 91.46H92.69L175.27 295.28L222.63 183.4C240.503 141.247 252.267 110.6 257.92 91.46H326.72V100.7C315.553 100.96 307.757 102.823 303.33 106.29C298.903 109.757 296.683 116.12 296.67 125.38C296.67 126.66 296.67 128.14 296.85 129.81L311.51 283.63C313.303 302.53 316.287 314.673 320.46 320.06C324.633 325.447 333.087 328.343 345.82 328.75V338H251V328.75C260.647 328.49 267.457 326.56 271.43 322.96C275.403 319.36 277.403 312.36 277.43 301.96C277.423 299.767 277.29 297.577 277.03 295.4L261.91 142.4C239.997 181.333 224.35 211.79 214.97 233.77L166.54 347.06H157.86L67.65 122.68L61.1 191.88C58.1467 223.113 56.6733 247.85 56.68 266.09C56.68 306.703 66.8267 327.59 87.12 328.75V338H0V328.75C8.99333 326.677 16.1267 320.923 21.4 311.49C26.6733 302.057 32.1033 285.227 37.69 261C43.4844 235.433 47.5734 209.509 49.93 183.4L54.73 132.12C54.87 129.68 54.92 127.05 54.92 124.22C54.92 115.1 53.13 108.963 49.55 105.81C45.97 102.657 39.28 100.953 29.48 100.7V91.46Z" fill="black"/>
    </g>
    <path d="M519.79 243C517.99 250.81 509.88 281.74 506.87 290.75H360.87V282.34C388.8 280.24 390.87 277.54 390.87 252.91V134.25C390.87 107.52 387.57 106.02 365.04 103.92V95.5102H457C485.23 95.5102 497 95.2102 500.55 94.9102C500.85 102.41 502.05 124.91 503.25 140.91L494.25 142.41C492.194 134.464 489.172 126.8 485.25 119.59C480.45 109.67 473.53 107.59 455.51 107.59H427C417.69 107.59 417.09 108.49 417.09 117.2V183.58H450.43C472.95 183.58 474.43 179.07 478.06 158.65H487.37V220.52H478C474.09 198.9 471.69 195.89 450.07 195.89H417.07V255.66C417.07 276.66 423.68 278.49 438.7 278.79H466.63C484.95 278.79 487.95 276.09 494.56 268.28C500.27 261.97 506.56 249.66 510.78 240.65L519.79 243Z" fill="url(#paint0_linear_177_628)"/>
    <path d="M624.34 95.5098C666.69 95.5098 693.42 103.92 712.04 121.64C726.75 136.06 737.57 157.08 737.57 185.91C737.57 221.05 723.15 249.59 700.03 267.01C677.2 284.13 648.03 290.73 611.12 290.73H540.84V282.32C566.67 279.92 567.84 277.82 567.84 253.19V133.35C567.84 107.52 564.24 106.35 540.84 103.92V95.5098H624.34ZM594 250.79C594 273.31 603.61 279.62 626.14 279.62C680.2 279.62 707.83 242.68 707.83 190.12C707.83 157.38 696.72 132.45 673 118.03C659.18 109.32 641.76 106.03 621.64 106.03C608.12 106.03 600.91 107.83 597.91 110.23C595.21 112 594 115.33 594 127V250.79Z" fill="url(#paint1_linear_177_628)"/>
    <path d="M766.74 290.73V282.32C791.37 279.62 793.74 278.42 793.74 252.89V133.65C793.74 107.82 791.34 106.65 766.74 103.92V95.5098H847.24V103.92C822.31 106.62 819.9 107.82 819.9 133.65V252.89C819.9 278.72 822.31 279.62 847.24 282.32V290.73H766.74Z" fill="url(#paint2_linear_177_628)"/>
    <path d="M983.61 290.73V282.32C1003.14 279.92 1005.54 276.92 1001.34 265.5C997.43 253.79 991.42 238.78 985.12 219.85H920.24C915.43 233.37 910.93 245.08 906.73 257.4C900.12 276.92 904.32 279.32 928.95 282.32V290.73H859.57V282.32C878.5 279.92 883.3 277.82 893.81 250.79L956 93.0998L965.6 91.2998C984.53 142.66 1005.25 199.43 1024.17 251.39C1033.79 277.52 1036.49 279.92 1057.81 282.32V290.73H983.61ZM953.61 130.65C944 156.48 933.78 183.81 924.78 207.54H980.94L953.61 130.65Z" fill="url(#paint3_linear_177_628)"/>
    </g>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_177_628" x="0" y="0" width="1066.31" height="352.73" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="8.5" dy="5.67"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_177_628"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_177_628" result="shape"/>
    </filter>
    <filter id="filter1_d_177_628" x="32.59" y="-0.41" width="58.4398" height="58.44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="0.41" dy="0.41"/>
    <feGaussianBlur stdDeviation="0.41"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0666667 0 0 0 0 0.0431373 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_177_628"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_177_628" result="shape"/>
    </filter>
    <filter id="filter2_d_177_628" x="-0.41" y="91.05" width="347.46" height="257.24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="0.41" dy="0.41"/>
    <feGaussianBlur stdDeviation="0.41"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0666667 0 0 0 0 0.0431373 0 0 0 1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_177_628"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_177_628" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_177_628" x1="360.91" y1="192.82" x2="519.79" y2="192.82" gradientUnits="userSpaceOnUse">
    <stop offset="0.14" stop-color="#C39B17"/>
    <stop offset="0.53" stop-color="#FFDD96"/>
    <stop offset="0.71" stop-color="#DDB74D"/>
    <stop offset="0.86" stop-color="#C39B17"/>
    </linearGradient>
    <linearGradient id="paint1_linear_177_628" x1="540.84" y1="193.12" x2="737.57" y2="193.12" gradientUnits="userSpaceOnUse">
    <stop offset="0.14" stop-color="#C39B17"/>
    <stop offset="0.53" stop-color="#FFDD96"/>
    <stop offset="0.71" stop-color="#DDB74D"/>
    <stop offset="0.86" stop-color="#C39B17"/>
    </linearGradient>
    <linearGradient id="paint2_linear_177_628" x1="766.74" y1="193.12" x2="847.24" y2="193.12" gradientUnits="userSpaceOnUse">
    <stop offset="0.14" stop-color="#C39B17"/>
    <stop offset="0.53" stop-color="#FFDD96"/>
    <stop offset="0.71" stop-color="#DDB74D"/>
    <stop offset="0.86" stop-color="#C39B17"/>
    </linearGradient>
    <linearGradient id="paint3_linear_177_628" x1="859.57" y1="191.02" x2="1057.8" y2="191.02" gradientUnits="userSpaceOnUse">
    <stop offset="0.14" stop-color="#C39B17"/>
    <stop offset="0.53" stop-color="#FFDD96"/>
    <stop offset="0.71" stop-color="#DDB74D"/>
    <stop offset="0.86" stop-color="#C39B17"/>
    </linearGradient>
    <clipPath id="clip0_177_628">
    <rect width="1067" height="353" fill="white"/>
    </clipPath>
    </defs>
    </svg>    
    `
  )}`;
