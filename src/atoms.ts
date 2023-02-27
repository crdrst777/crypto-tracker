import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // key(유일한 이름)
  default: false, // 기본값
});
