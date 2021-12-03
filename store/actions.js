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