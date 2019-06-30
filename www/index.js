/**
 * 盒子方法
 */
class BoxGather {
    constructor(ele,option) {

        this.element = this.getElement(ele);
        // 检测ele是否正常
        if(!this.element) return;
        // 检测渲染列表是否正常
        if(!this.typeTest(option.renderList, "Array")) return;
        
        this.opt = option;
        this.len = this.opt.renderList.length;
        // 角度
        this.deg = 360 / this.len;
        // 转了多少圈
        this.rotate = 0;

        this.render();
    }

    /**
     * 获取元素
     * @param {string} ele class | id
     * @returns {element}
     */
    getElement (ele) {
        return document.querySelector(ele);
    }

    /**
     * 检测数据类型是否相符
     * @param {every} content 需要检测的内容
     * @param {string} hopeType 期望数据类型
     * @returns {boolen}
     */
    typeTest (content, hopeType) {
        return Object.prototype.toString.call(content) === `[object ${hopeType}]`;
    }

    render () {
        const fragment = document.createDocumentFragment();
        for(let i = 0; i < this.len; i++) {
            const element = document.createElement('span');
            element.className = "box-list";
            element.style.transform = `rotate(${-1 * this.deg * i}deg)`;
            element.innerHTML = this.opt.renderList[i];
            fragment.appendChild(element);
        }

        this.element.appendChild(fragment);
    }

    go (time) {
        if(time === null || time === undefined) return;
        this.element.style.transform = `rotate(${this.deg * time + this.rotate * 360}deg)`;
        console.log(time, this.len)
        if(time === this.len - 1) {
            this.rotate++;
            console.log("true");
        }
    }
}

const getCurrentTime = () => {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate()
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();

    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}