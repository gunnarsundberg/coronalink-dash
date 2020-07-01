<template>
  <div>
    <Slide :closeOnNavigation="true">
      <a id="home">
        <nuxt-link to="/">
          <span class="nav-link">Dashboard</span>
        </nuxt-link>
      </a>
      <a id="">
        <nuxt-link to="/data">
          <span class="nav-link">Data</span>
        </nuxt-link>
      </a>
      <a id="">
        <nuxt-link to="/api">
          <span class="nav-link">API</span>
        </nuxt-link>
      </a>
    </Slide>
      <div class="px-md-5 py-5" style="background: #654ea3; background: -webkit-linear-gradient(to right, #654ea3, #eaafc8); background: linear-gradient(to right, #654ea3, #eaafc8);">
        <div class="my-0 py-5 px-lg-5 text-white">
            <h1 class="pt-5 px-5 header">FLORIDA POLY</h1>
            <h1 class="pb-0 px-5 header">COVID PROJECT</h1>
            <p class=" px-5 pb-5">Data and insights related to the COVID-19 pandemic</p>
        </div>
      </div>
      <nuxt />
      <div class="bg-dark text-white">
        <div class="py-5">
          <b-container class="text-center">
            <b-row align-v="center">
              <b-col>
                <b-row class="pb-3">
                  <b-col align-h="center" class="px-5">
                    <img src="https://floridapoly.edu/_resources/assets/icons/svg/logo.svg">
                  </b-col>
                </b-row>
                <b-row class="py-3 px-3">
                  <b-col>
                    <nuxt-link to="/" class="footer-link">
                      Home
                    </nuxt-link>
                  </b-col>
                  <b-col>
                    <nuxt-link to="/data" class="footer-link">
                      Data
                    </nuxt-link>
                  </b-col>
                  <b-col>
                    <nuxt-link to="/api" class="footer-link">
                      API
                    </nuxt-link>
                  </b-col>
                  <div class="d-lg-none d-md d-sm py-md-3 py-xs-3 py-sm-3 w-100"></div>
                  <b-col>
                    <a class="footer-link" target="blank" href="https://floridapoly.edu">Florida Poly Website</a>
                  </b-col>
                  <b-col>
                    <a class="footer-link" target="blank" href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC Guidelines</a>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </div>
    </div>
  </div>
</template>

<style>
  .bm-burger-bars {
      background-color: white !important;
    }

  .line-style {
      position: absolute;
      height: 10% !important;
      left: 0;
      right: 0;
  }

  .bm-item-list > * > span {
      margin-left: 10px;
      font-weight: 700;
      color: white !important;
  }

  .bm-menu {
    background-color: #343a40 !important;
  } 

  .nav-link {
    color: white !important;
    font-weight: bolder;
  }

  .footer-link {
    color: white;
  }
  .header {
    font-family: 'Miriam Libre', sans-serif;
  }
  div {  
    font-family: 'Open Sans', sans-serif;
  }
</style>
