import React, { useState, useEffect } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";
import Header from "./Header";
import { groupTickets, sortTickets } from "../utils/grouping";
import "../styles/KanbanBoard.css";
import threedoticn from "../icons_FEtask/3 dot menu.svg";
import addicn from "../icons_FEtask/add.svg";
import todoicn from "../icons_FEtask/To-do.svg";
import inprogressicn from "../icons_FEtask/in-progress.svg";
import backlogicn from "../icons_FEtask/Backlog.svg";
import doneicn from "../icons_FEtask/Done.svg";
import cancelicn from "../icons_FEtask/Cancelled.svg";
import urgentclricn from "../icons_FEtask/SVG - Urgent Priority colour.svg";
import highpriorityicn from "../icons_FEtask/Img - High Priority.svg";
import lowpriorityicn from "../icons_FEtask/Img - Low Priority.svg";
import mediumpriorityicn from "../icons_FEtask/Img - Medium Priority.svg";
import nopriority from "../icons_FEtask/No-priority.svg";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    () => localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("sortBy") || "priority"
  );
  const [groupedTickets, setGroupedTickets] = useState({});

  // Fetch data from the API on mount
  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        const { tickets, users } = response.data;
        setTickets(tickets);
        setUsers(users);
      })
      .catch((error) => console.error(error));
  }, []);

  // Update grouped tickets when tickets, groupBy, or sortBy change
  useEffect(() => {
    const grouped = groupTickets(tickets, groupBy, users);
    const sorted = sortTickets(grouped, sortBy);
    setGroupedTickets(sorted);
  }, [tickets, groupBy, sortBy]);

  // Save groupBy and sortBy preferences to local storage
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const handleGroupChange = (e) => setGroupBy(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const getCardCountByGroup = () => {
    const cardCount = {};
    Object.keys(groupedTickets).forEach((group) => {
      cardCount[group] = groupedTickets[group].length;
    });
    return cardCount;
  };

  const cardCountByGroup = getCardCountByGroup();

  return (
    <div className="kanban-container">
      <Header
        groupBy={groupBy}
        sortBy={sortBy}
        handleGroupChange={handleGroupChange}
        handleSortChange={handleSortChange}
      />
      <div className="kanban-board">
        {groupBy === "status"
          ? ["Backlog", "Todo", "In progress", "Done", "Cancelled"].map(
              (status) => (
                <div className="kanban-column" key={status}>
                  <div className="kanban-header">
                    <div className="kanban-header-content">
                      <div className="kanban-header-icons">
                        {status === "Todo" && <img src={todoicn} alt="todo" />}
                        {status === "In progress" && (
                          <img src={inprogressicn} alt="in progress" />
                        )}
                        {status === "Backlog" && (
                          <img src={backlogicn} alt="backlog" />
                        )}
                        {status === "Done" && <img src={doneicn} alt="done" />}
                        {status === "Cancelled" && (
                          <img src={cancelicn} alt="cancelled" />
                        )}
                      </div>
                      <h3 className="kanban-header-title">{status}</h3>
                      <div className="kanban-header-count">
                        {cardCountByGroup[status] || 0}
                      </div>
                      <div className="kanban-header-actions">
                        <img src={addicn} alt="add" />
                        <img src={threedoticn} alt="menu" />
                      </div>
                    </div>
                  </div>
                  <div className="tickets">
                    {groupedTickets[status]?.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        groupBy={groupBy}
                        ticket={ticket}
                        users={users}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          : groupBy === "priority"
          ? ["No priority", "Urgent", "High", "Medium", "Low"].map(
              (priority) => (
                <div className="kanban-column" key={priority}>
                  <div className="kanban-header">
                    <div className="kanban-header-content">
                      <div className="kanban-header-icons">
                        {priority === "Urgent" && (
                          <img src={urgentclricn} alt="urgent" />
                        )}
                        {priority === "High" && (
                          <img src={highpriorityicn} alt="high priority" />
                        )}
                        {priority === "Medium" && (
                          <img src={mediumpriorityicn} alt="medium priority" />
                        )}
                        {priority === "Low" && (
                          <img src={lowpriorityicn} alt="low priority" />
                        )}
                        {priority === "No priority" && (
                          <img src={nopriority} alt="no priority" />
                        )}
                      </div>
                      <h3 className="kanban-header-title">{priority}</h3>
                      <div className="kanban-header-count">
                        {cardCountByGroup[priority] || 0}
                      </div>
                      <div className="kanban-header-actions">
                        <img src={addicn} alt="add" />
                        <img src={threedoticn} alt="menu" />
                      </div>
                    </div>
                  </div>
                  <div className="tickets">
                    {groupedTickets[priority]?.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        groupBy={groupBy}
                        ticket={ticket}
                        users={users}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          : Object.keys(groupedTickets).map((group) => (
              <div className="kanban-column" key={group}>
                <div className="kanban-header">
                  <div className="kanban-header-content">
                    <h3 className="kanban-header-title">{group}</h3>
                    <div className="kanban-header-count">
                      {cardCountByGroup[group] || 0}
                    </div>
                    <div className="kanban-header-actions">
                      <img src={addicn} alt="add" />
                      <img src={threedoticn} alt="menu" />
                    </div>
                  </div>
                </div>
                <div className="tickets">
                  {groupedTickets[group]?.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      groupBy={groupBy}
                      ticket={ticket}
                      users={users}
                    />
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
