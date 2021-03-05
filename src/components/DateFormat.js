import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontSize: "12px",
    paddingRight: "5px",
  },
});

function isSameDate(date, now = new Date()) {
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function getFormatedDate(time) {
  const date = new Date(time * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let formatedDate = `${hour}:${minute}`;

  if (isSameDate(date)) {
    formatedDate = `Today at ${formatedDate}`;
  } else {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    if (isSameDate(date, now)) {
      formatedDate = `Yesterday at ${formatedDate}`;
    } else {
      formatedDate = `${formatedDate} ${month}/${day}/${year}`;
    }
  }
  return formatedDate;
}

export default function DateFormat({ time, ...props }) {
  const classes = useStyles();

  return (
    <span {...props} className={classes.root}>
      {getFormatedDate(time)}
    </span>
  );
}
