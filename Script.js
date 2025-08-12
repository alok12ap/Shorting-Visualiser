const barsContainer = document.getElementById("bars-container");
const arrayContainer = document.getElementById("array-container");
const logContainer = document.getElementById("log-container");
const speedInput = document.getElementById("speed");
const numBars = 20; // Changed array length to 10
let bars = [];
let delay = 100;

speedInput.addEventListener("input", () => {
    delay = 500 - speedInput.value;
});

function generateBars() {
    barsContainer.innerHTML = "";
    arrayContainer.innerHTML = "";
    logContainer.innerHTML = "";
    bars = [];
    let arrayValues = [];
    for (let i = 0; i < numBars; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        arrayValues.push(value);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bars.push({ element: bar, value });
        barsContainer.appendChild(bar);
    }
    arrayContainer.textContent = `Array: [${arrayValues.join(", ")}]`;
}

generateBars();

async function swap(i, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let temp = bars[i].value;
            bars[i].value = bars[j].value;
            bars[j].value = temp;
            bars[i].element.style.height = `${bars[i].value * 3}px`;
            bars[j].element.style.height = `${bars[j].value * 3}px`;
            logOperation(`Swapped index ${i} and ${j}`);
            resolve();
        }, delay);
    });
}

function logOperation(text) {
    logContainer.innerHTML += `<p>${text}</p>`;
    logContainer.scrollTop = logContainer.scrollHeight;
}

async function bubbleSort() {
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (bars[j].value > bars[j + 1].value) {
                logOperation(`Comparing index ${j} and ${j + 1}`);
                await swap(j, j + 1);
            }
        }
    }
    logOperation("Bubble Sort Completed!");
}

async function insertionSort() {
    for (let i = 1; i < bars.length; i++) {
        let j = i;
        logOperation(`Considering element at index ${i}`);
        while (j > 0 && bars[j].value < bars[j - 1].value) {
            logOperation(`Swapping ${bars[j].value} and ${bars[j - 1].value}`);
            await swap(j, j - 1);
            j--;
        }
    }
    logOperation("Insertion Sort Completed!");
}

async function selectionSort() {
    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        logOperation(`Selecting index ${i} as minimum`);
        for (let j = i + 1; j < bars.length; j++) {
            logOperation(`Comparing ${bars[j].value} with ${bars[minIndex].value}`);
            if (bars[j].value < bars[minIndex].value) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            logOperation(`Swapping ${bars[i].value} with new minimum ${bars[minIndex].value}`);
            await swap(i, minIndex);
        }
    }
    logOperation("Selection Sort Completed!");
}

async function quickSortHelper(left, right) {
    if (left >= right) return;
    let pivot = bars[right].value;
    logOperation(`Choosing pivot ${pivot} at index ${right}`);
    let partitionIndex = left;
    for (let i = left; i < right; i++) {
        logOperation(`Comparing ${bars[i].value} with pivot ${pivot}`);
        if (bars[i].value < pivot) {
            await swap(i, partitionIndex);
            partitionIndex++;
        }
    }
    await swap(partitionIndex, right);
    logOperation(`Pivot ${pivot} placed at index ${partitionIndex}`);
    await quickSortHelper(left, partitionIndex - 1);
    await quickSortHelper(partitionIndex + 1, right);
}

async function quickSort() {
    await quickSortHelper(0, bars.length - 1);
    logOperation("Quick Sort Completed!");
}

document.getElementById("generate").addEventListener("click", generateBars);
document.getElementById("bubble").addEventListener("click", bubbleSort);
document.getElementById("insertion").addEventListener("click", insertionSort);
document.getElementById("selection").addEventListener("click", selectionSort);
document.getElementById("quick").addEventListener("click", quickSort);
