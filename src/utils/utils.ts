export const formatDate = (dateString: string): { date: string; time: string } => {
  const date = new Date(dateString);
  const dateFormatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timeFormatted = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date: dateFormatted, time: timeFormatted };
};
