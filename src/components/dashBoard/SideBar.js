import React from 'react';
import CollapsePannel from '../common/CollapsePannel';

const SideBar = ({brand, flavour, packSize, onFilterChange}) => {
    return (
        <div>
            <CollapsePannel
                filterName = 'brands'
                filterOptions = {brand}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Brands'
            />
            <br/>
            <CollapsePannel
                filterName = 'flavour'
                filterOptions = {flavour}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Flavours'
            />
            <br/>
            <CollapsePannel
                filterName = 'packSize'
                filterOptions = {packSize}
                onChangeFilter = {onFilterChange}
                nameToShow = 'Package Size'
            />
        </div>
    );
}

export default SideBar;