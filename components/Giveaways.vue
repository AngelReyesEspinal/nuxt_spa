<template>
  <div>
    <div class="container banner-container">
      <!-- Full Width Header -->
      <div class="row-full row-full-header">
        <img
          class="img-responsive visible-xs"
          src="https://www.nba.com/resources/static/team/v2/clippers/custom/giveaways/img/hero-mobile2.jpg"
        />
        <div class="text-center header-text hidden-xs">
          <div class="subhead">
            2021
            <img
              class="icon"
              src="https://www.nba.com/resources/static/team/v2/clippers/custom/season-tickets/img/icon.png"
            />
            2022
          </div>
          <h1>Special Events<br />& Giveaways</h1>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

    <div id="special-events-calendar" class="sgt-utms">
      <div class="container">
        <div class="header-filters">
          <div class="row row-flex">
            <div class="col-sm-12 col-md-4 col-lg-5">
              <div class="left-side">
                <h1><span class="red">Ticket</span> Offers</h1>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-7 filter-dropdowns">
              <div class="right-side">
                <select
                  class="other-select"
                  id="inputGroupSelect02"
                  filter-prop="month"
                  @change="addToFilter"
                  v-model="month"
                >
                  <option value="">All Months</option>
                  <option v-for="(month, i) in months" :key="i" :value="month">
                    {{ month }}
                  </option>
                </select>

                <select
                  class="other-select"
                  id="inputGroupSelect03"
                  filter-prop="day"
                  @change="addToFilter"
                  v-model="day"
                >
                  <option value="">All Days</option>
                  <option v-for="day in days" :key="day" :value="day">
                    {{ day }}
                  </option>
                </select>

                <select
                  class="other-select"
                  id="inputGroupSelect03"
                  filter-prop="type"
                  @change="addToFilter"
                  v-model="type"
                >
                  <option value="">All Types</option>
                  <option v-for="type in types" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>

                <button
                  type="button"
                  class="other-select btn btn-default pull-left filterReset"
                  @click="resetFilter"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="body-calendar-events">
          <div class="row row-grid">
            <div
              v-for="giveaway in giveaways"
              :class="giveaway.gameCount"
              :key="giveaway.gid"
              class="responsive-card card col-sm-12 col-md-6 col-lg-4"
            >
              <!--Has Product Image-->
              <div v-if="giveaway.giveawayImageWide" class="has-product">
                <div class="card-top">
                  <div class="date-wrapper">
                    <div class="day">
                      {{ giveaway.eventTime | formatMoment('dddd') }}
                      {{ giveaway.timeTime }}
                    </div>
                    <div class="date">
                      {{ giveaway.eventTime | formatMoment('MMMM') }}
                      {{ giveaway.eventTime | formatMoment('D') }}
                    </div>
                  </div>
                  <div class="product">
                    <img
                      class="product-img"
                      :src="giveaway.giveawayImageWide"
                    />
                  </div>
                  <div class="name">
                    <div
                      class="sub-name"
                      v-html="giveaway.giveawaySubTitle"
                    ></div>
                    <div class="title-name">{{ giveaway.giveawayName }}</div>
                  </div>
                </div>
              </div>
              <div v-if="!giveaway.giveawayImageWide">
                <div class="card-top">
                  <div class="day">
                    {{ giveaway.eventTime | formatMoment('dddd') }}
                  </div>
                  <div class="month">
                    {{ giveaway.eventTime | formatMoment('MMMM') }}
                  </div>
                  <div class="date">
                    {{ giveaway.eventTime | formatMoment('D') }}
                  </div>
                  <div class="time">
                    <div v-if="giveaway.gameCount === 'game-25'">TBD</div>
                    <div v-else-if="giveaway.gameCount === 'game-26'">TBD</div>
                    <div v-else>
                      {{ giveaway.timeTime }}
                    </div>
                  </div>
                  <div class="name">
                    <div
                      class="sub-name"
                      v-html="giveaway.giveawaySubTitle"
                    ></div>
                    <div class="title-name">{{ giveaway.giveawayName }}</div>
                  </div>
                </div>
              </div>

              <div class="card-bottom text-center">
                <div class="logo-sponsor">
                  <div class="logo-left">
                    <div class="vs">
                      <img
                        class="vs-img"
                        src="https://singlegameticketstorage.blob.core.windows.net/giveawayblob/img-products/vs.png"
                      />
                    </div>
                    <div class="logo">
                      <img :src="giveaway.opponentLogo" alt="" />
                    </div>
                  </div>

                  <div v-if="giveaway.sponsorLogo" class="g-sponsor-right">
                    <div class="presented">Presented By</div>
                    <div class="g-logo-wrapper">
                      <img
                        class="g-sponsor-logo"
                        :src="giveaway.sponsorLogo"
                        @error="setSponsorError(giveaway)"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="attendance">{{ giveaway.giveawayQuantity }}</div>
                <div>
                  <a
                    type="button"
                    target="_blank"
                    class="btn btn-red giveaway"
                    :class="giveaway.eventClass"
                    :href="giveaway.eventTicketLink"
                    >GET TICKETS</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import moment from 'moment'
import Vue from 'vue'

export default {
  async created() {
    await this.$store.dispatch('fetch_giveaways_data')
  },
  data() {
    return {
      filter: {},
      month: '',
      day: '',
      type: '',
    }
  },
  methods: {
    addToFilter($event, value) {
      const prop = $event.target.attributes.getNamedItem('filter-prop')
      if (!$event.target.value) {
        delete this.filter[prop.value]
        this.filter = $.extend(true, {}, this.filter)
        return
      }
      this.filter[prop.value] = $event.target.value
      this.filter = $.extend(true, {}, this.filter)
    },
    resetFilter() {
      this.filter = {}
      ;[this.day, this.month, this.type] = ['', '', '']
    },
    setSponsorError(giveaway) {
      Vue.set(giveaway, 'sponsorError', true)
    },
  },
  computed: {
    giveaways() {
      return this.$store.state.giveaways_data
    },
    months() {
      return this.$store.state.giveaways_months
    },
    days() {
      return this.$store.state.giveaways_days
    },
    types() {
      return this.$store.state.giveaways_types.filter((x) => x)
    },
  },
  watch: {
    filter: {
      handler: function (value) {
        const all = this.$store.state.all_giveaways_data
        if ($.isEmptyObject(value)) {
          this.$store.commit('set_giveaways_data', all)
          return
        }
        const giveaways = all
          .filter(function (ga) {
            if (value.month) {
              var gaDate = moment(ga.eventTime)
              return gaDate.format('MMMM') == value.month
            }
            return true
          })
          .filter(function (ga) {
            if (value.day) {
              var gaDate = moment(ga.eventTime)
              return gaDate.format('dddd') == value.day
            }
            return true
          })
          .filter(function (ga) {
            if (value.type) {
              return ga.giveawayItemType === value.type
            }
            return true
          })

        this.$store.commit('set_giveaways_data', giveaways)
      },
      deep: true,
    },
    month(value) {
      const all = this.$store.state.all_giveaways_data

      const days = all
        .filter(function (event) {
          if (!value) {
            return true
          }
          const date = moment(event.eventTime)
          return date.format('MMMM') === value
        })
        .map(function (event) {
          const date = moment(event.eventTime)
          return date.format('dddd')
        })
        .reduce(function (acc, day) {
          if (!acc.includes(day)) {
            acc.push(day)
          }
          return acc
        }, [])

      const types = all
        .filter(function (event) {
          if (!value) {
            return true
          }
          const date = moment(event.eventTime)
          return date.format('MMMM') === value
        })
        .map(function (e) {
          return e.giveawayItemType
        })
        .reduce(function (acc, t) {
          if (!acc.includes(t)) {
            acc.push(t)
          }
          return acc
        }, [])

      this.$store.commit('set_giveaways_days', days)
      this.$store.commit('set_giveaways_types', types)
    },
  },
}
</script>
<style src="../assets/css/giveaways/2021style.css" scoped></style>
<style src="../assets/css/giveaways/2021card.css" scoped></style>
<style src="../assets/css/giveaways/2021page.css" scoped></style>
<style scoped>
#special-section-clippers-season-20192020 .content .single-game-top .last-select {
    border: solid 1px #d7d7d7;
}
</style>