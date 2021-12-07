import moment from 'moment';

import {
  season_games,
  preseason_games,
  schedule,
  giveaways
} from '../config/constants';

export const fetch_sgt_data = async ({ state, commit, dispatch }) => {
  await dispatch('fetch_preseason_games');
  await dispatch('fetch_season_games');
  await dispatch('fetch_schedule');
  await dispatch('fetch_giveaways');
  commit('append_tooltip_to_games');
  commit('filter_sgt_data_by_date');
  commit('set_games', state.all);
  commit('set_months');
  commit('set_teams_by_filtered_data');
}

export const fetch_preseason_games = async ({ state, commit, dispatch }) => {
  if (state.all.length === 0) {
    let json = {};
    try {
      const response = await fetch(preseason_games);
      json = await response.json();
    } catch (ex) {
      json = { gscd: { g: [] } };
      console.log(ex);
    } finally {
      const games = json.gscd.g;
      games.forEach((g) => {
        g.isPreseason = true;
        g.isTbd = true;
        g.ticketInfo = {
          axs: null
        };
      });
      commit('set_all', games);
    }
  }
}

export const fetch_season_games = async ({ state, commit, dispatch }) => {
  if (state.season_data.length === 0) {
    let json = {};
    try {
      const response = await fetch(season_games);
      json = await response.json();
    } catch (ex) {
      console.log(ex);
    } finally {
      const games = json.gscd.g.filter((game) => game.h.tn == "Clippers");
      commit('concat_season_games', games);
      commit('set_season_data', games);
    }
  }
}

export const fetch_schedule = async ({ state, commit, dispatch }) => {
  if (state.schedule_data.length === 0) {
    let json = {};
    try {
      const response = await fetch(schedule);
      json = await response.json();
    } catch (ex) {
      console.log(ex);
    } finally {
      const filteredSchedule = [];
      state.all.forEach((game) => {
        const item = json.find((g) => g.gameId === game.gid);
        if (item)
          filteredSchedule.push(item);
      });
      commit('attach_schedule', json);
      commit('set_schedule_data', filteredSchedule);
    }
  }
}

export const fetch_giveaways = async ({ state, commit, dispatch }) => {
  if (state.giveaways.length === 0) {
    let json = {};
    try {
      const response = await fetch(giveaways);
      json = await response.json();
    } catch (ex) {
      console.log(ex);
    } finally {
      commit('set_giveaways', json);
    }
  }
}

export const fetch_giveaways_data = async ({ state, commit, dispatch }) => {
  if (state.giveaways_data.length === 0) {
    let data = {};
    try {
      const response = await fetch(giveaways);
      data = await response.json();
    } catch (ex) {
      console.log(ex);
    } finally {
      data = data.filter((x) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const date2 = new Date(x.eventTime)
        date2.setHours(0, 0, 0, 0)
        const diff = date2.getTime() - date.getTime()
        return diff >= 0;
      });

      const all = data;

      const months = all
        .map(function (giveaway) {
          const date = moment(giveaway.eventTime);
          return date.format('MMMM');
        })
        .reduce(function (acc, month) {
          if (!acc.includes(month)) {
            acc.push(month);
          }
          return acc;
        }, []);

      const days = all
        .map(function (giveaway) {
          const date = moment(giveaway.eventTime);
          return date.format('dddd');
        })
        .reduce(function (acc, day) {
          if (!acc.includes(day)) {
            acc.push(day);
          }
          return acc;
        }, []);

      const types = all
        .map(function (g) {
          return g.giveawayItemType;
        })
        .reduce(function (acc, t) {
          if (!acc.includes(t)) {
            acc.push(t);
          }
          return acc;
        }, []);

      commit('set_all_giveaways_data', all);
      commit('set_giveaways_data', data);
      commit('set_giveaways_months', months);
      commit('set_giveaways_days', days);
      commit('set_giveaways_types', types);
    }
  }
}