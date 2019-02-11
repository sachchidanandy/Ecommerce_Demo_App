import React, {Component} from 'react';
import { connect } from 'react-redux';
import Headers from '../common/Header';
import ProductList from '../common/ProductList';
import PaginationBar from '../common/PaginationBar';
import Filter from './Filter';
import  { Redirect } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user : props.user,
            openFilter : {brand : false, flavour : false, packSize : false },
            isOpen : false,
            brandFilter : [],
            flavourFilter : [],
            packSizeFilter : [],
            productList : props.products.Products,
            filterList : props.products.FilterList,
            currentPage : 1,
            productPerPage : 9
        };
        this.onToggle = this.onToggle.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.onChoosePage = this.onChoosePage.bind(this);
        this.onNextOrPrevPage = this.onNextOrPrevPage.bind(this);
    }
    
    //Handle the toogle during mobile view
    onToggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    //Handle collapse filter
    onCollapse(event) {
        const openFilter = Object.assign({}, this.state.openFilter);
        openFilter[event.target.name] =  !this.state.openFilter[event.target.name];
        this.setState({openFilter});
    }

    //To handle choose page in the pagination
    onChoosePage(event) {
        this.setState({currentPage : event.target.value});
    }

    //To handle page change using next or prev button in pagination
    onNextOrPrevPage(event) {
        const totalPage = Math.ceil(this.state.productList.length / this.state.productPerPage);
        
        if (event.target.value === 'previous' && this.state.currentPage > 1) {
            this.setState((prevState) => ({currentPage : prevState.currentPage - 1}));
        } else if (event.target.value === 'next' && this.state.currentPage < totalPage) {
            this.setState((prevState) => ({currentPage : prevState.currentPage + 1}));
        }
    }

    onFilterChange (event) {

    }

    render() { 
        if (! this.props.user.hasOwnProperty('email') || !this.props.products.hasOwnProperty('Products')) {
            return <Redirect to='/' />;
        }
        const {user, isOpen, filterList, productList, openFilter, currentPage, productPerPage } = this.state;
        //Logic To show Products
        const indexOfLastProduct = currentPage * productPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productPerPage;
        const slicedProduct = productList.slice(indexOfFirstProduct, indexOfLastProduct);
        const totalPage = Math.ceil(productList.length / productPerPage);
        return (
            <div className = 'container-fluid'>
                <div className = 'container-fluid sticky'>
                    <Headers
                        validUser = {user}
                        toggle ={this.onToggle}
                        isOpen = {isOpen}
                    />
                </div>
                <div className = 'container-fluid row relative'>
                    <div className = 'col-md-3'>
                        <Filter
                            heading = 'Filter Products'
                            filterList = {filterList}
                            onCollapse = {this.onCollapse}
                            onFilterChange = {this.onFilterChange}
                            openFilter = {openFilter}
                        />
                    </div>
                    <div className = 'col'>
                        <ProductList products = {slicedProduct}/>
                        <PaginationBar onNextOrPrevPage = {this.onNextOrPrevPage} onChoosePage = {this.onChoosePage} totalPage = {totalPage}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    return {
        user: state.user,
        products : state.products
    };
}
export default connect(mapStateToProps)(DashBoard);