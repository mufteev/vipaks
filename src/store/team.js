export default {
  namespaced: true,
  state() {
    return {
      users  : [],
      members: [],
    };
  },
  mutations: {
    loadUsers(state, users) {
      state.users = users;
    },
    addUserToMembers(state, user) {
      const idx = state.users.findIndex(x => x.id === user.id);
      if (idx > -1) {
        state.members.push(user);
        state.users.splice(idx, 1);
      }
    },
    removeMemberToUsers(state, member) {
      const idx = state.members.findIndex(x => x.id === member.id);
      if (idx > -1) {
        state.users.push(member);
        state.members.splice(idx, 1);
      }
    }
  },
  actions  : {
    loadUsers({ commit }, users) {
      commit('loadUsers', users);
    },
    addUserToMembers({ commit }, user) {
      commit('addUserToMembers', user);
    },
    removeMemberToUsers({ commit }, member) {
      commit('removeMemberToUsers', member);
    }
  }
};
