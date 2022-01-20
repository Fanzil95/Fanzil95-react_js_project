import React from "react";
import propTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
// import User from "./user";
import { BookMark } from "./bookmark";
const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "professions.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, Раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    console.log(columns);

    return <table className="table">
        <TableHeader {...{ onSort, selectedSort, columns } }/>
        <TableBody {...{ columns, data: users }}/>
    </table>;
};

UserTable.propTypes = {
    users: propTypes.array.isRequired,
    onSort: propTypes.func.isRequired,
    selectedSort: propTypes.object.isRequired,
    onToggleBookMark: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired
};

export default UserTable;
