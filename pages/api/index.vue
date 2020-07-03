<template>
  <div>
    <div class="px-5 mx-5 pt-5">
      <div class="px-lg-5">
        <h1>API Documentation</h1>
        <p>Welcome to our API documentation! Our data was created with research in mind, but is totally open and available to anyone. We want to make our data as accessible as possible. If you have any issues or questions, please feel free to reach out to us. The best way to get in touch is through the issues section of our github. We have a repository for <a target="blank" href="https://github.com/gunnarsundberg/covid-tracker">the backend and API</a> and a separate repository for <a target="blank" href="https://github.com/gunnarsundberg/covid-tracker-dashboard">the web app</a>. Learn more about our policies, data, and usage below.</p>
      </div>
      <div :id="tocID" class="px-lg-5"></div>
      <vue-markdown 
        :source="mdFile" 
        :toc="toc" 
        toc-id="toc" 
        :toc-first-level="1" 
        :toc-last-level="4" 
        class="px-lg-5 pb-5">
      </vue-markdown>
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

  data () {
    return {
      toc: true,
      tocID: "toc"
    }
  },

  async asyncData () {
    const data = await axios.get("https://raw.githubusercontent.com/gunnarsundberg/covid-tracker-dashboard/master/md_content/api.md")
    return {mdFile: data.data}
  }
}
</script>