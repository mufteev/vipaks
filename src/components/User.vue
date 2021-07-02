<template>
  <div class="d-flex align-items-center justify-content-between">
    <div class="user-text">
      <img :src="avatar_url"
           class="rounded-circle avatar me-3"
           alt="Аватар пользователя"/>
      <a :href="html_url"
         class="link-primary text-decoration-none"
         target="_blank">
        {{ login }}
      </a>
    </div>
    <div>
      <button @click="add"
              class="btn btn-sm btn-outline-success">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

// Composition API
export default {
  props: {
    user: Object
  },
  setup({ user }) {
    const store = useStore();
    return {
      login     : user.login,
      html_url  : user.html_url,
      avatar_url: user.avatar_url,
      add       : () => store.dispatch('team/addUserToMembers', user, { root: true }),
    };
  }
};
</script>

<style scoped>

</style>
