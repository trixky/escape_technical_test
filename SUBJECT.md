# Rploce - Escape's fullstack software engineering interview

## Description

You are developing a clone of the [r/place](https://www.reddit.com/r/place/) reddit event place.

You have been assigned the following business requirements:

- People can visit a web page, select a pixel on a canvas, and attach a color to that pixel on the canvas.
- Assigning a color is a rate-limited operation, it can happen once every x minutes for a given IP.
- When browsing the page, you see on each pixel of the canvas the last color that was assigned to it.

## Assessment

We ask you to provide **clean, idiomatic and formatted code**, as well as a **clean git history**. These elements **will be part of the assessment**.

We ask you to provide **pragmatic** solutions to meet the below requirements:

- For instance, solving this test and matching our business requirements does not necessarily require to setup a database system.
- You should focus on solutions working **locally**, without worrying about moving it to any kind of production environment.

## Delivery

## Exercises

- You have to complete exercise 1 first, but exercises 2, 3, and 4 can be completed independently.
- For each exercise, the estimated of time to spend on it is indicated.

### Exercise 1: A basic collaborative canvas

The first step requires you to modify the existing codebase to provide a basic interactive canvas:

- It is possible to chose the color of cells in the canvas
- The color of the cell should be persisted and survive a server restart
- The color selected for the canvas' cell should be displayed in the website
- No need to provide rate-limiting
- No need to provide server-side authentication

## Exercise 2: Improvements on the application

- The frontend display is a bit less ugly, and color transitions are animated
- It is possible to leverage external libraries to achieve this result
- _Bonus_ It is possible to update the color of tile without using the mouse

_Hint_: It might be required to still leverage the mouse for selecting a color in the native color picker input. Showcase your creativity!

## Exercise 3: Improvements on the server

- With two windows opened, if I update the color of a tile on the first window, I should see the change reflected in the second window with any page reload
- It is possible to leverage external libraries to achieve this result
- No need to provide authentication
- _Bonus_: Rate limiting is implemented

## _Bonus_: Make it alive

- There is a button on the website that starts renderring patterns programmatically on the grid. For instance, the button is able to render the circular function _ρ=kθ_ where _k_ is a constant and _θ_ is the angle in radians.
