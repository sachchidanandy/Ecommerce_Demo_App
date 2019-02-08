import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationBar = ({onChoosePage, totalPage}) => {
    const pageNumbers = [...Array(totalPage)].map((val, key) => key+1);

    function pageNumber(value) {
       return( 
            <PaginationItem key = {value}>
                <PaginationLink onClick = {onChoosePage} value = {value}>{value}</PaginationLink>
            </PaginationItem>
        );
    }
    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            { pageNumbers.map ( value => pageNumber(value))}
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationBar;