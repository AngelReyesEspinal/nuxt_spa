import moment from 'moment';
import Vue from 'vue'

Vue.filter('replace', function (val, replace, withVal) {
    return val.replace(replace, withVal);
})

Vue.filter('toTime', function (val) {
    return moment(val).format("LT");
})

Vue.filter('toGameDate', function (val) {
    return moment(val).format("MMMM DD")
})

Vue.filter('capitalize', function (val) {
    if (!val) return "";
    return val.toUpperCase();
})

Vue.filter('formatMoment', function (val, format) {
    if (!val) return "";
    return moment(val).format(format);
})

Vue.filter('toTitleCase', function (str) {
    const splitted = str.split(" ");
    const joined = splitted
        .map((str, i) => {
            if (i === 0) {
                if (str === "Staples") {
                    return str.toUpperCase();
                } else {
                    return str.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                }
            } else {
                return str.replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        })
        .join(" ");
    return joined;
})
