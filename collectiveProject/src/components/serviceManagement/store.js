export default {
  namespaced: true,
  strict: true,
  state: {
    curpage: 1,
    eachpage: 5,
    maxpage: 0,
    rows: [],
    total: 0
  },
  mutations: {
    getService(state, payload) {
      state.rows = payload;
    }
  },
  actions: {
    // 新增
    async asyncAddService(context, params) {
      console.log(params);
      const data = await fetch("/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }).then(response => {
        return response.text();
      });
      console.log(data);
      return data;
    },

    // 获取
    async asyncGetService(context) {
      const data = await fetch("/services", {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      // console.log(data);
      context.commit("getService", data);
    }
  }
};
