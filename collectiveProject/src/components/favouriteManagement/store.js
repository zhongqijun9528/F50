
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
        gethosts(state, payload) {
            Object.assign(state, payload);
        },
        steCurpage(state, payload) {
            state.curpage = payload
        },
        setEachpage(state, payload) {
            state.eachpage = payload
        }
    },
    actions: {
        // 新增
        async asyncAddhosts(context, params) {
           
            const data = await fetch("/hosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }).then(response => {
                return response.text();
            });
            console.log(data)
        },

        // 获取
        async asyncGethosts(context, { curpage, eachpage, text,type} = {}) {

            const data = await fetch(
                `/hosts?page=${curpage || context.state.curpage}&rows=${eachpage ||
                context.state.eachpage}&type=${type ? type : ""}&text=${text ? text:""}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(response => {
                return response.json();
            });

            context.commit("gethosts", data);
        },
        //   删除
        async asyncDelentHosts(context, id) {   
            let data = await fetch('/hosts/' + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.text();
            });
        },  
        // 修改
        async asyncUpdateHosts(context,params){
            console.log(params);
            let data = await fetch(`/hosts/${params.updateId}`,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            }).then(response =>{
                return response.text()
            });
            console.log(data)
        }

    }
};