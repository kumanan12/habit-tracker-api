/* const express = require("express");
const router = express.Router();
const path = require("path");
const fsPromises = require("fs").promises;
const habitsData = require("../DB-data/habits.json"); */

import express from "express"
import path from "path"
import {promises as fsPromises} from "fs"
import habitsData from "../DB-data/habits.json" with { type: "json" };


const router = express.Router()

function duplicate(input) {
  return habitsDB.habits.find((habit) => habit.habit === input); // habit property in each habit
}

const habitsDB = {
  habits: [...habitsData],
  setHabits: function (data) {
    this.habits = data;
  },
};

router.get("/", (req, res) => {
  res.json(habitsDB.habits);
});

router.post("/", async (req, res) => {
  const id = habitsDB.habits?.length
    ? parseInt(habitsDB.habits[habitsDB.habits.length - 1].id) + 1
    : 1;

  const { habit, date } = req.body;

  if (!habit || !date) {
    return res.status(404).json({ message: "Habit and date are required" });
  }

  const checkDuplicate = duplicate(habit);
  if (checkDuplicate) {
    return res.status(404).json({ message: "The habit already exists" }); // conflict
  }

  const newHabit = {
    id: id,
    habit: habit,
    date: date,
  };

  habitsDB.setHabits([...habitsDB.habits, newHabit]);

  await fsPromises.writeFile(
    path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'DB-data', 'habits.json'),
    JSON.stringify(habitsDB.habits)
  )

  res.status(200).json(newHabit)
});

router.route("/:id").get((req, res) => {
    const habit = habitsDB.habits.find((habit) => habit.id === parseInt(req.params.id))

    if(!habit){
        res.status(404).json({ message : `Habit id ${req.params.id} is not avaliable`})
    }

    res.send(habit)

});



export default router;