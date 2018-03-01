import _ from 'lodash'
import React from 'react';
import { colorsMap } from '../shared/constants';
import classNames from 'classnames';
import { downloadData } from '../lib/util';
/**
 * props:
 * tableData: 需要在table里渲染的全部数据,
 * tableHeader: 需要渲染的表格的表头
 * reserveRows: 截取数据时保留的行数;(默认保留5行) 如果不需要折叠，则传入true
 * customSort : 自定义排序的行为 比如：某一行不参与排序
 * cancelTableSort : 取消整个表格的排序功能
 * handleOnClick： 点击单元格回调函数
 * cancelDownload: 默认支持下载，但是只能下载当前表格展示的数据，若是表格配合分页，而且需要下载全量的数据，则隐藏此处默认的下载，单独实现下载
 * downloadkeys: 如果想要下载的话，必须传入该字段
 * tableName: 如果想要下载的话，必须传入该字段
 * tableHeader支持的字段：{
 *      id:
 *      name:
 *      tipConfig: 表格表头需要显示的注释内容
 *      colSpan:
 *      rowSpan:
 *      columnStyle: 给指定列添加样式， {} / function ,例如实现标红
 *      dataFormat： 格式化指定列的数据 ，function ，例如 统一加 %
 *      cancelColumnSort: 取消某一列的排序
 *
 *      freeze: 'left/rigt' 指定该列的冻结位置
 *      height: 为了hack 冻结列的bug
 * }
 */

//TODO: 整理样式
//集成了排序和下载之后，如果传递的是组件，如何支持排序和下载 还是干脆不支持传递组件,

// 钻取数据表现样式
// 表格排序时的箭头样式
const SortDirection = ({sortKey, sortDir, id}) => {
    return (
        <span style={localStyle.sortDirection}>
            <div className='dropup' style={_.assign({}, { width: 8, height: '40%', cursor: 'pointer' }, sortKey !== id ? { visibility: 'visible', color: '#dcdcdc' } : sortDir === 'asc' ? { visibility: 'visible', color: '#333' } : { visibility: 'hidden' }) }>
                <span className='caret' style={{ width: '100%' }} ></span>
            </div>
            <div className='dropdown' style={_.assign({}, { width: 8, height: '40%', cursor: 'pointer' }, sortKey !== id ? { visibility: 'visible', color: '#dcdcdc' } : sortDir === 'desc' ? { visibility: 'visible', color: '#333' } : { visibility: 'hidden' }) }>
                <span className='caret' style={{ width: '100%' }}></span>
            </div>
        </span>
    )
}

class TableComponent extends React.Component{
    constructor(props){
        super(props);
        this.columnStyles = [];
        this.dataFormats = [];
    }
    componentWillReceiveProps(nextProps){
        this.columnStyles = [];
        this.dataFormats = [];
    }
    handleOnClick(id, rowData){
        this.props.handleOnClick(id, rowData)
    }
    handleSort(sortKey){
        this.props.handleSort(sortKey)
    }
    emptyFn() {
    }
    render(){
        var {tableHeader, tableData, showData, cancelTableSort, sortDir, sortKey, widthStyle} = this.props
        var headSeq = [];
        return (
            <table style={_.assign({}, {border: '1px solid #ccc', borderCollapse: 'collapse'}, widthStyle ? widthStyle : {})}>
                <thead>
                {
                    _.map(tableHeader, (headerList, trindex) => {
                        return (
                            <tr key={'thead-tr-' + trindex}>
                                {
                                    _.map(headerList, (header, thindex) => {
                                        if (header.id !== undefined) {
                                            headSeq.push(header.id);
                                        }
                                        if (header.columnStyle !== undefined && this.columnStyles[header.id] === undefined) {
                                            this.columnStyles[header.id] = header.columnStyle;
                                        }
                                        if (header.dataFormat !== undefined && this.dataFormats[header.id] === undefined) {
                                            this.dataFormats[header.id] = header.dataFormat;
                                        }
                                        return (
                                            <th key={'thead-th-' + thindex}
                                                rowSpan={header.rowSpan ? header.rowSpan : 1}
                                                colSpan={header.colSpan ? header.colSpan : 1}
                                                style={_.assign({}, header.height ? {height: header.height} : {}, { padding: '20px 14px 10px 28px', borderWidth: '1px 2px', borderStyle: 'solid', borderColor: `${colorsMap.C04} ${colorsMap.B03}`, backgroundColor: colorsMap['C01'], position: 'relative', whiteSpace: 'nowrap', fontSize: 14, fontWeight: 'bold'})}
                                                onClick={cancelTableSort || header.cancelColumnSort ? this.emptyFn : this.handleSort.bind(this, header.id)}
                                                >
                                                <span style={header.tipContent !== undefined ? {marginRight: 5} : {}}>{header.name}</span>
                                                {(header.cancelColumnSort || cancelTableSort)? '' : (header.id ? (<SortDirection sortDir={sortDir} sortKey={sortKey} id={header.id}/>): '')}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </thead>
                <tbody>
                {
                    _.map(showData, (rowData, trindex) => {
                        return (
                            <tr className='tbody-tr' key={'tbody-tr-' + trindex} >
                                {
                                    _.map(headSeq, (id, tdindex) => {
                                        var tdStyle = {};
                                        if (this.columnStyles[id]) {
                                            if (_.isFunction(this.columnStyles[id])) {
                                                tdStyle = this.columnStyles[id](id, rowData, tableData);
                                            } else {
                                                tdStyle = this.columnStyles[id];
                                            }
                                            tdStyle = tdStyle === undefined ? {} : tdStyle;
                                        }
                                        // 如果是对象则取value属性对应的值，如果是组件 则 不做处理，直接展示
                                        // 暂时保留对传递组件的支持，但是因尽量减少传递组件 ，因为会影响排序和下载
                                        var tdData = (_.isObject(rowData[id]) && !rowData[id].props )? rowData[id]['value'] : rowData[id] ;
                                        tdData = _.isNumber(tdData) ? _.round(tdData, 2) : tdData;
                                        if(this.dataFormats[id] !== undefined ){
                                            tdData = this.dataFormats[id](tdData);
                                        }

                                        return (
                                            <td key={'tbody-td-' + tdindex}
                                                colSpan={rowData[id] && rowData[id].colSpan ? rowData[id].colSpan : 1}
                                                rowSpan={rowData[id] && rowData[id].rowSpan ? rowData[id].rowSpan : 1}
                                                style={_.assign({}, tdStyle, {padding:'14px 14px 14px 28px', borderWidth: '1px 2px', borderStyle: 'solid', borderColor: `${colorsMap.C04} ${colorsMap.B03}`, whiteSpace: 'nowrap', fontSize: 14,}, _.isObject(rowData[id]) ? {cursor: 'pointer'} : {})}
                                                onClick={(_.isObject(rowData[id]) && !rowData[id].props) ? this.handleOnClick.bind(this, id, rowData) : this.emptyFn()}
                                                >
                                                {tdData}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}
class TableViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.reserveRows = this.props.reserveRows ? this.props.reserveRows : 5;
        this.state ={
            showAllEnable: _.isBoolean(this.reserveRows) ? false : (this.props.tableData.length <= this.reserveRows ? false : true),
            isShrink: true,
            sortKey: this.props.sortKey ? this.props.sortKey : '',
            sortDir: this.props.sortDir ? this.props.sortDir : ''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            showAllEnable: _.isBoolean(this.reserveRows) ? false : (nextProps.tableData.length <= this.reserveRows ? false : true),
            isShrink: this.state.isShrink,
            sortKey: nextProps.sortKey ? nextProps.sortKey : this.state.sortKey,
            sortDir: nextProps.sortDir ? nextProps.sortDir : this.state.sortDir
        })
    }
    handleSort(sortKey) {
        if(this.props.handleSort){
            this.props.handleSort(sortKey)
        }else{
            var sortDir;
            if(sortKey !== this.state.sortKey) {
                sortDir = 'desc';
            } else {
                sortDir = (this.state.sortDir === 'desc' ? 'asc' : 'desc');
            }
            this.setState({
                sortKey: sortKey,
                sortDir: sortDir
            });
        }
    }
    handleOnClick(id, rowData){
        this.props.handleOnClick(id, rowData)
    }
    downloadTable(){
        let {downloadkeys, tableName, tableData, tableHeader} = this.props;
        let cols = _.map(downloadkeys, 'name')
        let rows = getRows(downloadkeys, tableData, tableHeader);
        downloadData(cols, rows, tableName);
    }
    onClickShowAllBtn(event) {
        this.setState({
            isShrink: !this.state.isShrink
        })
    }
    render() {
        var {isShrink, showAllEnable, sortDir, sortKey} = this.state;
        var {tableHeader, tableData, cancelTableSort, customSort, cancelDownload} = this.props;
        var sortTableData = getSortTableData(tableData, sortKey, sortDir, customSort);
        var showData = isShrink && _.isNumber(this.reserveRows) ? sortTableData.slice(0,this.reserveRows) : sortTableData;
        var {leftFrozenHeader, normalHeader, rightFrozenHeader} = getFrozenColumn(tableHeader);
        var tableViewProps = {
            tableData,
            showData,
            cancelTableSort,
            sortDir,
            sortKey,
            handleSort: this.handleSort.bind(this),
            handleOnClick: this.handleOnClick.bind(this),
        }
        return (
                <div style={{position: 'relative'}}>
                    {
                        !cancelDownload &&
                        <div style={{position:'absolute', top:-50, right:0, width: 80, height: 34, lineHeight:'34px', background: colorsMap.B03, color: '#fff', borderRadius: 3, cursor: 'pointer', paddingLeft: 10}}
                            onClick={this.downloadTable.bind(this)}>
                            下载表格
                        </div>
                    }
                    <div style={{display: 'flex'}}>
                        {
                            _.isEmpty(leftFrozenHeader) ? '' : <TableComponent {...tableViewProps} tableHeader={leftFrozenHeader}/>
                        }
                        <div style={{flex: 1, overflow: 'auto'}}>
                                <TableComponent {...tableViewProps} tableHeader={normalHeader} widthStyle={{width: '100%'}}/>
                        </div>
                        {
                            _.isEmpty(rightFrozenHeader) ? '' : <TableComponent {...tableViewProps} tableHeader={rightFrozenHeader}/>
                        }
                    </div>
                    <div>
                        {
                            showAllEnable ?
                                <span  onClick={this.onClickShowAllBtn.bind(this) } style={localStyle.tableShowAllBtn}>
                                    { !isShrink ? '点击收缩表格数据' : '点击查看更多数据'}
                                    <i className={classNames('animated', 'icon-down-open-2', {'caret-list-down': !isShrink, 'caret-list-up': isShrink})} style={{display: 'inline-block', color: colorsMap.B03}}></i>
                                </span> : ''
                        }
                    </div>
                </div>
        )
    }
}

export default TableViewComponent;

let localStyle = {
    tableShowAllBtn: {
        color: colorsMap.C12, textDecoration: 'none', width: '100%', height: 40, display: 'inline-block', textAlign: 'center', backgroundColor: '#fff', lineHeight: '40px',
        border: '1px solid ' + colorsMap.C04, borderTop: 0
    },
    sortDirection: { width: 10, height: 20, position: 'absolute', top: '50%', right: '5px', marginTop: -14}
}


function getSortTableData(tableData, sortKey, sortDir, customSort){
    return customSort ? customSort(tableData, sortKey, sortDir) : _.orderBy(tableData, item => _.isObject(item[sortKey]) ? item[sortKey].value : item[sortKey] , [sortDir])
}
function getRows(downloadkeys, tableData, tableHeader){
    let keys = _.map(downloadkeys, 'id')
    var dataFormatFunMap = getDataFormats(tableHeader)
    return _.map(tableData, rowData => {
        return _.map(keys, key => {
            var value = _.isObject(rowData[key]) ? rowData[key]['value'] : rowData[key]
            if(_.isNumber(value)) value = _.round(value, 2)
            // 如果有 dataFormats 的话 需要 执行相应的函数
            if(dataFormatFunMap[key] && _.isFunction(dataFormatFunMap[key])){
                value = dataFormatFunMap[key](value);
            }
            return value
        })
    })
}
function getDataFormats(tableHeader){
    var dataFormatFunMap = {}
    _.each(tableHeader, (tableHeaderRow, index) => {
        _.each(tableHeaderRow, colObj => {
            if(colObj.id && colObj.dataFormat){
                dataFormatFunMap[colObj.id] = colObj.dataFormat
            }
        } )
    })
    return dataFormatFunMap
}
function getFrozenColumn(tableHeader) {
    var leftFrozenHeader = [], normalHeader = [], rightFrozenHeader = [];
    _.each(tableHeader, (headerRow, rowIndex) => {
        var tempLeft = [], tempNormal = [], tempRight = [];
        _.each(headerRow, headerCell => {
            if(headerCell.freeze === 'left') {
                tempLeft.push(headerCell)
            } else if(headerCell.freeze === 'right') {
                tempRight.push(headerCell)
            } else {
                tempNormal.push(headerCell)
            }
        })
        if(tempLeft.length) { leftFrozenHeader[rowIndex] = tempLeft }
        if(tempNormal.length) { normalHeader[rowIndex] = tempNormal }
        if(tempRight.length) { rightFrozenHeader[rowIndex] = tempRight }
    })
    return {leftFrozenHeader, normalHeader, rightFrozenHeader}
}

