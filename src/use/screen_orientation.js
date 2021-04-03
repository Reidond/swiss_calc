import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { ref } from "vue";

export function useScreenOrientation() {
  const screenOrientation = ref(ScreenOrientation.type);

  ScreenOrientation.onChange().subscribe(() => {
    screenOrientation.value = ScreenOrientation.type;
  });

  window.addEventListener("orientationchange", () => {
    screenOrientation.value = ScreenOrientation.type;
  });

  return {
    screenOrientation,
    ORIENTATIONS: ScreenOrientation.ORIENTATIONS,
  };
}
