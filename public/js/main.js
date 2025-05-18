// Tree data structure
let treeData = {
    name: 'Root',
    children: []
};

let selectedNode = treeData;

// Tree manipulation functions
function addNode(name, parentNode = treeData) {
    const newNode = { name, children: [] };
    parentNode.children.push(newNode);
    updateTreePreview();
    updateVisualization();
}

function addChildToSelected(name) {
    if (selectedNode) {
        addNode(name, selectedNode);
    }
}

// Initialize the visualization
const margin = { top: 20, right: 90, bottom: 30, left: 90 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// D3 visualization functions
function createTreeVisualization() {
    const svg = d3.select('#visualization-container')
        .html('')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const tree = d3.tree().size([height, width]);
    const root = d3.hierarchy(treeData);
    const treeLayout = tree(root);

    // Add links
    const link = svg.selectAll('.link')
        .data(treeLayout.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    // Add nodes
    const node = svg.selectAll('.node')
        .data(treeLayout.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
        .attr('r', 10);

    node.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children ? -13 : 13)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name);

    // Add click handler for node selection
    node.on('click', (event, d) => {
        selectedNode = d.data;
        updateTreePreview();
    });
}

function createRadialVisualization() {
    const svg = d3.select('#visualization-container')
        .html('')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width/2 + margin.left},${height/2 + margin.top})`);

    const radius = Math.min(width, height) / 2;
    const tree = d3.tree()
        .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(treeData);
    const treeLayout = tree(root);

    // Add links
    const link = svg.selectAll('.link')
        .data(treeLayout.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    // Add nodes
    const node = svg.selectAll('.node')
        .data(treeLayout.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    node.append('circle')
        .attr('r', 10);

    node.append('text')
        .attr('dy', '.35em')
        .attr('text-anchor', d => d.x < Math.PI ? 'start' : 'end')
        .attr('transform', d => d.x < Math.PI ? 'translate(8)' : 'rotate(180)translate(-8)')
        .text(d => d.data.name);
}

function updateVisualization() {
    const vizType = document.getElementById('viz-type').value;
    switch (vizType) {
        case 'radial':
            createRadialVisualization();
            break;
        case 'tree':
        default:
            createTreeVisualization();
            break;
    }
}

function updateTreePreview() {
    const preview = document.getElementById('tree-preview');
    preview.textContent = JSON.stringify(treeData, null, 2);
}

// JSON handling functions
function loadTreeFromJSON(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        if (data && typeof data === 'object') {
            treeData = data;
            selectedNode = treeData;
            updateTreePreview();
            updateVisualization();
            return true;
        }
    } catch (error) {
        alert('Invalid JSON format');
        console.error('JSON parse error:', error);
    }
    return false;
}

function validateTreeStructure(node) {
    if (!node.name || typeof node.name !== 'string') {
        return false;
    }
    if (node.children) {
        if (!Array.isArray(node.children)) {
            return false;
        }
        return node.children.every(child => validateTreeStructure(child));
    }
    return true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addNodeBtn = document.getElementById('add-node');
    const addChildBtn = document.getElementById('add-child');
    const nodeNameInput = document.getElementById('node-name');
    const vizTypeSelect = document.getElementById('viz-type');
    const loadJsonBtn = document.getElementById('load-json');
    const exportJsonBtn = document.getElementById('export-json');
    const fileInput = document.getElementById('json-file');

    addNodeBtn.addEventListener('click', () => {
        const name = nodeNameInput.value.trim();
        if (name) {
            addNode(name);
            nodeNameInput.value = '';
        }
    });

    addChildBtn.addEventListener('click', () => {
        const name = nodeNameInput.value.trim();
        if (name) {
            addChildToSelected(name);
            nodeNameInput.value = '';
        }
    });

    loadJsonBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = e.target.result;
                try {
                    const parsedData = JSON.parse(jsonData);
                    if (validateTreeStructure(parsedData)) {
                        loadTreeFromJSON(jsonData);
                    } else {
                        alert('Invalid tree structure. JSON must contain "name" and optional "children" properties.');
                    }
                } catch (error) {
                    alert('Invalid JSON file');
                    console.error('Error reading JSON:', error);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please select a JSON file first');
        }
    });

    exportJsonBtn.addEventListener('click', () => {
        const jsonString = JSON.stringify(treeData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tree-structure.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    vizTypeSelect.addEventListener('change', updateVisualization);

    // Initialize
    updateTreePreview();
    updateVisualization();
});
