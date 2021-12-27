import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import changeIconFavorites from "./changeIconFavorites";
import PropTypes from "prop-types";
const User = (props) => {
    const handleDelete = (id) => {
        props.value(props.item.filter((user) => user._id !== id));
    };

    function bookmark(itemBookmark) {
        if (itemBookmark.bookmark) {
            return changeIconFavorites.on;
        } else {
            return changeIconFavorites.off;
        }
    }

    function favorites(id) {
        props.value(
            props.item.map((item) => {
                if (id === item._id) {
                    item.bookmark = !item.bookmark;
                }
                return item;
            })
        );
    }

    return (
        <tbody>
            {props.item.map((item) => {
                return (
                    <>
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                                {item.qualities.map((item) => (
                                    <span
                                        key = {item._id}
                                        className={
                                            "badge bg-" + item.color + " m-1"
                                        }
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </td>
                            <td>{item.profession.name}</td>
                            <td>{item.completedMeetings}</td>
                            <td>
                                <button
                                    key={item._id}
                                    onClick={() => favorites(item._id)}
                                >
                                    {bookmark(item)}
                                </button>
                            </td>
                            <td>{item.rate}</td>
                            <td>
                                <button
                                    className="badge bg-danger "
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </>
                );
            })}
        </tbody>
    );
};

User.propTypes = {
    value: PropTypes.object.isRequired,
    item: PropTypes.array.isRequired
};

export default User;
