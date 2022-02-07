<template>
  <div class="header-links">
    <span @click="onChangeUrl('/')" class="link">Single Game Tickets</span> |
    <span @click="onChangeUrl('/giveaways')" class="link">Giveaway</span>
    <br/>
  </div>
</template>
<script>

let _currentPage = window.location.href;
const charactersAfterLastSlash  = /[^\/]+$/;
const _defaultParameters = {
	utm_source: 'website',
	utm_medium: '',
	utm_campaign: 'default',
	cid: '',
	t_cid: ''
}
 
const defaultLinks = [
  { 
    url: 'axs.com/', 
    openInNewTab: true
  },{ 
    url: 'shop.clippers.cloud', 
    openInNewTab: true
  }
];

let defaultUtmCodes = {};
let defaultIgnoredUtmCodes = [];

export default {
  async created() {
    this.urlUtmCodes = this.getParams(_currentPage);
  },
  data() {
    return {
      filter: {},
      urlUtmCodes: {}
    }
  },
  methods: {
    onChangeUrl(url) {
      this.encodeUrl(url);
    }, 
    has (obj) {
      return typeof(obj) !== 'undefined' && obj && Object.keys(obj).some(x => obj[x] !== '');
    },
    getParams (url) {
      let params = {};
      let parser = document.createElement('a');
      parser.href = url;
      let query = parser.search.substring(1);
      let vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return (!params.hasOwnProperty('')) ? params : {};
    },
    setGACodesToDefaultUtmCodes (hrefUtmCodes) {
      Object.keys(hrefUtmCodes).forEach(key => {
        if (!defaultUtmCodes.hasOwnProperty(key)) 
          defaultUtmCodes[key] = hrefUtmCodes[key];
      });
      return defaultUtmCodes;
    },
    hasTheMainUtmCodes (codes) {
      let hasTheMainCodes = true;
      Object.keys(_defaultParameters).forEach(key => {
        if (!Object.keys(codes).some(x => x.includes(key) && codes[key] !== '')) {
          hasTheMainCodes = false;
        }
      });	
      return hasTheMainCodes;
    },
    setMediumToDefaultParameters () {
      let hasCamefrom = false;
      let medium;
      if (charactersAfterLastSlash.test(_currentPage)) {
        medium = _currentPage.match(charactersAfterLastSlash)[0];
      }  
      if (!medium)
        medium = '?utm_source=website'
      let params = this.getParams(medium);
      if (medium.includes('?')) {
        if (Object.keys(params).some(x => x === 'camefrom')) {
          hasCamefrom = true;
          medium = params.camefrom;
        }
        else 
          medium = medium.split('?')[0];
      }
      _defaultParameters.utm_medium = medium;
      return hasCamefrom;
    },
    redirectTo (url) {
      this.$router.push(url);
    },
    createNewHref (targetUrl, hrefUtmCodes) {
      const isShop = targetUrl.includes('shop.axs');
      const isTest = !!document.getElementById('app-test-sgt');
      let newUtmCombinations = Object.keys(hrefUtmCodes).map(x => `${x}=${hrefUtmCodes[x]}`)
      if(isTest && isShop)
        newUtmCombinations = newUtmCombinations.map(x=> x.includes('t_') ? x :`t_${x}`);
      let newUtms = newUtmCombinations.join('&');
      const newHref =`${targetUrl}?${newUtms}` 
      return newHref;
    },
    encodeUrl (elementUrl) {
      let hrefUtmCodes = this.getParams(elementUrl);
      let targetUrl = elementUrl.split('?');
      if (this.has(this.urlUtmCodes)) {
        if (this.has(defaultUtmCodes)) 
          hrefUtmCodes = this.setGACodesToDefaultUtmCodes(hrefUtmCodes);
        Object.keys(this.urlUtmCodes).forEach(key => {
          hrefUtmCodes[key] = this.urlUtmCodes[key];
        });
      } else if (this.has(defaultUtmCodes)) {
        Object.keys(defaultUtmCodes).forEach(key => {
          if (!defaultIgnoredUtmCodes.some(x => x === key))
            hrefUtmCodes[key] = defaultUtmCodes[key];
        });
      } 
      if (!this.hasTheMainUtmCodes(hrefUtmCodes)) {
        let hasCamefrom = this.setMediumToDefaultParameters();
        if (hasCamefrom) 
          delete hrefUtmCodes.camefrom; 
        Object.keys(_defaultParameters).forEach(key => {
          if (!hrefUtmCodes.hasOwnProperty(key) || (hrefUtmCodes.hasOwnProperty(key) && hrefUtmCodes[key] === '')) 
            hrefUtmCodes[key] = _defaultParameters[key];
      
        });
      }
      
      //hrefUtmCodes.cid = utag_data["tealium_visitor_id"]

      if (hrefUtmCodes.hasOwnProperty('sitewide_overrides_preview')) {
        delete hrefUtmCodes['sitewide_overrides_preview'];
      }
      
      //console.log(hrefUtmCodes);
      //console.log(targetUrl[0]);
      
      this.redirectTo(this.createNewHref(elementUrl, hrefUtmCodes));
    }
  }
}
</script>
<style scoped>
.header-links{
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
}
.link{
  text-decoration: none;
  font-family: "Agency fb";
  font-size: 24px;
  color: #000;
}
.link:hover{
  color: red;
  cursor: pointer;
}
</style>
