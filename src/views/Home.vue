<template>
  <ion-page>
    <ion-header v-if="hideHeader" :translucent="true">
      <ion-toolbar>
        <ion-title>Swiss Calc</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header v-if="hideHeader" collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Swiss Calc</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-textarea
          class="textarea display-container"
          readonly
          v-model="textareaRef"
        ></ion-textarea>
        <ion-grid :style="{ ...actionsContainerGridPadding }">
          <ion-row v-for="(r, i) in controlsRef" :key="`${r}${i}`">
            <ion-col
              v-for="(c, ci) in r"
              :key="`${c}${ci}`"
              :style="{ ...actionsContainerGridColPadding }"
            >
              <ion-button
                @click="onControlPress(c)"
                expand="block"
                size="large"
                color="light"
                >{{ c }}</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
} from "@ionic/vue";
import { computed, defineComponent, ref } from "vue";
import { useSwissCalcCalculator } from "@/use/swisscalc_calculator.js";
import {
  useDivisionOperator,
  useMultiplicationOperator,
  useSubtractionOperator,
  useAdditionOperator,
  usePercentOperator,
} from "@/use/swisscalc_operator_cache.js";
import { useScreenOrientation } from "@/use/screen_orientation.js";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonRow,
    IonCol,
    IonButton,
    IonGrid,
  },
  setup() {
    const textareaRef = ref("0");
    const controlsRef = ref([
      ["AC", "+/-", "%", "/"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="],
    ]);

    const {
      addDigit,
      addBinaryOperator,
      addUnaryOperator,
      negate,
      clear,
      equalsPressed,
      getMainDisplay,
    } = useSwissCalcCalculator();

    const { screenOrientation, ORIENTATIONS } = useScreenOrientation();

    const hideHeader = computed(() => {
      return screenOrientation.value !== ORIENTATIONS.LANDSCAPE_PRIMARY;
    });

    const actionsContainerGridPadding = computed(() => {
      if (!hideHeader.value) {
        return {
          "--ion-grid-column-padding": "2px",
          "--ion-grid-padding": "2px",
        };
      }
      return {
        "--ion-grid-column-padding": "5px",
        "--ion-grid-padding": "5px",
      };
    });

    const actionsContainerGridColPadding = computed(() => {
      if (!hideHeader.value) {
        return {
          "padding-top": "0px",
          "padding-bottom": "0px",
        };
      }
      return {};
    });

    const onControlPress = (control) => {
      const actions = {
        "0": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "1": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "2": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "3": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "4": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "5": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "6": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "7": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "8": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "9": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        ".": {
          type: "digit",
          action: () => {
            addDigit(control);
          },
        },
        "/": {
          type: "operator",
          op: useDivisionOperator(),
          action: (op) => {
            addBinaryOperator(op);
          },
        },
        x: {
          type: "operator",
          op: useMultiplicationOperator(),
          action: (op) => {
            addBinaryOperator(op);
          },
        },
        "-": {
          type: "operator",
          op: useSubtractionOperator(),
          action: (op) => {
            addBinaryOperator(op);
          },
        },
        "+": {
          type: "operator",
          op: useAdditionOperator(),
          action: (op) => {
            addBinaryOperator(op);
          },
        },
        "%": {
          type: "operator",
          op: usePercentOperator(),
          action: (op) => {
            addUnaryOperator(op);
          },
        },
        "+/-": {
          type: "common",
          action: () => {
            negate();
          },
        },
        AC: {
          type: "common",
          action: () => {
            clear();
          },
        },
        "=": {
          type: "common",
          action: () => {
            equalsPressed();
          },
        },
      };
      actions[control].type === "operator" &&
        actions[control].action(actions[control].op);
      (actions[control].type === "digit" ||
        actions[control].type === "common") &&
        actions[control].action();
      const mainDisplayValue = getMainDisplay();
      textareaRef.value = mainDisplayValue;
    };

    return {
      textareaRef,
      controlsRef,
      onControlPress,
      actionsContainerGridPadding,
      actionsContainerGridColPadding,
      hideHeader,
    };
  },
});
</script>

<style scoped>
.textarea {
  --padding-bottom: 0px;
  --padding-end: var(--padding-top);
  text-align: end;
  font-weight: normal;
  font-size: 24px;
  margin-top: 0px;
  margin-bottom: auto;
}
.container {
  flex: 1;
}
.display-container {
  flex: 1;
  justify-content: flex-end;
}
ion-grid {
  margin-inline: unset;
  margin-top: auto;
}
</style>
