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
      Object.assign(state, payload);
    },
    setEachpage(state, payload) {
      state.eachpage = payload;
    }
  },
  actions: {
    // 新增
    async asyncAddService(context, params) {
      const data = await fetch("/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }).then(response => {
        return response.text();
      });
    },

    // 查询
    async asyncGetService(context, { curpage, eachpage, type, text, storeId } = {}) {
      const data = await fetch(
        `/services?page=${curpage || context.state.curpage}&rows=${eachpage ||
        context.state.eachpage}&type=${type ? type : ""}&text=${
        text ? text : ""}&storeId=${storeId ? storeId : ""}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        return response.json();
      });
      context.commit("getService", data);
    },

    // 删除
    async asyncDeleteService(context, id) {
      await fetch(`/services/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.text();
      });
    },

    // 修改
    async asyncUpdateService(context, params) {
      const data = await fetch(`/services/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }).then(response => {
        return response.text();
      });
    }
  }
};
