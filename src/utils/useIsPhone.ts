import { useSyncExternalStore } from "react";

// One breakpoint for every "desktop design vs phone design" switch.
const PHONE = "(max-width: 860px)";
const subscribe = (cb: () => void) => {
  const m = matchMedia(PHONE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export const useIsPhone = () => useSyncExternalStore(subscribe, () => matchMedia(PHONE).matches);
