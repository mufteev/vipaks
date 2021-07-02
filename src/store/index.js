import { createStore } from 'vuex';
import profile from '@/store/profile';
import team from '@/store/team'

export default createStore({
  modules: {
    profile,
    team
  }
});
