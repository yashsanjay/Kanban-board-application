export const groupTickets = (tickets, groupBy, users = []) => {
  const priorityMap = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority"
  };

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name; 
    return acc;
  }, {});

  let groupedTickets = tickets.reduce((acc, ticket) => {
    let group;

    if (groupBy === "userId") {
      group = userMap[ticket.userId] || "Unknown User";
    } else if (groupBy === "priority") {
      group = priorityMap[ticket.priority];
    } else {
      group = ticket[groupBy];
    }

    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(ticket);

    return acc;
  }, {});

  
  if (groupBy === "status") {
    groupedTickets["Done"] = groupedTickets["Done"] || [];
    groupedTickets["Cancelled"] = groupedTickets["Cancelled"] || [];
  }

  
  if (groupBy === "priority") {
    groupedTickets = Object.keys(priorityMap)
      .sort((a, b) => b - a) 
      .reduce((sortedAcc, priorityKey) => {
        const priorityLabel = priorityMap[priorityKey];
        sortedAcc[priorityLabel] = groupedTickets[priorityLabel] || [];
        return sortedAcc;
      }, {});
  }

  return groupedTickets;
};

export const sortTickets = (groupedTickets, sortBy) => {
  return Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = groupedTickets[key].sort((a, b) =>
      sortBy === "priority"
        ? b.priority - a.priority
        : a.title.localeCompare(b.title)
    );
    return acc;
  }, {});
};
