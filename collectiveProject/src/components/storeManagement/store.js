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
            Object.assign(state, payload, { rows: payload.rows })
        },
        setEachPage(state, payload) {
            state.eachpage = payload;
        }
    },
    actions: {
        async asyncGetStores(context, { curpage, eachpage, shopName, search } = {}) {
            let page = curpage || context.state.curpage;
            let rows = eachpage || context.state.eachpage;
            if (shopName === "") {
                search.$message({
                    message: "查询信息不能为空",
                    type: "warning"
                });
                return;
            }
            if (!shopName) {
                shopName = ""
            }
            let data = await fetch(`/stores?page=${page}&rows=${rows}&shopName=${shopName}`, {
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