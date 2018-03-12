export const names = ["周涵雨", "周叶欣", "刘檩", "吴仁杰", "吕乐洋", "王未易", "谢琳莹", "曾琪", "李芯熳", "刘冰怡"];
export const parentNames = ["周东山", "周雨琦", "刘烨", "吴豪", "王中磊", "谢三进", "曾诗雨", "李彦奇", "刘琦"];
const roles = ['校长', '副校长', '年级主任', '学科组长', '任课老师']
const grades = ['高一', '高二', '高三']
const subjects = ['语文', '数学', '英语']

function getRandomItem(arr) {
    return arr[_.random(0, arr.length-1)]
}

function makeRandomStr() {
    return Math.random().toString(36).substr(8)
}

function makeRandomContact() {
    let start = getRandomItem(['151', '159', '186', '139'])
    return `${start}${_.random(1000, 9000)}${_.random(1000, 9000)}`
}

function makeRandomMail() {
    let domain = ['163', 'foxmail'];
    return `${makeRandomStr()}@${getRandomItem(domain)}.com`
}