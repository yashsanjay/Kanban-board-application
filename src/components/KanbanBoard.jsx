import React, { useState, useEffect } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";
import Header from "./Header";
import { groupTickets, sortTickets } from "../utils/grouping";
import "../styles/KanbanBoard.css";
import threedoticn from "../../public/icons_FEtask/3 dot menu.svg";
import addicn from "../../public/icons_FEtask/add.svg";
import todoicn from "../../public/icons_FEtask/To-do.svg";
import inprogressicn from "../../public/icons_FEtask/in-progress.svg";
import backlogicn from "../../public/icons_FEtask/Backlog.svg";
import doneicn from "../../public/icons_FEtask/Done.svg";
import cancelicn from "../../public/icons_FEtask/Cancelled.svg";
import urgentclricn from "../../public/icons_FEtask/SVG - Urgent Priority colour.svg";
import highpriorityicn from "../../public/icons_FEtask/Img - High Priority.svg";
import lowpriorityicn from "../../public/icons_FEtask/Img - Low Priority.svg";
import mediumpriorityicn from "../../public/icons_FEtask/Img - Medium Priority.svg";
import nopriority from "../../public/icons_FEtask/No-Priority.svg";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    
    return localStorage.getItem("groupBy") || "status";
  });
  const [sortBy, setSortBy] = useState(() => {
   
    return localStorage.getItem("sortBy") || "priority";
  });
  const [groupedTickets, setGroupedTickets] = useState({});

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

  useEffect(() => {
    const grouped = groupTickets(tickets, groupBy, users);
    const sorted = sortTickets(grouped, sortBy);
    setGroupedTickets(sorted);
  }, [tickets, groupBy, sortBy]);

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
        {Object.keys(groupedTickets).map((group) => (
          <div className="kanban-column" key={group}>
            <div className="kanban-inner-div">
              <div style={{ paddingTop: "16px" }}>
                {group === "Todo" && (
                  <img src={todoicn} alt="" style={{ marginRight: "15px" }} />
                )}
                {group === "In progress" && (
                  <img
                    src={inprogressicn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "Backlog" && (
                  <img
                    src={backlogicn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "Done" && (
                  <img src={doneicn} alt="" style={{ marginRight: "15px" }} />
                )}
                {group === "Cancelled" && (
                  <img src={cancelicn} alt="" style={{ marginRight: "15px" }} />
                )}
                {group === "Urgent" && (
                  <img
                    src={urgentclricn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "High" && (
                  <img
                    src={highpriorityicn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "Low" && (
                  <img
                    src={lowpriorityicn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "Medium" && (
                  <img
                    src={mediumpriorityicn}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
                {group === "No priority" && (
                  <img
                    src={nopriority}
                    alt=""
                    style={{ marginRight: "15px" }}
                  />
                )}
              </div>
              <div>
                <h3 style={{ textWrap: "nowrap" }}>{group}</h3>
              </div>
              <div style={{ paddingTop: "16px", marginLeft: "20px" }}>
                {cardCountByGroup[group]}
              </div>
              <div
                style={{
                  paddingTop: "16px",
                  marginLeft: "120px",
                  textWrap: "nowrap",
                }}
              >
                <img src={addicn} alt="" style={{ marginRight: "15px" }} />
                <img src={threedoticn} alt="" />
              </div>
            </div>
            <div className="tickets">
              {groupedTickets[group].map((ticket) => (
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
