import React, {Component} from 'react';
import { connect } from 'react-redux';
import Headers from '../common/Header';
import SideBar from './SideBar';
import ProductCard from './ProductCard';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : this.props.user,
            isOpen : false,
            brandFilter : [],
            flavourFilter : [],
            packSizeFilter : [],
            filterList : {
                brand:[
                    {"name":"Dasani","logoUrl":"http://sglocalmerapi.rdnsing.com/uploads/ko/images/brands/Dasani_20181024_070034.jpg"},
                    
                    {"name":"A&W","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Cups.jpeg"},
                    
                    {"name":"Aquarius","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Aquarius.jpeg"},
                    
                    {"name":"Coca-Cola","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/coca-cola.jpeg"},
                    
                    {"name":"Cups","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Cups.jpeg"},
                    
                    {"name":"Fanta","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/fanta.jpeg"},
                    
                    {"name":"Heaven and Earth","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Cups.jpeg"},
                    
                    {"name":"Qoo","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Qoo.jpeg"},
                    
                    {"name":"Schweppes","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/Schweppes.jpeg"},
                    
                    {"name":"Sprite","logoUrl":"http://sgdev.rdnsing.com/uploads/ko/sprite.jpeg"}
                ],
                    
                flavour:[
                    
                    {"name":"Drinking Water","brand":["Dasani"]},
                    
                    {"name":"Tonic Water","brand":["Schweppes"]},
                    
                    {"name":"Ginger Ale","brand":["Schweppes"]},
                    
                    {"name":"Light","brand":["Coca-Cola"]},
                    
                    {"name":"Grapefruit","brand":["Aquarius"]},
                    
                    {"name":"Soda Water","brand":["Schweppes"]},
                    
                    {"name":"Lemon-Lime","brand":["Sprite"]},
                    
                    {"name":"Sarsaparilla","brand":["A&W"]},
                    
                    {"name":"Orange","brand":["Fanta"]},
                    
                    {"name":"Ayataka Green Tea","brand":["Heaven and Earth"]},
                    
                    {"name":"Chrysanthemum","brand":["Heaven and Earth"]},
                    
                    {"name":"Mango Chamomile","brand":["Heaven and Earth"]},
                    
                    {"name":"Ice Lemon Tea","brand":["Heaven and Earth"]},
                    
                    {"name":"Ice Passion Fruit","brand":["Heaven and Earth"]},
                    
                    {"name":"Qoo","brand":["Qoo"]},
                    
                    {"name":"Jasmine Green Tea","brand":["Heaven and Earth"]},
                    
                    {"name":"Stevia","brand":["Coca-Cola"]},
                    
                    {"name":"Cone cup","brand":["Cups"]},
                    
                    {"name":"Paper cup","brand":["Cups"]}
                ],
                        
                packSize:[
                    {"name":"4OZ","value":"118.294","brand":["Cups"],"flavour":["Cone cup"]},
                
                    {"name":"7OZ","value":"207.0145","brand":["Cups"],"flavour":["Paper cup"]},
                
                    {"name":"300ML","value":"300","brand":["Heaven and Earth","Qoo"],"flavour":["Ayataka Green Tea","Chrysanthemum","Mango Chamomile","Ice Lemon Tea","Ice Passion Fruit","Qoo","Jasmine Green Tea"]},
                    
                    {"name":"320ML","value":"320","brand":["Schweppes","Coca-Cola","Aquarius","Sprite","A&W","Fanta"],"flavour":["Tonic Water","Ginger Ale","Light","Grapefruit","Soda Water","Lemon-Lime","Sarsaparilla","Orange","Stevia"]},
                    
                    {"name":"600ML","value":"600","brand":["Dasani"],"flavour":["Drinking Water"]},
                
                    {"name":"1.5L","value":"1500","brand":["Dasani"],"flavour":["Drinking Water"]}
                ]
            }
        };
        this.onToggle = this.onToggle.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    
    onToggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    onFilterChange (event) {

    }

    render() { 
        const {user, isOpen, filterList} = this.state;
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
                                    brand = {filterList.brand}
                                    flavour = {filterList.flavour}
                                    packSize = {filterList.packSize}
                                    onFilterChange = {this.onFilterChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className = 'col'>
                        <ProductCard/>
                    </div>
                </div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(DashBoard);