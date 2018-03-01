import React from 'react';
import ReactPaginate from 'react-paginate';
import '../styles/paginate.css';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: this.props.pageCount
        }
    }

    render() {
        return (
            <ReactPaginate
                previousLabel={<span style={{whiteSpace: 'nowrap'}} >上一页</span>}
                nextLabel={<span style={{whiteSpace: 'nowrap'}} >下一页</span>}
                breakLabel={<a>...</a>}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.props.handlePageClick.bind(this)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        )
    }
}