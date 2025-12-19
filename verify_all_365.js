#!/usr/bin/env node
/**
 * Verify ALL 365 generated puzzles meet requirements
 */

const fs = require('fs');

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

// Parse puzzles from output file
function parsePuzzles() {
    const content = fs.readFileSync('puzzles_output.txt', 'utf8');
    const lines = content.trim().split('\n');
    const puzzles = [];

    for (const line of lines) {
        // Parse: { start: 'disk', solution: ['risk', 'rise', 'rose'], end: 'rode' },
        const match = line.match(/start: '(\w+)', solution: \[(.*?)\], end: '(\w+)'/);
        if (match) {
            const start = match[1];
            const solutionStr = match[2];
            const end = match[3];
            const solution = solutionStr.match(/'(\w+)'/g).map(s => s.replace(/'/g, ''));
            puzzles.push({ start, solution, end });
        }
    }

    return puzzles;
}

function verifyPuzzle(puzzle) {
    const { start, end, solution } = puzzle;
    const errors = [];

    // Check 1: Position rule
    for (let i = 0; i < 4; i++) {
        if (start[i] === end[i]) {
            errors.push(`Position ${i} matches: '${start[i]}'`);
        }
    }

    // Check 2: All words valid
    const allWords = [start, ...solution, end];
    for (const word of allWords) {
        if (!VALID_WORDS.has(word)) {
            errors.push(`Invalid word: '${word}'`);
        }
    }

    // Check 3: Solution length
    if (solution.length !== 3) {
        errors.push(`Wrong solution length: ${solution.length} (expected 3)`);
    }

    // Check 4: Single letter changes
    const path = [start, ...solution, end];
    for (let i = 0; i < path.length - 1; i++) {
        const w1 = path[i];
        const w2 = path[i + 1];
        let diffs = 0;
        for (let j = 0; j < 4; j++) {
            if (w1[j] !== w2[j]) diffs++;
        }
        if (diffs !== 1) {
            errors.push(`Invalid step ${i + 1}: '${w1}' -> '${w2}' (${diffs} changes)`);
        }
    }

    return { valid: errors.length === 0, errors };
}

// Main
console.log('Loading puzzles from puzzles_output.txt...');
const puzzles = parsePuzzles();
console.log(`Found ${puzzles.length} puzzles\n`);

console.log('Verifying all puzzles...\n');

let failCount = 0;
const failedPuzzles = [];

for (let i = 0; i < puzzles.length; i++) {
    const result = verifyPuzzle(puzzles[i]);

    if (!result.valid) {
        failCount++;
        failedPuzzles.push({ index: i + 1, puzzle: puzzles[i], errors: result.errors });
        console.log(`❌ Puzzle ${i + 1} FAILED: ${puzzles[i].start} -> ${puzzles[i].end}`);
        for (const error of result.errors) {
            console.log(`   ${error}`);
        }
    } else if ((i + 1) % 50 === 0) {
        console.log(`✓ Verified ${i + 1}/${puzzles.length} puzzles...`);
    }
}

console.log('\n' + '='.repeat(60));
if (failCount === 0) {
    console.log(`✓✓✓ SUCCESS! All ${puzzles.length} puzzles are VALID! ✓✓✓`);
} else {
    console.log(`❌❌❌ FAILURE: ${failCount}/${puzzles.length} puzzles FAILED ❌❌❌`);
    console.log('\nFailed puzzles:');
    for (const failed of failedPuzzles) {
        console.log(`  ${failed.index}. ${failed.puzzle.start} -> ${failed.puzzle.end}`);
    }
}
console.log('='.repeat(60));

// Summary statistics
console.log('\nSummary Statistics:');
console.log(`  Total Puzzles: ${puzzles.length}`);
console.log(`  Valid Puzzles: ${puzzles.length - failCount}`);
console.log(`  Failed Puzzles: ${failCount}`);
console.log(`  Success Rate: ${((puzzles.length - failCount) / puzzles.length * 100).toFixed(2)}%`);
