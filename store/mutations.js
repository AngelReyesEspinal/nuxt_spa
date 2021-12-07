import moment from 'moment';

export const set_all = (state, payload) => {
    state.all = payload;
}

export const set_season_data = (state, payload) => {
    state.season_data = payload;
}

export const set_schedule_data = (state, payload) => {
    state.schedule_data = payload;
}

export const set_giveaways = (state, payload) => {
    state.giveaways = payload;
}

export const set_games = (state, payload) => {
    state.games = payload;
}

export const set_all_giveaways_data = (state, payload) =>  {
    state.all_giveaways_data = payload;
}

export const set_giveaways_data = (state, payload) =>  {
    state.giveaways_data = payload;
}

export const set_giveaways_months = (state, payload) =>  {
    state.giveaways_months = payload;
}

export const set_giveaways_days = (state, payload) =>  {
    state.giveaways_days = payload;
}

export const set_giveaways_types = (state, payload) =>  {
    state.giveaways_types = payload;
}

export const concat_season_games = (state, payload) => {
    state.all.push(...payload);
    state.all.forEach((game) => {
        game.ticketInfo = { axs: null };
    });
}

export const attach_schedule = (state, payload) => {
    state.all.forEach((game) => {
        const item = payload.find((g) => g.gameId === game.gid);
        if (item) {
            game.ticketInfo.axs = item.axs;
        }
        game.isTbd = game.htm === 'TBD';
    });
}

export const append_tooltip_to_games = (state, payload) => {
    const all = state.all.map((x) => {
        const currentGame = state.giveaways.find((y) => y.gid === x.gid);
        let tooltipContent = `<p style="font-weight: bold; text-transform: uppercase;"> ${currentGame?.giveawaySubTitle ? currentGame?.giveawaySubTitle : ''} </p>`;
        if (currentGame?.giveawayImageWide)
            tooltipContent += `<img src="${currentGame?.giveawayImageWide}" width="100" height="100" class="mb-2">`;
        tooltipContent += `<p style="font-weight: bold; text-transform: uppercase;">${currentGame?.giveawayName ? currentGame?.giveawayName : ''}</p>`
        return {
            ...x,
            giveawaySubTitle: currentGame?.giveawaySubTitle ? currentGame?.giveawaySubTitle : '',
            giveawayName: currentGame?.giveawayName ? currentGame?.giveawayName : '',
            sgtpageFlag: currentGame?.sgtpageFlag,
            giveawayImageWide: currentGame?.giveawayImageWide,
            tooltipContent
        }
    });
    state.all = all;
}

export const filter_sgt_data_by_date = (state, payload) => {
    const currentDate = new Date();
    const filteredData = state.all.filter((x) => {
        if (x.etm === 'TBD') {
            return x;
        } else {
            const formattedDate = new Date(x.etm);
            if (isValidDate(formattedDate) && formattedDate >= currentDate) {
                return x;
            }
        }
    })
    state.all = filteredData;
    function isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }
}

export const set_months = (state) => {
    state.months = state.all.map((game) => {
        const gameDate = moment(game.htm);
        return {
            name: gameDate.format("MMMM"),
            value: gameDate.month() + 1,
        }
    }).reduce((acc, el) => {
        if (!acc.some((a) => a.name == el.name)) {
            acc.push(el);
        }
        return acc;
    }, []);
}

export const set_teams_by_filtered_data = (state) => {
    state.teams = state.all
        .map((game) => {
            return {
                fullName: game.h.tn == 'Clippers' ? `${game.v.tc} ${game.v.tn}` : `${game.h.tc} ${game.h.tn}`,
                name: game.h.tn == 'Clippers' ? game.v.tn : game.h.tn
            }
        }).reduce((acc, el) => {
            if (!acc.some((a) => a.name == el.name)) {
                acc.push(el);
            }
            return acc;
        }, []).sort((a, b) => {
            if (a.fullName < b.fullName) { return -1; }
            if (a.fullName > b.fullName) { return 1; }
            return 0;
        });
}
