import React, { useState } from "react";
import TableHeader from "./tableHeader";
import { Message } from "./message";
import User from "./user";
import api from "../api";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        console.log(pageIndex);
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    console.log(userCrop);

    function wordFormat() {
        if (users.length === 4 || users.length === 3 || users.length === 2) {
            return users.length + " человека тусанет с тобой сегодня  ";
        } else if (users.length === 0) {
            const htmlElements = document.querySelector(".table");
            htmlElements.innerHTML = "";
            const cancelOfParty = document.querySelector("#word");
            cancelOfParty.className = "badge bg-danger";
            return (
                <>
                    <Message />
                </>
            );
        } else {
            return users.length + " человек тусанет с тобой сегодня  ";
        }
    }

    const table = (
        <>
            <div id="word" className={"badge bg-primary"}>
                <h3>{wordFormat()}</h3>
            </div>
            <table className="table">
                <thead>
                    <TableHeader />
                </thead>
                <User item={userCrop} value={setUsers} />
            </table>
            <Pagination
                itemCount={users.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );

    return table;
};

export default Users;
