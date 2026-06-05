export interface Breakpoint {
  label: string;
  min: number;
  max: number;
  containerRatio: number;
}

export const BREAKPOINTS: Breakpoint[] = [
  { label: "1920–1800", min: 1800, max: 1920, containerRatio: 1.00 },
  { label: "1799–1600", min: 1600, max: 1799, containerRatio: 0.85 },
  { label: "1599–1440", min: 1440, max: 1599, containerRatio: 0.78 },
  { label: "1439–1360", min: 1360, max: 1439, containerRatio: 0.66 },
  { label: "1359–1200", min: 1200, max: 1359, containerRatio: 0.60 },
  { label: "1199–1024", min: 1024, max: 1199, containerRatio: 0.50 },
  { label: "1023–992", min: 992, max: 1023, containerRatio: 0.44 },
  { label: "991–840", min: 840, max: 991, containerRatio: 0.44 },
  { label: "839–768", min: 768, max: 839, containerRatio: 0.40 },
  { label: "767–640", min: 640, max: 767, containerRatio: 0.38 },
  { label: "639–576", min: 576, max: 639, containerRatio: 0.35 },
  { label: "575–480", min: 480, max: 575, containerRatio: 0.33 },
  { label: "479–440", min: 440, max: 479, containerRatio: 1.00 },
  { label: "439–401", min: 401, max: 439, containerRatio: 1.00 },
  { label: "400–375", min: 375, max: 400, containerRatio: 1.00 },
  { label: "374–360", min: 360, max: 374, containerRatio: 1.00 },
  { label: "359–340", min: 340, max: 359, containerRatio: 1.00 },
];

export const PADDING_MIN_SMALL = 50;
export const PADDING_MIN_MOBILE = 40;

export const FONT_MIN = 14;
export const FONT_MIN_H1 = 32;
export const FONT_MIN_MOBILE = 14;

export const MOBILE_BP_INDEX = 11;