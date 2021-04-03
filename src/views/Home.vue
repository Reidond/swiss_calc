<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>EEI</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">EEI</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-textarea
          class="textarea"
          readonly
          v-model="textareaRef"
        ></ion-textarea>
        <div class="actions-container">
          <ion-row v-for="(r, i) in controlsRef" :key="`${r}${i}`">
            <ion-col v-for="(c, ci) in r" :key="`${c}${ci}`">
              <ion-button
                @click="onControlPress(c)"
                expand="block"
                size="large"
                color="light"
                >{{ c }}</ion-button
              >
            </ion-col>
          </ion-row>
        </div>
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
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useSwissCalcCalculator } from "@/use/swisscalc_calculator.js";
import {
  useDivisionOperator,
  useMultiplicationOperator,
  useSubtractionOperator,
  useAdditionOperator,
  usePercentOperator,
} from "@/use/swisscalc_operator_cache.js";

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
  },
  setup() {
    const textareaRef = ref("0");
    const controlsRef = ref([
      ["AC", "+/-", "%", "/"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ",", "="],
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
    };
  },
});
</script>

<style scoped>
.textarea {
  --padding-end: var(--padding-top);
  text-align: end;
  font-weight: normal;
  font-size: 24px;
}
.container {
  display: flex;
  flex-flow: column;
  min-height: calc(100vh - var(--offset-top));
}
.actions-container {
  min-height: 370px;
  margin-top: auto;
}
</style>
