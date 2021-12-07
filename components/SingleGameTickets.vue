<template>
  <div id="app">
    <div id="special-section-clippers-season-20192020" class="sgt-utms">
      <div class="content">
        <div class="container">
          <div class="single-game-top">
            <div class="title-box">
              <h1 class="m-0"><span>Single Game</span> TICKETS</h1>
            </div>
            <form action="" id="Filters" name="Filter">
              <div class="formfield" id="month">
                <div class="selectors">
                  <div class="order-inp">
                    <select
                      class="other-select team"
                      id="inputGroupSelect01"
                      filter-prop="team"
                      @change="addToFilter"
                      v-model="team"
                    >
                      <option value="" selected>All Opponents</option>
                      <option
                        v-for="team in teams"
                        :key="team.name"
                        :value="team.name"
                      >
                        {{ team.fullName }}
                      </option>
                    </select>
                    <select
                      class="other-select"
                      id="inputGroupSelect02"
                      filter-prop="month"
                      @change="addToFilter"
                      v-model="month"
                    >
                      <option value="">All Months</option>
                      <option
                        v-for="(month, i) in months"
                        :key="i"
                        :value="month.value"
                      >
                        {{ month.name }}
                      </option>
                    </select>
                    <select
                      v-if="false"
                      class="other-select"
                      id="inputGroupSelect04"
                      filter-prop="promotion"
                      @change="addToFilter"
                      v-model="promotion"
                    >
                      <option value="">Promotions</option>
                      <option
                        v-for="(promo, i) in promotions"
                        :key="i"
                        :value="promo"
                      >
                        {{ promo }}
                      </option>
                    </select>
                    <select
                      class="other-select"
                      id="inputGroupSelect03"
                      filter-prop="day"
                      @change="addToFilter"
                      v-model="day"
                    >
                      <option value="" selected>All Days</option>
                      <option
                        v-for="day in days"
                        :key="day.name"
                        :value="day.name"
                      >
                        {{ day.name }}
                      </option>
                    </select>
                    <div
                      class="other-select last-select"
                      id="inputGroupSelect01"
                    >
                      <button
                        type="button"
                        class="btn btn-default pull-left filterReset"
                        @click="clearFilters"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="single-game-body" id="options">
            <div class="accordion" id="accordionExample">
              <div
                class="card"
                v-for="(game, i) in games"
                :key="i"
                data-aos="fade-right"
              >
                <div class="card-header" :id="'heading' + i">
                  <div
                    id="activation"
                    class="pre-view"
                    data-toggle="collapse"
                    :data-target="'#collapse' + i"
                    aria-expanded="true"
                  >
                    <button
                      v-if="game.giveaways"
                      id="btn-arrow"
                      class="btn btn-arrow"
                    >
                      <i class="fas fa-angle-down"></i>
                    </button>
                    <div class="left-side">
                      <div class="group-1 date group">
                        <div class="date-info-container">
                          <h4
                            v-if="game.isTbd && !game.isPreseason"
                            class="dateDa"
                          >
                            {{ game.gdte | formatMoment('dddd') }}
                          </h4>
                          <h4 v-else class="dateDa">
                            {{ game.htm | formatMoment('dddd') }}
                          </h4>

                          <h3
                            v-if="game.isTbd && !game.isPreseason"
                            class="dateMon"
                          >
                            {{
                              game.v.tn == 'Clippers'
                                ? game.vtm
                                : game.gdte | toGameDate
                            }}
                          </h3>
                          <h3 v-else class="dateMon">
                            {{
                              game.v.tn == 'Clippers'
                                ? game.vtm
                                : game.htm | toGameDate
                            }}
                          </h3>
                          <a
                            v-if="game.isPreseason"
                            class="pre btn btn-primary btn-indicator"
                            href="https://www.google.com/search?q=clippers+courtside+mvp&oq=clippers&aqs=chrome.1.69i57j69i59j69i60l3.2126j0j7&sourceid=chrome&ie=UTF-8"
                            >PRESEASON</a
                          >
                        </div>

                        <span
                          v-if="game.sgtpageFlag === 'giveaway'"
                          v-tooltip="{
                            content: game.tooltipContent,
                          }"
                        >
                          <a
                            class="btn btn-danger btn-parallelogram btn-promotion"
                          >
                            <i class="bi bi-star-fill"></i>
                            <span>GIVEAWAY</span>
                          </a>
                        </span>

                        <span
                          v-else-if="game.sgtpageFlag === 'ticketoffer'"
                          v-tooltip="{
                            content: game.tooltipContent,
                          }"
                        >
                          <a
                            class="btn btn-primary btn-parallelogram btn-promotion"
                          >
                            <i class="bi bi-star-fill"></i>
                            <span>TICKET OFFER</span>
                          </a>
                        </span>
                      </div>
                      <div class="group-2 group">
                        <h1 class="mobile-txt">
                          {{ game.v.tn == 'Clippers' ? game.h.tc : game.v.tc }}
                          {{ game.v.tn == 'Clippers' ? game.h.tn : game.v.tn }}
                        </h1>

                        <div class="picture">
                          <img
                            alt="NBA LOGO"
                            :src="`https://www.nba.com/assets/logos/teams/primary/web/${
                              game.v.tn == 'Clippers' ? game.h.ta : game.v.ta
                            }.svg`"
                          />
                        </div>

                        <h2 class="mobile-txt">
                          {{ game.htm | formatMoment('dddd, MMMM D') }}
                        </h2>
                        <h2 class="mobile-txt">
                          {{
                            game.htm
                              | toTime
                              | replace(' PM', 'pm')
                              | replace(' AM', 'am')
                          }}
                          PT
                        </h2>

                        <div class="txt">
                          <h4>
                            {{
                              game.v.tn == 'Clippers' ? game.h.tc : game.v.tc
                            }}
                          </h4>
                          <h3>
                            {{
                              game.v.tn == 'Clippers' ? game.h.tn : game.v.tn
                            }}
                          </h3>
                        </div>
                      </div>
                      <div class="group-3 group">
                        <h4 v-show="!game.isTbd" class="hidden-xs">
                          {{ game.an | toTitleCase }}
                        </h4>
                        <h3
                          v-if="!game.isPreseason && !game.isTbd"
                          class="gameTime"
                        >
                          {{ game.htm | toTime }} PT
                        </h3>
                        <h3 v-else>TBD</h3>
                      </div>
                    </div>
                    <div class="right-side">
                      <div class="group-1 buy single-game-btn-container">
                        <a
                          class="btn btn-primary btn-rounded"
                          :href="game.ticketInfo.axs"
                          target="_blank"
                          >GET TICKETS</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="footer-description-card">
                    <p>
                      Giveaway item: Paul George bobblehead | Ticket Offer: Dia
                      De Los Muertos Ticket Package
                    </p>
                  </div>
                </div>
                <div
                  v-if="game.giveaways"
                  :id="'collapse' + i"
                  class="collapse"
                  :aria-labelledby="'heading' + i"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div class="item-description">
                      <div class="left-side">
                        <div class="child-1 child">
                          <div class="group-1">
                            <img
                              src="https://singlegameticketstorage.blob.core.windows.net/singlegamenightblob/assets/paul.png"
                              alt=""
                            />
                          </div>
                          <div class="group-2">
                            <h4><b>Paul George Bobblehead</b></h4>
                            <h4>First 10,000 in attendance</h4>
                            <div class="mini-foter">
                              <p>presented by:</p>
                              <P>Agua Caliente Casino Resorts</P>
                            </div>
                          </div>
                        </div>
                        <div class="child-2 child">
                          <div class="group-1">
                            <img
                              src="https://singlegameticketstorage.blob.core.windows.net/singlegamenightblob/assets/t-shirt.png"
                              alt=""
                            />
                          </div>
                          <div class="group-2">
                            <h4><b>Dia De Los Muertos T-Shirt</b></h4>
                            <h4>
                              Third party purchases will not include the item
                              and this is not a stadium wide promotion.
                            </h4>
                            <div class="mini-foter">
                              <P
                                >SPECIAL TICKET REQUIRED. |
                                <a href="#">More Info</a></P
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="games.length == 0" class="card">
                <div
                  class="card-header"
                  style="display: flex; justify-content: center"
                >
                  <img
                    src="../assets/img/loading-gif.gif"
                    alt="this slowpoke moves"
                    width="200"
                  />
                  <!-- No games available for the time and date chosen. -->
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

export default {
  async created() {
    if (!this.isDataLoaded) await this.$store.dispatch('fetch_sgt_data')

    setTimeout(() => {
        console.log(this.$store.state.schedule_data)
        console.log(this.$store.state.all)
        console.log(this.$store.state.season_data)
        console.log(this.$store.state.giveaways)
    }, 10000)
  },
  data() {
    return {
      filter: {},
      days: [
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' },
        { name: 'Saturday' },
        { name: 'Sunday' },
      ],
      promotions: ['Giveaways', 'Ticket Offer'],
      month: '',
      team: '',
      day: '',
      promotion: '',
      TBD: 'TBD',
    }
  },
  methods: {
    toggleArrow($event) {
      $event.target.classList.toggle('rotateArrow')
    },
    addToFilter($event) {
      const prop = $event.target.attributes.getNamedItem('filter-prop')
      if (!$event.target.value) {
        delete this.filter[prop.value]
        this.filter = $.extend(true, {}, this.filter)
        return
      }
      this.filter[prop.value] = $event.target.value
      this.filter = $.extend(true, {}, this.filter)
    },
    clearFilters() {
      this.filter = {}
      ;[this.day, this.month, this.team] = ['', '', '']
    },
  },
  computed: {
    getGames() {
      return this.$store.state.games
    },
    isDataLoaded() {
  

      return (
        this.$store.state.schedule_data.length !== 0 &&
        this.$store.state.all.length !== 0 &&
        this.$store.state.season_data.length !== 0 &&
        this.$store.state.giveaways.length !== 0
      )
    },
    games() {
      return this.$store.state.games
    },
    months() {
      return this.$store.state.months
    },
    teams() {
      return this.$store.state.teams
    },
  },
  watch: {
    filter: {
      handler: function (val) {
        const all = this.$store.state.all
        if ($.isEmptyObject(val)) {
          this.$store.commit('set_games', all)
          return
        }
        const games = all
          .filter((game) => {
            const gameDate = moment(game.htm)
            if (val.month) {
              return (gameDate.month() + 1).toString() == val.month
            }
            return true
          })
          .filter((game) => {
            const gameDate = moment(game.htm)
            if (val.day) {
              return gameDate.format('dddd').toString() == val.day
            }
            return true
          })
          .filter((game) => {
            const gameDate = moment(game.htm)
            if (val.team) {
              return game.v.tn == val.team || game.h.tn == val.team
            }
            return true
          })
          .filter((game) => {
            if (val.promotion) {
              return val.promotion === 'Giveaways'
                ? game.promotion === 'Giveaway'
                : val.promotion === game.promotion
            }
            return true
          })
        this.$store.commit('set_games', games)
      },
      deep: true,
    },
    month(val) {
      const all = this.$store.state.all
      const filteredTeams = all
        .filter((game) => {
          if (!val || game.h.tn == this.team || game.v.tn == this.team)
            return true
          const gameDate = moment(game.htm)
          return (gameDate.month() + 1).toString() == val
        })
        .map((game) => {
          return {
            fullName:
              game.h.tn == 'Clippers'
                ? `${game.v.tc} ${game.v.tn}`
                : `${game.h.tc} ${game.h.tn}`,
            name: game.h.tn == 'Clippers' ? game.v.tn : game.h.tn,
          }
        })
        .reduce((acc, el) => {
          if (!acc.some((a) => a.name == el.name)) {
            acc.push(el)
          }
          return acc
        }, [])
        .sort((a, b) => {
          if (a.fullName < b.fullName) {
            return -1
          }
          if (a.fullName > b.fullName) {
            return 1
          }
          return 0
        })
      this.$store.commit('set_teams', filteredTeams)
    },
  },
}
</script>
<style src="../assets/css/style.css" scoped></style>