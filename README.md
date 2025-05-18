# Hardware Hierarchy Visualizer

An interactive visualization tool for displaying and manipulating hierarchical hardware structures using D3.js.

## Features

- Interactive tree structure visualization
- Multiple visualization layouts:
  - Tree Layout
  - Radial Layout
  - Cluster Layout
- Dynamic node addition and manipulation
- JSON import/export functionality
- Real-time visualization updates

## Live Demo

[View Live Demo](#) <!-- Will be updated once deployed -->

## Project Structure

```
├── src/            # Source code
│   ├── server.js   # Express server
│   └── index.js    # Application entry point
├── public/         # Static assets
│   ├── js/        # Client-side JavaScript
│   └── styles/    # CSS styles
├── tests/         # Test files
└── config/        # Configuration files
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/suhasvirmani/hardware-hierarchy-visualizer.git
cd hardware-hierarchy-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Adding Nodes:**
   - Enter a node name in the input field
   - Click "Add Node" for root-level nodes
   - Click "Add Child" to add to selected node

2. **JSON Import/Export:**
   - Click "Load JSON" to import a tree structure
   - Click "Export JSON" to save your current tree

3. **Visualization:**
   - Use the dropdown to switch between layouts
   - Click nodes to select them
   - Drag to pan, scroll to zoom

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm start`: Start production server
- `npm test`: Run test suite

## Technologies Used

- D3.js for visualizations
- Express.js for server
- Jest for testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - a permissive license similar to the MIT License but with simpler language. It allows you to:

- Use the code commercially
- Modify the code
- Distribute the code
- Use it privately

The only requirement is that you include the original copyright notice and license text in any copy of the software/source.

## Acknowledgments

- D3.js community for visualization examples
- Node.js community for excellent tooling
