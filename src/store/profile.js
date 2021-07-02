import { login } from '@/login';
import { toDate, LOADED_STATE } from '@/util';

export default {
  namespaced: true,
  state     : () => ({
    login,
    avatar_url        : '',
    created_at        : '',
    html_url          : '',
    following         : [],
    repositories      : [],
    state_repositories: LOADED_STATE.LOADING,
    state_following   : LOADED_STATE.LOADING,
  }),
  mutations : {
    loadProfile(state, profile) {
      state.html_url = profile.html_url;
      state.avatar_url = profile.avatar_url;
      state.created_at = toDate(profile.created_at);
    },
    loadRepositories(state, repositories) {
      state.repositories = repositories;
      state.state_repositories = repositories.length > 0
        ? LOADED_STATE.LOADED
        : LOADED_STATE.LOADED_EMPTY;
    },
    loadFollowing(state, following) {
      state.following = following;
      state.state_following = following.length > 0
        ? LOADED_STATE.LOADED
        : LOADED_STATE.LOADED_EMPTY;
    }
  },
  actions   : {
    loadProfile({ commit }, profile) {
      commit('loadProfile', profile);
    },
    loadRepositories({ commit }, repositories) {
      commit('loadRepositories', repositories);
    },
    loadFollowing({ commit }, following) {
      commit('loadFollowing', following);
    },
  },
};
