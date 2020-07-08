/*
    Store for national outbreak data in the US
*/

export const state = () => ({
    // List of cumulative national outbreak records
    list: []
})

export const mutations = {
    add (state, record) {
        state.list.push(
            record
        )
        
    },
}

export const actions = {
    async get({commit}) {
      await this.$axios.get('https://covidtracking.com/api/v1/us/daily.json')
        .then((res) => {
          if (res.status === 200) {
            res.data.forEach(element => {
                commit('add', element)
            });
          }
        })
    },
}