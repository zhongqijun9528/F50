export default {
    namespaced: true,
    strict: true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        rows: [],
        total: 0,
        information: {
            type: "",
            text: ""
        }
    },
    mutations: {
        getEmpByPage(state, payload) {
            Object.assign(state, payload);
        },
        // 显示当前页数的方法
        setCurPage(state, payload) {
            console.log(payload)
            state.curpage = payload;
        },
        //显示当前页的数据条数方法
        setEachPage(state, payload) {
            console.log(payload)
            state.eachpage = payload;
        }
    },
    actions: {
        // 查询搜索数据
        async asyncGetEmpByPage(context, information, { curpage, eachpage } = {}) {
            information = information ? information : context.state.information
            const data = await fetch(`/orders?page=${curpage || context.state.curpage}&rows=${eachpage || context.state.eachpage}&type=${information.type}&text=${information.text}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    return response.json();
                })
            // console.log(data);
            context.commit('getEmpByPage', data);
        },
        // 删除
        async asyncDeletData(context, id) {
            console.log(id)
            const data = await fetch("/orders/deleteData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            }).then(response => {
                return response.json();
            })
            context.commit('getEmpByPage', data);
        },
    }
}