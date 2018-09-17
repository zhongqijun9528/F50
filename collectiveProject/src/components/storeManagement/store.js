export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        rows: [],
        maxpage: 0,
        total: 0
    },
    mutations: {
        getStores(state, payload) {
            Object.assign(state, payload,{rows:payload.rows})
        },
    },
    actions: {
        async asyncGetStores(context, { curpage, eachpage } = {}) {
            let page = curpage || context.state.curpage;
            let rows = eachpage || context.state.eachpage;
            let data = await fetch(`/stores?page=${page}&rows=${rows}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                },
            }).then(response => {
                return response.json()
            })
            context.commit("getStores", data);
        },
        async removeiStores(context, id) {
            let data = await fetch(`/stores/removei?id=${id}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json"
                },
            }).then(response => {
                return response.json()
            })
        }
    }
}