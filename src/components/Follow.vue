<template>
  <div class="d-flex align-items-center">
    <img :src="avatar_url"
         class="rounded-circle avatar"
         alt="Аватар подписки"/>
    <a :href="html_url"
       class="ms-3 link-primary text-decoration-none"
       target="_blank">
      {{ login }}
    </a>
  </div>
</template>

<script>
// Composition API
export default {
  props: {
    follow: Object
  },
  setup({ follow }) {
    return {
      login     : follow.login,
      avatar_url: follow.avatar_url,
      html_url  : follow.html_url
    };
  }
};
</script>

<style scoped>

</style>
