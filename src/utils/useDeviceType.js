export default function useDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}
