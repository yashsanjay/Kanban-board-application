import React from "react";
import "../styles/TicketCard.css";
import urgentclricn from "../icons_FEtask/SVG - Urgent Priority grey.svg";
import highpriorityicn from "../icons_FEtask/Img - High Priority.svg";
import lowpriorityicn from "../icons_FEtask/Img - Low Priority.svg";
import mediumpriorityicn from "../icons_FEtask/Img - Medium Priority.svg";
import nopriority from "../icons_FEtask/No-priority.svg";
import todoicn from "../icons_FEtask/To-do.svg";
import inprogressicn from "../icons_FEtask/in-progress.svg";
import backlogicn from "../icons_FEtask/Backlog.svg";
import doneicn from "../icons_FEtask/Done.svg";

const TicketCard = ({ ticket, users, groupBy }) => {
  const assignedUser = users.find((user) => user.id === ticket.userId)?.name;
  const avatarUrl =
    users.find((user) => user.id === ticket.userId)?.avatar || "";

  const getInitials = (name) => {
    if (!name) return "NA";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    } else {
      return name.substring(0, 2).toUpperCase();
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#FFD93D",
      "#6BCB77",
      "#4D96FF",
      "#C1C8E4",
      "#F47C7C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomStatusColor = () => {
    const statusColors = ["#4CAF50", "#B0BEC5"];
    return statusColors[Math.floor(Math.random() * statusColors.length)];
  };

  return (
    <div className="ticket-card">
      <div>
        <div className="ticket-id">{ticket.id}</div>
        <div className="ticketcard-div1">
          <div className="ticketcard-div2">
            {groupBy !== "status" && (
              <div>
                {ticket.status === "Todo" && <img src={todoicn} alt="todo" />}
                {ticket.status === "In progress" && (
                  <img src={inprogressicn} alt="in progress" />
                )}
                {ticket.status === "Backlog" && (
                  <img src={backlogicn} alt="backlog" />
                )}
                {ticket.status === "Done" && <img src={doneicn} alt="done" />}
              </div>
            )}
          </div>
          <h4 title={ticket.title}>{ticket.title}</h4>
        </div>
        <div className="Ticket-innerdiv">
          <div className="Ticket-innerdiv2">
            {groupBy !== "priority" && (
              <div className="priority-icon-wrapper">
                {ticket.priority === 4 && (
                  <img src={urgentclricn} alt="urgent" />
                )}
                {ticket.priority === 3 && (
                  <img src={highpriorityicn} alt="high" />
                )}
                {ticket.priority === 1 && (
                  <img src={lowpriorityicn} alt="low" />
                )}
                {ticket.priority === 2 && (
                  <img src={mediumpriorityicn} alt="medium" />
                )}
                {ticket.priority === 0 && <img src={nopriority} alt="none" />}
              </div>
            )}
          </div>

          <div className="feature-tag">Feature Request</div>
        </div>
      </div>

      <div className="avatar-container">
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="avatar" />
        ) : (
          <div
            className="avatar-placeholder"
            style={{ backgroundColor: getRandomColor() }}
          >
            {getInitials(assignedUser)}
            <div
              className="status-dot"
              style={{ backgroundColor: getRandomStatusColor() }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;

