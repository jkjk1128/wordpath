#!/usr/bin/env node
/**
 * Generate 365 valid word ladder puzzles.
 * Each puzzle must have:
 * 1. Start and end words with NO matching letters in ANY position
 * 2. Exactly 4 steps (3 intermediary words)
 * 3. All words from the valid word list
 */

const VALID_WORDS = new Set([
    'able', 'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball',
    'band', 'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt',
    'best', 'bill', 'bird', 'blow', 'blue', 'boat', 'body', 'bomb', 'bond', 'bone',
    'book', 'boom', 'born', 'boss', 'both', 'bowl', 'bulk', 'burn', 'bush', 'busy',
    'call', 'calm', 'came', 'camp', 'card', 'care', 'cart', 'case', 'cash', 'cast',
    'cell', 'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'cold', 'come',
    'cook', 'cool', 'cope', 'copy', 'core', 'corn', 'cost', 'crew', 'crop', 'dark',
    'data', 'date', 'dawn', 'days', 'dead', 'deal', 'dean', 'dear', 'debt', 'deep',
    'deny', 'desk', 'dial', 'dick', 'diet', 'disc', 'disk', 'does', 'done', 'door',
    'dose', 'down', 'draw', 'drew', 'drop', 'drug', 'dual', 'duke', 'dust', 'duty',
    'each', 'earn', 'ease', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'face',
    'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel',
    'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm',
    'fish', 'five', 'flat', 'flow', 'food', 'foot', 'ford', 'form', 'fort', 'four',
    'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear',
    'gene', 'gift', 'girl', 'give', 'glad', 'gold', 'golf', 'gone', 'good', 'gray',
    'grew', 'grey', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang', 'hard',
    'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here',
    'hero', 'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host',
    'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item',
    'jack', 'jane', 'jean', 'john', 'join', 'jump', 'jury', 'just', 'keen', 'keep',
    'kent', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew', 'know', 'lack',
    'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead', 'left', 'less',
    'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load', 'loan', 'lock',
    'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail',
    'main', 'make', 'male', 'many', 'mark', 'mass', 'matt', 'meal', 'mean', 'meat',
    'meet', 'mere', 'mike', 'mile', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode',
    'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'navy', 'near',
    'neck', 'need', 'news', 'next', 'nice', 'nine', 'none', 'noon', 'nose',
    'note', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack',
    'page', 'paid', 'pain', 'pair', 'pale', 'palm', 'park', 'part', 'pass', 'past',
    'path', 'paul', 'peak', 'peer', 'pick', 'pile', 'pine', 'pink', 'pipe', 'plan',
    'play', 'plot', 'plug', 'plus', 'poll', 'pond', 'pool', 'poor', 'port', 'post',
    'pour', 'prey', 'pure', 'push', 'race', 'rail', 'rain', 'rang', 'rank', 'rare',
    'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride',
    'ring', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root',
    'rope', 'rose', 'rule', 'rush', 'ruth', 'safe', 'said', 'sake', 'sale', 'salt',
    'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell',
    'send', 'sent', 'sept', 'ship', 'shop', 'shot', 'show', 'shut', 'sick', 'side',
    'sign', 'sing', 'sink', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft',
    'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'spot', 'star',
    'stay', 'step', 'stop', 'such', 'suit', 'sure', 'take', 'tale', 'talk', 'tall',
    'tank', 'tape', 'task', 'team', 'tell', 'tend', 'term', 'test', 'text', 'than',
    'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'tide', 'tied', 'ties',
    'till', 'time', 'tiny', 'tone', 'took', 'tool', 'tops', 'tore', 'torn',
    'tour', 'town', 'tree', 'trip', 'true', 'tune', 'turn', 'twin', 'type', 'unit',
    'upon', 'used', 'user', 'vary', 'vast', 'very', 'vice', 'view', 'vote', 'wage',
    'wait', 'wake', 'walk', 'wall', 'want', 'ward', 'warm', 'warn', 'wash', 'wave',
    'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when',
    'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise',
    'wish', 'with', 'wood', 'word', 'wore', 'work', 'worn', 'yard', 'yeah', 'year',
    'your', 'zero', 'zone', 'cord', 'worm', 'form', 'farm', 'fare',
    'care', 'cave', 'cove', 'dove', 'dole', 'hole', 'hold', 'bold', 'bald',
    'tall', 'tale', 'male', 'mall', 'mail', 'maid', 'main', 'pain', 'pane', 'sane',
    'sage', 'safe', 'cafe', 'cage', 'page', 'pale', 'pall', 'toll', 'told',
    'toad', 'load', 'goad', 'gold', 'gild', 'wild', 'weld', 'meld', 'held', 'helm',
    'help', 'kelp', 'keep', 'seep', 'seen', 'teen', 'tend', 'send', 'sand', 'said',
    'sail', 'tail', 'fail', 'fall', 'gall', 'gale', 'gate', 'late', 'lace', 'race',
    'rice', 'rise', 'rode', 'code', 'coda', 'soda', 'sofa', 'soar', 'soap', 'slap',
    'bike', 'bake', 'cake', 'dump', 'damp', 'dame', 'tame', 'wish', 'wash', 'wast',
    'west', 'cook', 'cool', 'pool', 'hope', 'rope', 'role', 'sole', 'glue', 'glad',
    'goad', 'hire', 'hide', 'ride', 'pail', 'soot', 'boot', 'boat', 'sear', 'fear',
    'hear', 'heat', 'seal', 'seam', 'free', 'flee', 'flea', 'plea', 'dime', 'date',
    'fate', 'dear', 'deal', 'wink', 'wine', 'line', 'lone', 'long', 'bone', 'bane',
    'ring', 'rink', 'sink', 'sank', 'bind', 'band', 'land', 'lane', 'hole', 'hold',
    'bold', 'bolt', 'last', 'lost', 'host', 'most', 'bird', 'bard', 'barn', 'sick',
    'silk', 'silt', 'salt', 'sock', 'soak', 'soap', 'sing', 'pink', 'pine', 'slow',
    'slaw', 'claw', 'clay', 'sack', 'back', 'bank', 'seep', 'seen', 'teen', 'term',
    'dare', 'bare', 'barn', 'lose', 'rose', 'cola', 'wast'
]);

function noLettersMatch(word1, word2) {
    if (word1.length !== 4 || word2.length !== 4) return false;
    return word1[0] !== word2[0] &&
           word1[1] !== word2[1] &&
           word1[2] !== word2[2] &&
           word1[3] !== word2[3];
}

function findNeighbors(word) {
    const neighbors = [];
    const wordArray = word.split('');

    for (let i = 0; i < wordArray.length; i++) {
        const originalChar = wordArray[i];

        for (let charCode = 97; charCode <= 122; charCode++) {
            const newChar = String.fromCharCode(charCode);
            if (newChar === originalChar) continue;

            wordArray[i] = newChar;
            const newWord = wordArray.join('');

            if (VALID_WORDS.has(newWord)) {
                neighbors.push(newWord);
            }
        }
        wordArray[i] = originalChar;
    }

    return neighbors;
}

function findPathExactly4Steps(start, end) {
    if (start === end) return null;

    const queue = [[start, [start], 0]];
    const visitedAtDepth = new Map();

    while (queue.length > 0) {
        const [current, path, depth] = queue.shift();

        if (depth === 4) {
            if (current === end) {
                // Return intermediary words (exclude start and end)
                return path.slice(1, 4);
            }
            continue;
        }

        // Early termination
        if (visitedAtDepth.has(current) && visitedAtDepth.get(current) < depth) {
            continue;
        }
        visitedAtDepth.set(current, depth);

        const neighbors = findNeighbors(current);
        for (const neighbor of neighbors) {
            if (!path.includes(neighbor)) {
                queue.push([neighbor, [...path, neighbor], depth + 1]);
            }
        }
    }

    return null;
}

function generatePuzzles(targetCount = 365) {
    const puzzles = [];
    const wordList = Array.from(VALID_WORDS);
    const triedPairs = new Set();

    console.log(`Generating ${targetCount} puzzles...`);
    console.log(`Total words available: ${wordList.length}`);

    let attempts = 0;
    const maxAttempts = 100000;

    while (puzzles.length < targetCount && attempts < maxAttempts) {
        attempts++;

        // Random selection
        const start = wordList[Math.floor(Math.random() * wordList.length)];
        const end = wordList[Math.floor(Math.random() * wordList.length)];

        const pairKey = `${start}-${end}`;
        if (start === end || triedPairs.has(pairKey)) {
            continue;
        }

        triedPairs.add(pairKey);

        // Check position rule
        if (!noLettersMatch(start, end)) {
            continue;
        }

        // Find path
        if (attempts % 1000 === 0) {
            console.log(`Attempt ${attempts}, found ${puzzles.length} puzzles...`);
        }

        const solution = findPathExactly4Steps(start, end);

        if (solution) {
            puzzles.push({ start, solution, end });
            console.log(`Puzzle ${puzzles.length}: ${start} -> [${solution.join(', ')}] -> ${end}`);

            if (puzzles.length % 50 === 0) {
                console.log(`Progress: ${puzzles.length}/${targetCount} puzzles generated`);
            }
        }
    }

    console.log(`\nGeneration complete!`);
    console.log(`Total attempts: ${attempts}`);
    console.log(`Puzzles generated: ${puzzles.length}`);

    return puzzles;
}

function verifyPuzzle(puzzle) {
    const { start, end, solution } = puzzle;

    // Check position rule
    if (!noLettersMatch(start, end)) {
        return { valid: false, error: 'Letters match in same position' };
    }

    // Check all words are valid
    const allWords = [start, ...solution, end];
    for (const word of allWords) {
        if (!VALID_WORDS.has(word)) {
            return { valid: false, error: `Invalid word: ${word}` };
        }
    }

    // Check path length
    if (solution.length !== 3) {
        return { valid: false, error: `Wrong solution length: ${solution.length}` };
    }

    // Check each step is valid (one letter change)
    const path = [start, ...solution, end];
    for (let i = 0; i < path.length - 1; i++) {
        const w1 = path[i];
        const w2 = path[i + 1];
        let diffs = 0;
        for (let j = 0; j < 4; j++) {
            if (w1[j] !== w2[j]) diffs++;
        }
        if (diffs !== 1) {
            return { valid: false, error: `Invalid step: ${w1} -> ${w2} (${diffs} changes)` };
        }
    }

    return { valid: true };
}

function formatPuzzlesAsJS(puzzles) {
    return puzzles.map(p => {
        const solStr = p.solution.map(w => `'${w}'`).join(', ');
        return `            { start: '${p.start}', solution: [${solStr}], end: '${p.end}' },`;
    }).join('\n');
}

// Main execution
const fs = require('fs');

const puzzles = generatePuzzles(365);

// Verify all puzzles
console.log('\n' + '='.repeat(60));
console.log('VERIFYING ALL PUZZLES');
console.log('='.repeat(60));

let allValid = true;
for (let i = 0; i < puzzles.length; i++) {
    const result = verifyPuzzle(puzzles[i]);
    if (!result.valid) {
        console.log(`Puzzle ${i + 1} FAILED:`, puzzles[i]);
        console.log(`  Error: ${result.error}`);
        allValid = false;
    }
}

if (allValid) {
    console.log(`All ${puzzles.length} puzzles are VALID!`);
}

// Save to file
const jsOutput = formatPuzzlesAsJS(puzzles);
const outputFile = 'C:\\Users\\jamie\\OneDrive\\Desktop\\Game\\puzzles_output.txt';

fs.writeFileSync(outputFile, jsOutput, 'utf8');
console.log(`\nPuzzles saved to: ${outputFile}`);
