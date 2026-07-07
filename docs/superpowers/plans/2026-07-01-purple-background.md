# Purple Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the full-page background of the Tetris app from deep rose to soft lavender.

**Architecture:** Single Tailwind class swap on the outermost `div` in `src/App.jsx`. No logic changes, no new files.

**Tech Stack:** React, Tailwind CSS

## Global Constraints

- Use Tailwind utility classes only — no inline styles, no new CSS rules
- Do not alter any other class or component

---

### Task 1: Change page background to `bg-purple-200`

**Files:**
- Modify: `src/App.jsx:5`

**Interfaces:**
- Consumes: nothing
- Produces: visible soft lavender page background

- [ ] **Step 1: Apply the change**

In `src/App.jsx`, line 5, replace the class string:

```jsx
// Before
<div className="min-h-screen bg-pink-900 flex items-center justify-center">

// After
<div className="min-h-screen bg-purple-200 flex items-center justify-center">
```

- [ ] **Step 2: Verify visually**

Run the dev server and confirm the background is soft lavender:

```bash
npm run dev
```

Open the browser. The full page background should be a light purple/lavender color. The board, stats, and sidebar should remain visually clear against it.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: change page background to purple-200"
```
