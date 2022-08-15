import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index";
import requestsModules from "./modules/requests/index";

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModules,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
