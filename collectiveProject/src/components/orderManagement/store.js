export default {
    namespaced: true,
    strict: true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        rows: [],
        total: 0,
    },
    mutations: {
        getEmpByPage(state, payload) {
            console.log(payload);
            Object.assign(state, payload);
        },
    },
    actions: {
        async asyncGetEmpByPage(context, { curpage } = {}) {
            const data = await fetch(`/orders?page=${curpage || context.state.curpage}&rows=${context.state.eachpage}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            })
            console.log(data);
            context.commit('getEmpByPage', data);
        }
    }
}