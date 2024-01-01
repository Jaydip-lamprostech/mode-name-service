import React from "react";

const formatDateTime = (epochTime) => {
  const date = new Date(epochTime * 1000);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const optionsDate = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
    userTimezone,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
    date
  );
  //   const formattedDate = date.toLocaleString(undefined, optionsDate);
  //   const formattedTime = date.toLocaleString(undefined, optionsTime);

  return { formattedDate, formattedTime };
};

const DateComponent = ({ epochTime, timezone }) => {
  const { formattedDate, formattedTime } = formatDateTime(epochTime, timezone);

  return (
    <>
      <div className="info_value_main">
        {formattedDate ? formattedDate : null}
      </div>
      <div className="info_value_sub">
        {formattedTime ? formattedTime : null}
      </div>
    </>
  );
};

export default DateComponent;
