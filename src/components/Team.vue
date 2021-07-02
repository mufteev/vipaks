<template>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6 col-12">
        <h2>Моя команда</h2>
        <div v-if="visibilityMember" class="toolbar">
          <span class="link-primary"
                role="button"
                @click="orderChange">
            Сортировать по: <span class="text-decoration-underline">{{ orderDirection }}</span>
          </span>
        </div>
        <div class="list-group">
          <Member v-for="member in members"
                  :key="member.id"
                  :member="member"
                  class="list-group-item"/>
        </div>
      </div>
      <div class="col-md-6 col-12 mt-md-0 mt-4">
        <h2>Пользователи</h2>
        <div class="toolbar">
          <input @input="search"
                 type="text"
                 placeholder="Поиск..."
                 class="form-control">
        </div>
        <div class="list-group">
          <User v-for="user in users"
                :key="user.id"
                :user="user"
                class="list-group-item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ORDER_STATE } from '@/util';
import User from '@/components/User';
import Member from '@/components/Member';

export default {
  name    : 'Team',
  computed: {
    members() {
      return this.$store.state.team.members
      .map(x => ({...x}))
      .sort((x, y) => this.order ^ (x.login.localeCompare(y.login)))
    },
    users() {
      return this.$store.state.team.users
        .filter(u => u.login.startsWith(this.search_text))
        .sort((x, y) => x.id - y.id);
    },
    orderDirection() {
      return this.order === ORDER_STATE.ASCENDING ? 'возрастанию' : 'убыванию';
    },
    visibilityMember() {
      return this.members.length > 0;
    }
  },
  methods : {
    search(event) {
      this.search_text = event.target.value;
    },
    orderChange() {
      this.order = this.order === ORDER_STATE.ASCENDING ? ORDER_STATE.DESCENDING : ORDER_STATE.ASCENDING;
    }
  },
  data() {
    return {
      search_text: '',
      order      : ORDER_STATE.ASCENDING,
    };
  },
  components: {
    User,
    Member
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.toolbar {
  display: flex;
  align-items: center;
  height: 80px;
}
</style>
