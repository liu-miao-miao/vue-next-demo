<template>
  <div class="Page">
    <h1>This is an Page page</h1>
    <h2>Mouse Position X: {{ x }}</h2>
    <h2>Mouse Position Y: {{ y }}</h2>
    <h2>ref Count: {{ count }}</h2>
    <h2>reactive Count: {{ stateValue }}</h2>
    <h2>watch Count: {{ watchRef }}</h2>
    <h2>Computed Count: {{ computedRefAndReactive }}</h2>
    <button @click="refAdd">refAdd</button>
    <button @click="reactiveAdd">reactiveAdd</button>
    <button @click="reset">reset</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onDeactivated,
} from "vue";
import { useMousePosition } from "../hooks/useMousePosition";

export default {
  name: "Page",
  setup() {
    const { x, y } = useMousePosition();
    const count = ref(0);
    const watchRef = ref(0);
    const state = reactive({
      stateValue: 0,
      userInfo: {
        name: "1",
      },
    });

    onBeforeMount(() => {
      console.log("onBeforeMount");
    });

    onMounted(() => {
      console.log("onMounted");
    });

    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });

    onUpdated(() => {
      console.log("onUpdated");
    });

    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });

    onUnmounted(() => {
      console.log("onUnmounted");
    });

    onDeactivated(() => {
      console.log("onDeactivated");
    });

    const methods = {
      refAdd() {
        count.value++;
      },
      reactiveAdd() {
        state.stateValue++;
      },
      reset() {
        count.value = 0;
        state.stateValue = 0;
      },
    };

    watch(
      () => count.value,
      (val) => {
        return (watchRef.value = val * 2);
      }
    );

    // 监听多个
    watch(
      [() => count.value, () => state.stateValue],
      ([count, state], [prevCount, prevState]) => {
        console.log(count, prevCount);
        console.log(state, prevState);
      }
    );

    const computedRefAndReactive = computed(
      () => count.value + state.stateValue
    );

    //传入对象自定义get set的形式
    const _computedRefAndReactive = computed({
      get() {
        return count.value + state.stateValue;
      },
      set(val) {
        count.value = val;
      },
    });

    return {
      x,
      y,
      count,
      watchRef,
      ...toRefs(state),
      computedRefAndReactive,
      _computedRefAndReactive,
      ...methods,
    };
  },
};
</script>

<style lang="less">
.Page {
  background-color: #fff;
}
</style>
