#MathFlow
## Inspiration
We wanted to redefine the traditional pencil and paper workflow of solving math problems. Paper and pencil is effective, but we wanted a faster and more intuitive way to solve the problems while still providing the same levels of interaction and problem solving that promote learning.

## What it does
MathFlow provides a virtual workspace that allows users to interact with math equations in a unique and intuitive way using drag and drop/touch controls in our application. It enables users to move variables and numbers to different sides of the equation while abiding by the basic rules of algebra. Users can also combine like terms. For example, in the equation x + 2x = 3, they could combine x and 2x to make 3x by dragging the elements over each other. Our app keeps track of all changes in history so users can undo/redo and go back to a specific point in their solving process if they make mistakes or want to try again. Users can also simplify/reduce fractions by tapping on them.

## How we built it
We used React, TypeScript and React-DnD (a drag and drop library for React) to build a web application that is compatible with mouse input and touch input. We detect if the user has a touch device and give them the ability to drag elements with their touch screen or their mouse whichever is applicable. We used an incremental development process to start with a MVP and add more features as the hackathon progressed. We utilized pair-programming and brainstorming to find the best way to implement our features. We deployed our app using GitHub pages and are setting up a custom .tech domain (mathflow.tech).

## Challenges we ran into
We had issues with stale state when using the React-DnD library. This was a major issue that was not easily detectable and led us down many different rabbit holes as a result. After debugging and reading documentation for over an hour we finally found the issue and were able to continue working.

## Accomplishments that we're proud of
We are really proud of how the experience came out as a whole and the final result of our work. This is our 3rd hackathon together and our experience was invaluable to our success. We are really happy with how the app feels and worked really hard to keep the experience clean and intuitive.

## What we learned
We learned a lot about how drag and drop works and about state management using React. It was our first using the React-DnD library and Nick's first time making a full app using Functional Components. We really came to understand the importance of incremental development and keeping scope focused throughout the project. By focusing on small features one at a time we were able to make progress without getting overwhelmed or confused.

## What's next for MathFlow
We have a huge vision for the future of MathFlow. We want it to be the primary application to solve math equations and be a teaching aid for classrooms across the world. We hope to add an equation editor where teachers can virtualize their problem sets or examples into our app for students to solve digitally. We also hope to start adding more advanced math concepts like exponents, matrices, and systems of equations. We think our concept is very applicable and adaptable to all types of math and we worked hard to design our internal logic in a way that is extensible and reusable for the future.
