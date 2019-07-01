/**
 * 获取元素
 * @param {string} ele class | id
 * @returns {element}
 */
const getElement = ele => document.querySelector(ele);


/**
 * 检测数据类型是否相符
 * @param {every} content 需要检测的内容
 * @param {string} hopeType 期望数据类型
 * @returns {boolen}
 */
const typeTest = (content, hopeType) => Object.prototype.toString.call(content) === `[object ${hopeType}]`;

const getCurrentTime = () => {
    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate()
    const hour = myDate.getHours();
    const minute = myDate.getMinutes();
    const second = myDate.getSeconds();
    const week = myDate.getDay();

    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
        week,
    }
}

/**
 * 盒子方法
 */
class BoxGather {
    constructor(ele,option) {

        this.element = getElement(ele);
        // 所有时间元素list集合 {索引（index） => element}
        this.elementList = {};
        // 上一个更改的元素的索引
        this.lastTime = null
        // 检测ele是否正常
        if(!this.element) return;
        // 检测渲染列表是否正常
        if(!typeTest(option.renderList, "Array")) return;
        
        this.opt = option;
        this.len = this.opt.renderList.length;
        // 角度
        this.deg = 360 / this.len;
        // 转了多少圈
        this.rotate = 0;

        this.render();
    }

    render () {
        const fragment = document.createDocumentFragment();
        for(let i = 0; i < this.len; i++) {
            const element = document.createElement('span');
            element.className = "box-list";
            element.style.transform = `rotate(${-1 * this.deg * i}deg)`;
            element.innerHTML = this.opt.renderList[i];
            fragment.appendChild(element);

            this.elementList[i] = element;
        }

        this.element.appendChild(fragment);
    }

    go (time) {
        if(time === null || time === undefined || time === this.lastindex) return;
        this.element.style.transform = `rotate(${this.deg * time + this.rotate * 360}deg)`;
        if(time === this.len - 1) {
            this.rotate++;
        }

        // 记录索引 并且把选中元素加上样式
        this.elementList[time] ? this.elementList[time].className = "box-list active" : null;
        this.elementList[this.lastindex] ? this.elementList[this.lastindex].className = "box-list" : null;
        this.lastindex = time;
    }
}

