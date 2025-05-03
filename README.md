# Simplest Path Algorithm – Visual Web App

This project presents a visual demonstration of pathfinding algorithms, particularly focusing on the **“Simplest Path”** concept, based on the research by Duckham and Kulik. It has been developed as part of an academic research project and is implemented as an interactive browser-based web application.

## 🧠 Motivation

During the research phase, the primary goal was to compare different routing strategies:

- **Shortest Path** (based on Euclidean distance)
- **Simplest Path** (minimizing turning effort)
- **Custom Simplest Path** (turn angle sensitivity)

## 🔍 Algorithm Overview

### Dijkstra-Based Simplest Path

The core algorithm is an adaptation of Dijkstra’s algorithm using a custom **turn cost model**. The weight of each edge is determined by:

- The **angle between previous, current, and next node**
- The **type of intersection** (e.g., T-junction or crossroads)

Angles are calculated using the tangent between coordinates of three nodes. A sharp turn leads to higher costs, while smoother curves are favored.

### Data Structure

A custom adjacency structure was used:

- Implemented as a `Map` of JSON objects
- Each node has:
  - `x`, `y` coordinates
  - `index`
  - `distance` from start
  - `edges`: array of connected nodes with metadata (e.g., `marked` for coloring)

Performance optimization was achieved by using a hashmap for fast lookup.

## 🌐 Visualization in the Browser

The web application renders the graph using **HTML Canvas**. Each node is drawn as a circle, and edges as lines. The selected path is highlighted in red, while other edges are gray.

To ensure visibility:

- Edge overlaps are checked to avoid red lines being overwritten by gray ones
- Canvas size is scaled (2:1) to fit screen resolutions better
- Fullscreen mode is recommended (press `F11` in browser)

## 🧪 Testing and Validation

The app was tested using:

1. A simplified network inspired by Duckham & Kulik’s paper
2. A full road network of the **City of Clausthal**

### Interactive Testing

Users can:

- Select **start** and **destination** nodes
- Toggle between **Shortest**, **Simplest**, and **Custom Simplest** algorithms
- See the resulting path and total **distance**

#### Example comparisons:

| Start → End | Shortest Path | Simplest Path   | Custom Simplest Path |
| ----------- | ------------- | --------------- | -------------------- |
| 12 → 28     | Through city  | Outer ring      | Avoids sharp angles  |
| 5 → 47      | Short cut     | Wide arc        | Similar to Simplest  |
| 49 → 17     | Center route  | Periphery route | Custom preference    |

These examples show how path choice differs depending on the algorithm used.

## 🧭 Custom Simplest Path

The **Custom Simplest Path** enhances the basic model by assigning:

- Higher costs to **sharper turns**
- More nuanced weightings beyond just intersection type

This reflects real-world driving comfort, where smooth, shallow turns are preferable.

## ⚠️ Known Phenomenon

When **reversing start and end nodes**, a different route may be chosen. This is due to the fact that multiple equally simple paths may exist, and the algorithm picks one depending on traversal direction.

## 🧩 Limitations & Future Work

The differences between the Simplest and Custom Simplest Path algorithms become more visible in **larger, more complex graphs**. The current network size limits the variety of intersection situations.

To fully explore these effects:

- A **larger road network** with varied junction types is recommended
- More **turn scenarios** are needed for in-depth evaluation

## 🛠️ Technologies Used

- JavaScript / HTML5
- HTML Canvas
- JSON-based graph modeling

## 📷 Screenshots

_Add browser screenshots here showing the graph, selected path, and dropdown controls._

## 🧑‍💻 Author

Developed by Daniel Helfenstein as part of a research project at Ostfalia University of Applied Science.

---
