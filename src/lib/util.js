import _ from 'lodash';
import XLSX from 'xlsx';

export function getPercentageFormat(tdData) {
    return _.isNumber(tdData) ? (tdData + '%') : tdData;
}

export function formatOptions(arr) {
    return _.map(arr, item => ({
        value: item,
        label: item
    }));
}

export function downloadData(cols, rows, tableName, isAll) {
    var sec = 0;
    if(isAll === true) {
        sec = window.allListenerCount * 800;
        window.allListenerCount = window.allListenerCount + 1;
    }
    var tempRow = formatDownloadData(cols, rows);
    let outputPos = Object.keys(tempRow)  // 设置区域,比如表格从A1到D10
    let tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
            tempRow, // 内容
            {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
    };
    setTimeout(() => {
        console.time('writeFile')
        XLSX.writeFile(tmpWB, tableName+'.xlsx', {compression: true});
        console.timeEnd('writeFile')
    }, sec)
}

function formatDownloadData(cols, rows) {
    var tempRow = {};
    var allRows = [cols, ...rows];
    var midRst = _.map(allRows, (row, rowIndex) => {
        return _.map(row, (cellData, colIndex) => {
            var columnPosition = (colIndex>25) ? getCharCol(colIndex) : String.fromCharCode(65+colIndex);
            return {
                value: cellData,
                position: `${columnPosition}${rowIndex+1}`
            }
        });
    });
    let res = [];
    _.each(midRst, row => {
        res.push(...row)
    })
    res.forEach(data => {
      tempRow[data.position] = {v: data.value}
    });
    return tempRow;
}

function getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    let s = ''
    let m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}