import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ item, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    console.log(item);
    return (
        <ul className="list-group">
            {Object.keys(item).map(value => (
                <li
                    key = {item[value][valueProperty]}
                    className={"list-group-item" +
                    (item[value] === selectedItem ? " active" : "")}
                    onClick = { () => onItemSelect(item[value]) }
                    role="button"
                >
                    {item[value][contentProperty]}</li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    item: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired
};

export default GroupList;
