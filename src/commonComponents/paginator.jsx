import React from 'react';
import ReactPaginate from 'react-paginate';
import '../styles/paginate.css';

export default class Paginator extends React.Component {
    render() {
        return (
            <ReactPaginate
                previousLabel={<span style={{whiteSpace: 'nowrap'}} >上一页</span>}
                nextLabel={<span style={{whiteSpace: 'nowrap'}} >下一页</span>}
                breakLabel={<a>...</a>}
                breakClassName={"break-me"}
                pageCount={this.props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.props.handlePageClick.bind(this)}
                containerClassName={"pagination"}
                subContainerCla ssName={"pages pagination"}
                activeClassName={"active"}
            />
        )
    }
}