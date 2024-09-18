export const sortByPriority = (tickets) => {
    return tickets.sort((a, b) => b.priority - a.priority);
  };
  
  export const sortByTitle = (tickets) => {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  };
  