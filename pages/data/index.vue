<template>
  <div class="">
    <div class="p-5 mx-lg-5">
        <div class="px-md-5 mx-md-5 px-sm-5">
            <vue-markdown :source="mdFile"></vue-markdown>
        </div>
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
    const data = await axios.get("https://raw.githubusercontent.com/gunnarsundberg/covid-tracker-dashboard/master/md_content/data.md")
    return {mdFile: data.data}
  }
}
</script>