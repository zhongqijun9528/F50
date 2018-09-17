export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 0,
        rows: [],
        total: 0
    },

    mutations: {
        getusers(state, payload) {
            Object.assign(state, payload)
        },
        nameRepeat(state, payload) {
            // console.log(state,payload)
            let arr = state.rows.filter((item) => {
                return item.userAcount == payload
            })
            if (arr.length > 0) {
                document.getElementById("name").innerHTML = "×"
                document.getElementById("name").style.color = "red";
                document.getElementById("name").style.fontSize = "25px";
            } else {
                document.getElementById("name").innerHTML = ""
            }

        },

        phoneReprat(state, payload) {
            if (!(/^1\d{10}$/.test(payload))) {
                document.getElementById("phone").innerHTML = "×"
                document.getElementById("phone").style.color = "red";
                document.getElementById("phone").style.fontSize = "25px";
            } else {
                document.getElementById("phone").innerHTML = ""
            }
        },
        setCurPage(state, payload) {
            state.curpage = payload;

        },
        setEachPage(state, payload) {
            state.eachpage = payload
        }
    },
    actions: {
        async deleteuser(context, id) {
            
            let data = await fetch(`/users/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            }).then(function (response) {
                return response.json();
            });
            context.commit("getusers", data)
        },
        // async isEditoruser(context, id,userAcount,userPhone,userMail,userName,userType,userStatus) {
        //     console.log(context.state.rows);
        //     let data = await fetch(`/users/${id}`, {
        //         method: "put",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({userAcount,userPhone,userMail,userName,userType,userStatus})
        //     }).then(function (response) {
        //         return response.json();
        //     });
        //     context.commit("getusers", data)
        // },
        async asyncgetusers(context, { curpage, eachpage } = {}) {
            let page = curpage || context.state.curpage;
            let rows = eachpage || context.state.eachpage;
            let data = await fetch(`/users?page=${page}&rows=${rows}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                // query: JSON.stringify({
                //     curpage: curpage || context.state.curpage,
                //     eachpage: eachpage || context.state.eachpage
                //   })
                // query:JSON.stringify({
                //     rows:5,
                //     page:5,
                // })
            }).then(response => {
                return response.json();
            })
            context.commit("getusers", data)
            // console.log(data);
        }
    },
    getters: {

    }
}