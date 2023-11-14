export function getDataFormatted(
  dataToHandle,
  dataType,
  dataByDay,
  data7Days,
  data14Days,
  labels,
  today,
  daysOfWeek
) {
  dataToHandle.forEach((data) => {
    const createdAtDate = new Date(data.createdAt);
    const dayKey = createdAtDate.toISOString().split("T")[0];
    if (!dataByDay[dayKey]) {
      dataByDay[dayKey] = [];
    }

    dataByDay[dayKey].push(data);
  });

  for (let i = 0; i < 7; i++) {
    const dateKey = new Date(today - i * 24 * 60 * 60 * 1000);
    const dayOfWeekIndex = dateKey.getDay();
    const dayName = daysOfWeek[dayOfWeekIndex];

    const formattedDayKey = dateKey.toISOString().split("T")[0];
    labels.push(dayName);
    if (dataByDay[formattedDayKey]) {
      data7Days.push(dataByDay[formattedDayKey].length);
    } else {
      data7Days.push(0);
    }
  }

  for (let i = 7; i < 14; i++) {
    const dateKey = new Date(today - i * 24 * 60 * 60 * 1000);
    const formattedDayKey = dateKey.toISOString().split("T")[0];
    if (dataByDay[formattedDayKey]) {
      data14Days.push(dataByDay[formattedDayKey].length);
    } else {
      data14Days.push(0);
    }
  }
}

export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.round((now - date) / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
