import React, {Component} from 'react';
import { connect } from 'react-redux';
import Headers from '../common/Header';
import SideBar from './SideBar';
import ProductList from './ProductList';
import PaginationBar from '../common/PaginationBar';

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
    }
    
    onToggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    onCollapse(event) {
        const openFilter = Object.assign({}, this.state.openFilter);
        openFilter[event.target.name] =  !this.state.openFilter[event.target.name];
        this.setState({openFilter});
    }

    onChoosePage(event) {
        debugger;
        this.setState({currentPage : event.target.value});
    }
    onFilterChange (event) {

    }

    render() { 
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
                        <div className = "card">
                            <div className = "card-header"style = {{textAlign : 'center', color : '#232f3e'}}>
                                <h3>Filter Products</h3>
                            </div>
                            <div className="card-body" style = {{backgroundColor : '#232f3e'}}>
                                <SideBar
                                    {...filterList}
                                    onCollapse = {this.onCollapse}
                                    onFilterChange = {this.onFilterChange}
                                    openFilter = {openFilter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className = 'col'>
                        <ProductList products = {slicedProduct}/>
                        <div style = {{alignContent : 'center'}}>
                            <PaginationBar onChoosePage = {this.onChoosePage} totalPage = {totalPage}/>
                        </div>
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