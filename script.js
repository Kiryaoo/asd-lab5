const variant = 3312;
const variantString = variant.toString();
const n1 = parseInt(variantString[0]);
const n2 = parseInt(variantString[1]);
const n3 = parseInt(variantString[2]);
const n4 = parseInt(variantString[3]);

const numTops = n3 + 10;
const coefficient = 1 - n3 * 0.01 - n4 * 0.005 - 0.15;

let matrixDirected = [];

for (let i = 0; i < numTops; i++) {
    let row = [];
    for (let j = 0; j < numTops; j++) {
        let elem = (Math.random() * 2) * coefficient;
        row.push(Math.floor(elem));
    }
    matrixDirected.push(row);
}

console.log("Directed matrix:");
console.log(matrixDirected);

const arrOfNode2=[];
const arrOfThreeNodesArrow=[
    { x: -200, y: 0 },   // Coordinates for AC
    { x: 0, y: -400 },   // Coordinates for BC
    { x: 200, y: 0 }
];

const canvasArrow = document.getElementById('graphCanvasWithArrows');
const canvasDFS=document.getElementById('graphDFS')
const ctxArrow = canvasArrow.getContext('2d');
const ctxDFS = canvasArrow.getContext('2d');
ctxArrow.strokeStyle='black';

const width = 900;
const height = 900;
const vertexRadiusArrow = 15;

canvasArrow.width =width;
canvasArrow.height= height;

ctxArrow.arc(width / 2, height / 2, vertexRadiusArrow, 0, Math.PI * 2);
ctxDFS.arc(width / 2, height / 2, vertexRadiusArrow, 0, Math.PI * 2);

ctxArrow.fillStyle = "green";
ctxDFS.fillStyle = "green";


function drawCircleArrow(x, y, num, radius) {
    ctxArrow.beginPath();
    ctxArrow.arc(x, y, radius, 0, Math.PI * 2);
    ctxArrow.fillStyle = 'green';
    ctxArrow.fill();
    ctxArrow.closePath();

    ctxArrow.fillStyle = 'white';
    ctxArrow.font = 'bold 20px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';

    ctxArrow.fillText(num, x, y);
}
function transformCoordinateAreaArrow(ctx) {
    ctx.translate(width / 2, height / 1.25);
}
transformCoordinateAreaArrow(ctxArrow);

function createVertexArrow(ctx) {
    const lengthABArrow = Math.sqrt(((-200 - 200) ** 2) + (0 ** 2));
    const lengthBCArrow = Math.sqrt(((200) ** 2) + (0 - (-400)) ** 2);
    const lengthACArrow = lengthBCArrow;

    const cosAngle = 200 / lengthACArrow;
    const sinAngle = Math.sqrt(1 - cosAngle ** 2);

    // Gap between which the circles (vertices) will be drawn
    const dXACArrow = (lengthACArrow * cosAngle) / 4;
    const dYACArrow = (lengthACArrow * sinAngle) / 4;
    const dXBCArrow = (lengthACArrow * cosAngle) / 4;
    const dYBCArrow = (lengthACArrow * sinAngle) / 4;
    const dXABArrow = lengthABArrow / 3;

    let XforACArrow = -200;
    let YforACArrow = 0;
    let XforBCArrow = 0;
    let YforBCArrow = -400;
    let XforABArrow = 200;
    // Draw vertices A, B, C
    for (let i = 0; i < 4; i++) {
        arrOfNode2.push({ x: XforACArrow, y: YforACArrow });
        drawCircleArrow(XforACArrow, YforACArrow, String.fromCharCode(65 + i), 30); // A, B, C, D
        XforACArrow += dXACArrow;
        YforACArrow -= dYACArrow;
    }
    // Draw vertices E, F, G
    for (let i = 0; i < 4; i++) {
        arrOfNode2.push({ x: XforBCArrow, y: YforBCArrow });
        drawCircleArrow(XforBCArrow, YforBCArrow, String.fromCharCode(69 + i), 30); // E, F, G, H
        XforBCArrow += dXBCArrow;
        YforBCArrow += dYBCArrow;
    }
    // Draw vertices I, J, K
    for (let i = 0; i < 3; i++) {
        arrOfNode2.push({ x: XforABArrow, y: 0 });
        drawCircleArrow(XforABArrow, 0, String.fromCharCode(73 + i), 30); // I, J, K
        XforABArrow -= dXABArrow;
    }
}

createVertexArrow(ctxArrow);
function drawEdgesArrow(ctx) {
    for (let i = 0; i < 11; i++) {
        for (let j = i; j < 11; j++) {
            if (matrixDirected[i][j] === 1 && i===j) {
                drawSelfLoopArrow(arrOfNode2[j]);
            } else if(matrixDirected[i][j] === 1) {
                chooseLineArrow(arrOfNode2[i].x, arrOfNode2[i].y, arrOfNode2[j].x, arrOfNode2[j].y);
            }

        }
    }
}

function drawSelfLoopArrow(coordinateArrow) {
    const arrowheadSize=10
    ctxArrow.beginPath();
    ctxArrow.arc(coordinateArrow.x - 45, coordinateArrow.y, 20, Math.PI / 6, (Math.PI * 11) / 6);
    ctxArrow.stroke();
    ctxArrow.closePath();

    ctxArrow.save();
    ctxArrow.translate(coordinateArrow.x-34+ Math.cos((Math.PI * 11) / 6) * (20 - 10), coordinateArrow.y + Math.sin((Math.PI * 11) / 6) * (20 - 10));
    ctxArrow.rotate(45);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
    ctxArrow.fillStyle = 'black';
    ctxArrow.beginPath();
    ctxArrow.arc(coordinateArrow.x-45, coordinateArrow.y , 20, Math.PI / 6, Math.PI * 11 / 6);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function drawEdgeLineArrow(start, end, color, bendAngle = Math.PI / 8, arrowDistance = 20) {
    const arrowSize = 15;

    const midXArrow = (start.x + end.x) / 2;
    const midYArrow = (start.y + end.y) / 2;

    let controlX, controlY;

    if (start.x !== end.x && start.y !== end.y) {
        controlX = midXArrow + Math.cos(bendAngle) * (midYArrow - start.y);
        controlY = midYArrow + Math.sin(bendAngle) * (midXArrow - start.x);
    } else if (start.x === end.x) {
        controlX = midXArrow + 100;
        controlY = midYArrow;
    } else {
        controlX = midXArrow;
        controlY = midYArrow + 100;
    }

    ctxArrow.strokeStyle = color;
    ctxArrow.beginPath();
    ctxArrow.moveTo(start.x, start.y);
    ctxArrow.quadraticCurveTo(controlX, controlY, end.x, end.y);
    ctxArrow.stroke();
    ctxArrow.closePath();

    const angle = Math.atan2(end.y - controlY, end.x - controlX);

    const newEndX = end.x - arrowDistance * Math.cos(angle);
    const newEndY = end.y - arrowDistance * Math.sin(angle);

    ctxArrow.save();
    ctxArrow.translate(newEndX, newEndY);
    ctxArrow.rotate(angle);
    ctxArrow.fillStyle = color;
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowSize, arrowSize / 2);
    ctxArrow.lineTo(-arrowSize, -arrowSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}

function chooseLineArrow(x1, y1, x2, y2, color = 'black') {
    if (checkFunctionArrow({ x: x1, y: y1 }, { x: x2, y: y2 })) {
        drawEdgeLineArrow({ x: x1, y: y1 }, { x: x2, y: y2 }, color);
    } else {
        ctxArrow.beginPath();
        ctxArrow.moveTo(x1, y1);
        ctxArrow        .lineTo(x2, y2);
        ctxArrow.strokeStyle = color;
        ctxArrow.stroke();
        ctxArrow.closePath();

        const angle = Math.atan2(y2 - y1, x2 - x1);

        const arrowSize = 12;
        const gapX = Math.cos(angle) * 10;
        const gapY = Math.sin(angle) * 10;

        ctxArrow.beginPath();
        ctxArrow.fillStyle = color;
        ctxArrow.moveTo(x2 - gapX, y2 - gapY);
        ctxArrow.lineTo(
            x2 - arrowSize * Math.cos(angle - Math.PI / 6) - gapX,
            y2 - arrowSize * Math.sin(angle - Math.PI / 6) - gapY
        );
        ctxArrow.lineTo(
            x2 - arrowSize * Math.cos(angle + Math.PI / 6) - gapX,
            y2 - arrowSize * Math.sin(angle + Math.PI / 6) - gapY
        );
        ctxArrow.closePath();
        ctxArrow.fill();
    }
}

function checkFunctionArrow(start, end) {
    const [A, B, C] = arrOfThreeNodesArrow;

    function isPointOnLineSegmentArrow(P, A, B) {
        const crossProductArrow = (P.y - A.y) * (B.x - A.x) - (P.x - A.x) * (B.y - A.y);
        if (Math.abs(crossProductArrow) !== 0) return false;

        const dotProductArrow = (P.x - A.x) * (B.x - A.x) + (P.y - A.y) * (B.y - A.y);
        if (dotProductArrow < 0) return false;

        const squaredLengthBA = (B.x - A.x) ** 2 + (B.y - A.y) ** 2;
        if (dotProductArrow > squaredLengthBA) return false;

        return true;
    }

    function isOnSameEdgeArrow(P1, P2, A, B) {
        return isPointOnLineSegmentArrow(P1, A, B) && isPointOnLineSegmentArrow(P2, A, B);
    }

    return (
        isOnSameEdgeArrow(start, end, A, B) ||
        isOnSameEdgeArrow(start, end, B, C) ||
        isOnSameEdgeArrow(start, end, C, A)
    );
}

drawEdgesArrow(ctxArrow);

let previousVertex = null;
let edgeColor = 'black';

function highlightVertex(vertexIndex) {
    const vertex = arrOfNode2[vertexIndex];
    if (previousVertex !== null) {
        chooseLineArrow(previousVertex.x, previousVertex.y, vertex.x, vertex.y, edgeColor);
    }
    ctxArrow.beginPath();
    ctxArrow.arc(vertex.x, vertex.y, 30, 0, Math.PI * 2);
    ctxArrow.fillStyle = 'red';
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white';
    ctxArrow.fillText(String.fromCharCode(65 + vertexIndex), vertex.x, vertex.y);
    previousVertex = vertex;
}

function clearGraph() {
    ctxArrow.clearRect(-width / 2, -height / 1.25, width, height);
    previousVertex = null;
    arrOfNode2.length = 0;
    createVertexArrow(ctxArrow);
    drawEdgesArrow(ctxArrow);
}


const bfsVisitedNodes = [];
const dfsVisitedNodes = [];

function startBFS() {
    clearGraph();
    edgeColor = 'blue';
    const visited = new Array(numTops).fill(false);
    const queue = [0];
    visited[0] = true;

    const bfsInterval = setInterval(() => {
        if (queue.length === 0) {
            clearInterval(bfsInterval);
            console.log("BFS Visited Nodes:", bfsVisitedNodes);
            return;
        }
        const current = queue.shift();
        bfsVisitedNodes.push(current);
        highlightVertex(current);
        for (let i = 0; i < numTops; i++) {
            if (matrixDirected[current][i] === 1 && !visited[i]) {
                queue.push(i);
                visited[i] = true;
            }
        }
    }, 1000);
}



function startDFS() {
    clearGraph();
    edgeColor = 'purple';
    const visited = new Array(numTops).fill(false);
    const stack = [0];
    visited[0] = true;

    const dfsInterval = setInterval(() => {
        if (stack.length === 0) {
            clearInterval(dfsInterval);
            console.log("DFS Visited Nodes:", dfsVisitedNodes);
            return;
        }
        const current = stack.pop();
        dfsVisitedNodes.push(current);
        highlightVertex(current);
        for (let i = 0; i < numTops; i++) {
            if (matrixDirected[current][i] === 1 && !visited[i]) {
                stack.push(i);
                visited[i] = true;
            }
        }
    }, 1000);
}
