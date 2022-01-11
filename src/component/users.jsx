import React, { useState, useEffect } from "react";
import TableHeader from "./tableHeader";
import { Message } from "./message";
import User from "./user";
import api from "../api";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [professions, setProfessions] = useState();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        console.log(pageIndex);
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    console.log(userCrop);

    const clearFilter = () => {
        setSelectedProf();
    };

    function wordFormat() {
        if (filteredUsers.length === 4 || filteredUsers.length === 3 || users.length === 2) {
            return filteredUsers.length + " человека тусанет с тобой сегодня  ";
        } else if (filteredUsers.length === 0) {
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
            return filteredUsers.length + " человек тусанет с тобой сегодня  ";
        }
    }

    const table = (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        item={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Clear
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <div id="word" className={"badge bg-primary"}>
                    <h3>{wordFormat()}</h3>
                </div>
                <table className="table">
                    <thead>
                        <TableHeader />
                    </thead>
                    <User item={userCrop} value={setUsers} />
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemCount={filteredUsers.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );

    return table;
};

export default Users;
