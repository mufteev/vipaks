<template>
  <div>
    <div class="nav nav-tabs justify-content-center">
    <span class="nav-item">
      <router-link class="nav-link" active-class="active" to="/">Мой профиль</router-link>
    </span>
      <span class="nav-item">
      <router-link class="nav-link" active-class="active" to="/team">Моя команда</router-link>
    </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { useStore } from 'vuex';

const linkGetUsers = 'https://api.github.com/users?since=50000000';
const linkGetProfile = 'https://api.github.com/users';
const optionFetch = {
  method: 'GET',
  headers: {
    Authorization: 'token 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'
  }
};
const fetchJSON = (url) => fetch(url, optionFetch)
  .then(response => response.ok ? response.json() : Promise.reject());

// Composition API
export default {
  setup() {
    const store = useStore();

    fetchJSON(`${linkGetProfile}/${store.state.profile.login}`)
      .then(profile => {
        store.dispatch('profile/loadProfile', profile, { root: true });

        return Promise.all([
          fetchJSON(profile.repos_url),
          fetchJSON(profile.following_url.replace(/{.*/, ''))
        ]);
      })
      .then(async ([repositories, following]) => {
        let links = await Promise.all(repositories.map(x => fetchJSON(x.languages_url)));
        let zipRepo = repositories.map((x, i) => ({
          ...x,
          langs: links[i]
        }));

        store.dispatch('profile/loadRepositories', zipRepo, { root: true });
        store.dispatch('profile/loadFollowing', following, { root: true });
      })
      .catch(err => console.error(err));

    fetchJSON(linkGetUsers)
      .then(users => store.dispatch('team/loadUsers', users, { root: true }));
  }
};
</script>

<style lang="scss">

html, body {
  overflow: hidden;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-y: scroll;
  height: 100%;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "style/breakpoints";
@import "style";
</style>
