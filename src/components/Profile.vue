<template>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6 col-12 text-lg-end text-center">
        <img :src="avatar_url"
             class="rounded avatar"
             alt="Аватар пользователя"/>
      </div>
      <div class="col-md-6 col-12 text-lg-start text-center align-self-center">
        <a :href="html_url"
           class="link-primary display-5 text-decoration-none"
           target="_blank">
          {{ login }}
        </a>
        <div>
          <span class="fs-6">Дата создания: {{ created_at }}</span>
        </div>
      </div>
    </div>

    <hr/>

    <div class="card mb-4">
      <div class="card-header">
        Репозитории
      </div>
      <div class="card-body">
        <div v-if="is_repositories_loaded" class="list-group">
          <Repository v-for="repository in repositories"
                      :key="repository.id"
                      :repository="repository" class="list-group-item"/>
        </div>
        <div v-else>
          {{ state_repositories_text }}
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        Подписки
      </div>
      <div class="card-body">
        <div v-if="is_following_loaded" class="list-group">
          <Follow v-for="follow in following"
                  :key="follow.id"
                  :follow="follow"
                  class="list-group-item"/>
        </div>
        <div v-else>
          {{ state_following_text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { LOADED_STATE } from '@/util';
import Follow from '@/components/Follow';
import Repository from '@/components/Repository';

export default {
  name      : 'Profile',
  computed  : {
    ...mapState('profile', {
      login             : s => s.login,
      html_url          : s => s.html_url,
      avatar_url        : s => s.avatar_url,
      created_at        : s => s.created_at,
      following         : s => s.following,
      repositories      : s => s.repositories,
      state_following   : s => s.state_following,
      state_repositories: s => s.state_repositories,
    }),
    is_following_loaded() {
      return this.state_following === LOADED_STATE.LOADED;
    },
    state_following_text() {
      switch (this.state_following) {
        case LOADED_STATE.LOADING:
          return 'Загрузка подписок...';
        case LOADED_STATE.LOADED_EMPTY:
          return 'Подписки отсутствуют.';
        default:
          return null;
      }
    },
    is_repositories_loaded() {
      return this.state_repositories === LOADED_STATE.LOADED;
    },
    state_repositories_text() {
      switch (this.state_repositories) {
        case LOADED_STATE.LOADING:
          return 'Загрузка репозиториев...';
        case LOADED_STATE.LOADED_EMPTY:
          return 'Репозитории отсутствуют.';
        default:
          return null;
      }
    },
  },
  components: {
    Repository,
    Follow
  }
};
</script>

<style scoped>
.avatar {
  height: 200px;
  width: 200px;
}
</style>
