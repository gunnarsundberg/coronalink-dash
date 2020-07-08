export const actions = {
    async nuxtServerInit ({ dispatch }) {
      
        await dispatch('nationalcumulative/get')
      
    }
}