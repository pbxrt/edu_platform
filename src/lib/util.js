import _ from 'lodash';
import XLSX from 'xlsx';

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
    let tmpDown =
      new Blob([s2ab(XLSX.write(tmpWB, {bookType: 'xlsx', bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
          ))], {type: ''});  // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = href;
    a.download = `${tableName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {  // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, sec);
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
    midRst = midRst.reduce((prev, next) => {
      return prev.concat(next);
    });
    midRst.forEach(data => {
      tempRow[data.position] = {v: data.value}
    });
    return tempRow;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
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