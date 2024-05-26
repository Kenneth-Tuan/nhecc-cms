<template>
  <p class="u-c-black u-text-14px u-rounded-8px u-px4px u-text-nowrap">
    {{ formattedTime }}
  </p>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";

dayjs.extend(duration);
dayjs.locale("zh-cn");
export default {
  name: "CountdownTimer",
  props: {
    targetTime: {
      type: String,
      default: "2024-05-31T23:59:59+08:00",
    },
  },
  setup(props) {
    const now = dayjs();
    const target = dayjs(props.targetTime);
    const timeLeft = ref(target.diff(now));
    let interval = null;

    const startCountdown = () => {
      interval = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value = timeLeft.value - 1000;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };

    const formattedTime = computed(() => {
      const duration = dayjs.duration(timeLeft.value);
      return `${duration.days()} 天 ${duration.hours()} 時 ${duration.minutes()} 分 ${duration.seconds()} 秒`;
    });

    onMounted(() => {
      startCountdown();
    });

    onUnmounted(() => {
      if (interval) {
        clearInterval(interval);
      }
    });

    return {
      timeLeft,
      formattedTime,
    };
  },
};
</script>

<style scoped>
.countdown-timer {
  font-size: 2rem;
  font-weight: bold;
}
</style>
