<template>
<RouterView />
</template>
<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import { RouterLink, RouterView } from "vue-router";
export default defineComponent({
components: {
  Login,
  RouterView
},
});
</script>