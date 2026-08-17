# Mini-Arcade-Game
Three browser games (Minesweeper, Tic-Tac-Toe, Rock Paper Scissors) built in vanilla JS  recursive flood-fill, a rule-based AI opponent and a streak-multiplier system all from scratch.
# 🕹️ Mini Arcade — JS Game Collection
A small collection of three browser games built from scratch in vanilla JavaScript, HTML and CSS no frameworks, no libraries. Built as a way to actually *use* core JS concepts (recursion, closures, event handling, localStorage) instead of just reading about them.

---
## Games
### 🧩 Minesweeper
A 12×12 grid with adjustable mine count, built entirely from scratch no tutorial cloned line-for-line.
- Recursive flood-fill: clicking an empty cell cascades open every connected safe cell, same as the original game
- Lives system (3 mines before it's actually game over, instead of instant death)
- Countdown timer, hint system (3 free reveals) and a scoreboard that saves your best run via `localStorage`
- Right-click flagging
### ⭕ Tic-Tac-Toe
Play against a computer opponent that isn't just picking random cells.
- The AI checks, in order: *can I win this turn? → does the opponent win next turn if I don't block? → otherwise, pick a move*
- Flip-card style score tracker (Player X vs Computer O), win-line highlight animation
- Draw detection
### ✊ Rock Paper Scissors
- Streak system — string wins together and your score multiplier climbs (x2 at 3 wins, x3 at 5)
- Live "vs" display showing both choices side-by-side after each round
---
## Built With
`HTML5` · `CSS3` · `Vanilla JavaScript (ES6+)` — no frameworks, no build tools
**Concepts practiced:** recursion, closures, DOM manipulation, event delegation, `localStorage`, `setInterval`/`setTimeout`, array/object handling, CSS Grid & animations
---
## Project Structure
```
Mini-Arcade/
├── index.html              # homepage
├── homepage-style.css
├── MSW.html                # Minesweeper
├── (minesweeper css/js)
├── TTT.html                 # Tic-Tac-Toe
├── (tic-tac-toe css/js)
├── RPS.html                 # Rock Paper Scissors
├── (rps css/js)
└── images/                  # RPS hand icons
```
## Running Locally
No build step needed — clone and open `index.html` in a browser.
```bash
git clone <[repo-url](https://github.com/RabiyaRana/Mini-Arcade-Game)>
cd Mini-Arcade
```
Then just open `index.html`.
---
## What I'd Improve Next
- Smarter (minimax-based) Tic-Tac-Toe AI instead of the current rule-based version
- Power-ups and difficulty-based AI opponents for Rock Paper Scissors
- Shared, persistent stats across all three games in one place
---
## Author
Built by **Rabiya** — BS Software Engineering student, semester 2.
