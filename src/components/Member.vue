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
      <button @click="remove"
              class="btn btn-sm btn-outline-danger px-3">
        &minus;
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

// Composition API
export default {
  props: {
    member: Object
  },
  setup({ member }) {
    const store = useStore();

    return {
      login     : member.login,
      html_url  : member.html_url,
      avatar_url: member.avatar_url,
      remove    : () => store.dispatch('team/removeMemberToUsers', member, { root: true })
    };
  }
};
</script>

<style scoped>

</style>
