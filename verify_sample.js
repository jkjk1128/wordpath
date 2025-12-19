// Verify a sample of puzzles to ensure they meet all requirements

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

// Sample puzzles to verify
const samplePuzzles = [
    { start: 'disk', solution: ['risk', 'rise', 'rose'], end: 'rode' },
    { start: 'cold', solution: ['hold', 'held', 'head'], end: 'heat' },
    { start: 'worm', solution: ['wore', 'wire', 'wife'], end: 'life' },
    { start: 'dare', solution: ['dame', 'damp', 'dump'], end: 'jump' },
    { start: 'love', solution: ['lose', 'lost', 'last'], end: 'wast' }
];

function verifyPuzzle(puzzle, index) {
    const { start, end, solution } = puzzle;

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Verifying Puzzle ${index + 1}: ${start} -> ${end}`);
    console.log(`${'='.repeat(60)}`);

    // Check 1: Position rule - no letters match in ANY position
    console.log('\nCheck 1: Position Rule (No letters match in same position)');
    let positionMatch = false;
    for (let i = 0; i < 4; i++) {
        const match = start[i] === end[i];
        console.log(`  Position ${i}: '${start[i]}' vs '${end[i]}' - ${match ? '❌ MATCH' : '✓ Different'}`);
        if (match) positionMatch = true;
    }

    if (positionMatch) {
        console.log('❌ FAILED: Position rule violated!');
        return false;
    }
    console.log('✓ PASSED: Position rule satisfied');

    // Check 2: All words are valid
    console.log('\nCheck 2: All words are valid');
    const allWords = [start, ...solution, end];
    let allValid = true;
    for (const word of allWords) {
        const valid = VALID_WORDS.has(word);
        console.log(`  '${word}' - ${valid ? '✓ Valid' : '❌ Invalid'}`);
        if (!valid) allValid = false;
    }

    if (!allValid) {
        console.log('❌ FAILED: Contains invalid words!');
        return false;
    }
    console.log('✓ PASSED: All words are valid');

    // Check 3: Path length is exactly 4 steps
    console.log('\nCheck 3: Path length (should be 4 steps / 3 intermediary words)');
    console.log(`  Solution length: ${solution.length}`);

    if (solution.length !== 3) {
        console.log('❌ FAILED: Wrong solution length!');
        return false;
    }
    console.log('✓ PASSED: Correct path length');

    // Check 4: Each step changes exactly one letter
    console.log('\nCheck 4: Each step changes exactly ONE letter');
    const path = [start, ...solution, end];
    let validSteps = true;

    for (let i = 0; i < path.length - 1; i++) {
        const w1 = path[i];
        const w2 = path[i + 1];
        let diffs = 0;
        let diffPos = -1;

        for (let j = 0; j < 4; j++) {
            if (w1[j] !== w2[j]) {
                diffs++;
                diffPos = j;
            }
        }

        const valid = diffs === 1;
        console.log(`  Step ${i + 1}: '${w1}' -> '${w2}' (${diffs} change${diffs !== 1 ? 's' : ''} at pos ${diffPos}) - ${valid ? '✓ Valid' : '❌ Invalid'}`);

        if (!valid) validSteps = false;
    }

    if (!validSteps) {
        console.log('❌ FAILED: Invalid step(s) detected!');
        return false;
    }
    console.log('✓ PASSED: All steps are valid');

    console.log('\n✓✓✓ ALL CHECKS PASSED ✓✓✓');
    return true;
}

// Verify all sample puzzles
console.log('VERIFYING SAMPLE PUZZLES');
console.log('='.repeat(60));

let allPassed = true;
for (let i = 0; i < samplePuzzles.length; i++) {
    const passed = verifyPuzzle(samplePuzzles[i], i);
    if (!passed) allPassed = false;
}

console.log('\n\n' + '='.repeat(60));
if (allPassed) {
    console.log('✓✓✓ ALL SAMPLE PUZZLES PASSED ✓✓✓');
} else {
    console.log('❌❌❌ SOME PUZZLES FAILED ❌❌❌');
}
console.log('='.repeat(60));
