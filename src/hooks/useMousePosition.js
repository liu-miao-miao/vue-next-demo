import { reactive, toRefs, onMounted, onUnmounted } from "vue";

export function useMousePosition() {
  const state = reactive({
    x: 0,
    y: 0,
  });

  const getPosition = (e) => {
    state.x = e.pageX;
    state.y = e.pageY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", getPosition);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", getPosition);
  });

  return { ...toRefs(state) };
}
