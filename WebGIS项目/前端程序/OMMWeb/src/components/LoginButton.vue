<template>
    <a-button type="primary" :loading="iconLoading" @click="enterIconLoading">登录</a-button>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
  },
  setup() {
    const userName = ref('');
    const iconLoading = ref(false);
    const enterIconLoading = () => {
      iconLoading.value = {
        delay: 1000,
      };
      setTimeout(() => {
        iconLoading.value = false;
      }, 6000);

    };
    return {
      userName,
      loading: ref(false),
      iconLoading,
      enterIconLoading,
    };
  },
});
</script>