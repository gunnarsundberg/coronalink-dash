<template>
  <div>
    <div class=" px-5 mx-5 pt-5">
      <vue-markdown :source="mdFile"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'

export default {
  components: {
    VueMarkdown
  },

  async asyncData () {
    const data = await axios.get("https://raw.githubusercontent.com/gunnarsundberg/covid-tracker-dashboard/master/md_content/api.md")
    return {mdFile: data.data}
  }
}
</script>