
// 浏览器宽度和高度比较当做最外层box宽度（box为正方形）
const boxWidth = Math.min(document.body.clientWidth || document.documentElement.clientWidth, document.body.clientHeight || document.documentElement.clientHeight);
// 秒钟盒子（最外层）
const box_second = document.querySelector("#box-second");
box_second.style.width = boxWidth + "px";
box_second.style.height = boxWidth + "px";
// 分钟盒子（第二层）
const box_minute = document.querySelector("#box-minute");
box_minute.style.width = boxWidth - 140 + "px";
box_minute.style.height = boxWidth - 140 + "px";
// 小时盒子（第三层）
const box_hour = document.querySelector("#box-hour");
box_hour.style.width = boxWidth - 280 + "px";
box_hour.style.height = boxWidth - 280 + "px";
// 日盒子（第四层）
const box_day = document.querySelector("#box-day");
box_day.style.width = boxWidth - 420 + "px";
box_day.style.height = boxWidth - 420 + "px";
// 月盒子（第五层）
const box_month = document.querySelector("#box-month");
box_month.style.width = boxWidth - 560 + "px";
box_month.style.height = boxWidth - 560 + "px";
// 周盒子
const box_week = document.querySelector("#box-week");
// 年盒子
const box_year = document.querySelector("#box-year");

const _second = new BoxGather("#box-second", {
    renderList: json.second
});
const _minute = new BoxGather("#box-minute", {
    renderList: json.minute
});
const _hour = new BoxGather("#box-hour", {
    renderList: json.hour
});
const _day = new BoxGather("#box-day", {
    renderList: json.day
});
const _month = new BoxGather("#box-month", {
    renderList: json.month
});

const renderClock = () => {
    const nowDate = getCurrentTime();
    const htmlYear = box_year.innerHTML;
    const htmlWeek = box_week.innerHTML;

    _second.go(nowDate.second);
    _minute.go(nowDate.minute);
    _hour.go(nowDate.hour);
    _day.go(nowDate.day - 1);
    _month.go(nowDate.month - 1);

    htmlWeek == json.week[nowDate.week] ? null : box_week.innerHTML = json.week[nowDate.week];
    htmlYear == nowDate.year + "年" ? null : box_year.innerHTML = nowDate.year + "年";
}

window.setInterval(() => {
    renderClock();
}, 1000);

window.addEventListener("load", () => {
    renderClock();
});