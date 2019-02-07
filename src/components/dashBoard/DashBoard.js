import React, {Component} from 'react';
import { connect } from 'react-redux';
import Headers from '../common/Header';
import SideBar from './SideBar';
import ProductList from './ProductList';

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
            filterList : props.products.FilterList
        };
        this.onToggle = this.onToggle.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
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

    onFilterChange (event) {

    }

    render() { 
        const {user, isOpen, filterList, productList, openFilter } = this.state;
        return (
            <div className = 'container-fluid' style = {{backgroundColor: '#e6f0f6'}}>
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
                        <ProductList products = {productList}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    debugger;
    return {
        user: state.user,
        products : state.products
    };
}
export default connect(mapStateToProps)(DashBoard);