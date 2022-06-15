import express from "express";

import holidays from "./holidays.js";

const app = express();

function getTodayDate() {
  return new Date().toLocaleDateString();
}

function getHolidayName(date) {
  return holidays.find((holiday) => holiday.date === date).name;
}

function isTodayHoliday() {
  const todayDate = getTodayDate();

  return holidays.some((holiday) => holiday.date === todayDate);
}

app.get("/holidays", (_, res) => {
  res.send(holidays);
});

app.get("/is-today-holiday", (_, res) => {
  res.send(
    isTodayHoliday()
      ? `Sim, hoje é ${getHolidayName(getTodayDate())}`
      : "Não, hoje não é feriado"
  );
});

app.get("/holidays/:month", (req, res) => {
  const { month } = req.params;
  const dateRegex = new RegExp(`^${month}/[0-9]{1,2}/[0-9]{4}`);

  const holidaysFound = holidays.filter((holiday) =>
    dateRegex.test(holiday.date)
  );

  if (holidaysFound.length === 0) {
    res.send("Este mês não possui nenhum feriado");
    return;
  }

  res.send(holidaysFound);
});

app.listen(5000, () => {
  console.log("server is running");
});
