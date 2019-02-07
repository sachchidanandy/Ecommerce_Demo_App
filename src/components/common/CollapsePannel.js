import React from 'react';
import CheckBox from './CheckBox';

const CollapsePannel = ({filterName, filterOptions, onChangeFilter, nameToShow}) => {
    
    return (
        <div className = "card">
            <div className = "card-header">
                <h4 className = "mb-0">
                    <button  className= "btn btn-block" type="button" aria-expanded="true">
                        {nameToShow}
                    </button>
                </h4>
            </div>
            <div className="card-body">
                {filterOptions.map(data => <CheckBox 
                    key = {data.name}
                    value = {data.name}
                    onChange = {onChangeFilter}
                    filterName = {filterName}
                />)}
            </div>
        </div>
    );
}

export default CollapsePannel;