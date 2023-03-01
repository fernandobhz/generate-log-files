#!/usr/bin/env node
import fs from 'fs/promises';

const log = (...args) => console.log(new Date().toISOString(), ...args);
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentPrevious = process.argv.at(2);

if (!['current', 'previous'].includes(currentPrevious)) {
  console.log(`Usage:\n\tnpx generate-log-files [current|previous]`);
  process.exit(1);
}

log(`starting generation of ${currentPrevious} month log files`);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const workingMonth = currentMonth - (currentPrevious === 'previous' ? 1 : 0);

const firstDate = new Date(currentYear, workingMonth, 1);
const lastDate = new Date(currentYear, currentMonth, 0);

const firstDay = firstDate.getDate();
const lastDay = lastDate.getDate();

for (let currentDay = firstDay; currentDay <= lastDay; currentDay++) {
  const currentDate = new Date(currentYear, currentMonth, currentDay)
  const currentWeekDay = weekdays.at(currentDate.getDay());
  const currentDateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
  const weekendWarning = ["Sunday", "Saturday"].includes(currentWeekDay) ? ` - Weekend` : ``;
  const fileName = `${currentDateString} - ${currentWeekDay}${weekendWarning}.txt`;
  
  log(`creating ${fileName}`)
  await fs.writeFile(fileName, ``);
}

log(`done`);
