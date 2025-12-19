#!/usr/bin/env python3
"""
Generate 365 valid word ladder puzzles.
Each puzzle must have:
1. Start and end words with NO matching letters in ANY position
2. Exactly 4 steps (3 intermediary words)
3. All words from the valid word list
"""

from collections import deque
import random

# Complete word list from index.html
VALID_WORDS = {
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
}

def no_letters_match(word1, word2):
    """Check if two words have NO letters in the same position."""
    if len(word1) != 4 or len(word2) != 4:
        return False
    return all(word1[i] != word2[i] for i in range(4))

def find_neighbors(word):
    """Find all valid neighbors (one letter change)."""
    neighbors = []
    for i in range(len(word)):
        for c in 'abcdefghijklmnopqrstuvwxyz':
            if c != word[i]:
                new_word = word[:i] + c + word[i+1:]
                if new_word in VALID_WORDS:
                    neighbors.append(new_word)
    return neighbors

def find_path_exactly_4_steps(start, end):
    """
    Find a path of EXACTLY 4 steps (3 intermediary words) from start to end.
    Returns the intermediary words if found, None otherwise.
    """
    if start == end:
        return None

    # BFS to find all paths of exactly 4 steps
    queue = deque([(start, [start], 0)])
    visited_at_depth = {}  # word -> min depth seen

    while queue:
        current, path, depth = queue.popleft()

        # If we've taken 4 steps
        if depth == 4:
            if current == end:
                # Return intermediary words (exclude start and end)
                return path[1:4]
            continue

        # Early termination: if we've seen this word at this depth before, skip
        if current in visited_at_depth and visited_at_depth[current] < depth:
            continue
        visited_at_depth[current] = depth

        # Explore neighbors
        for neighbor in find_neighbors(current):
            if neighbor not in path:  # Avoid cycles
                queue.append((neighbor, path + [neighbor], depth + 1))

    return None

def generate_puzzles(target_count=365):
    """Generate valid puzzles."""
    puzzles = []
    word_list = list(VALID_WORDS)

    # Track pairs we've tried
    tried_pairs = set()

    print(f"Generating {target_count} puzzles...")
    print(f"Total words available: {len(word_list)}")

    attempts = 0
    max_attempts = 100000

    while len(puzzles) < target_count and attempts < max_attempts:
        attempts += 1

        # Random selection
        start = random.choice(word_list)
        end = random.choice(word_list)

        # Skip if same or already tried
        pair_key = (start, end)
        if start == end or pair_key in tried_pairs:
            continue

        tried_pairs.add(pair_key)

        # Check position rule
        if not no_letters_match(start, end):
            continue

        # Find path
        if attempts % 1000 == 0:
            print(f"Attempt {attempts}, found {len(puzzles)} puzzles...")

        solution = find_path_exactly_4_steps(start, end)

        if solution:
            puzzles.append({
                'start': start,
                'solution': solution,
                'end': end
            })
            print(f"Puzzle {len(puzzles)}: {start} -> {solution} -> {end}")

            if len(puzzles) % 50 == 0:
                print(f"Progress: {len(puzzles)}/{target_count} puzzles generated")

    print(f"\nGeneration complete!")
    print(f"Total attempts: {attempts}")
    print(f"Puzzles generated: {len(puzzles)}")

    return puzzles

def format_puzzles_as_js(puzzles):
    """Format puzzles as JavaScript array."""
    lines = []
    for p in puzzles:
        sol_str = "', '".join(p['solution'])
        line = f"            {{ start: '{p['start']}', solution: ['{sol_str}'], end: '{p['end']}' }},"
        lines.append(line)
    return '\n'.join(lines)

def verify_puzzle(puzzle):
    """Verify a puzzle meets all requirements."""
    start = puzzle['start']
    end = puzzle['end']
    solution = puzzle['solution']

    # Check position rule
    if not no_letters_match(start, end):
        return False, "Letters match in same position"

    # Check all words are in valid set
    all_words = [start] + solution + [end]
    for word in all_words:
        if word not in VALID_WORDS:
            return False, f"Invalid word: {word}"

    # Check path length
    if len(solution) != 3:
        return False, f"Wrong solution length: {len(solution)}"

    # Check each step is valid (one letter change)
    path = [start] + solution + [end]
    for i in range(len(path) - 1):
        w1, w2 = path[i], path[i + 1]
        diffs = sum(1 for j in range(4) if w1[j] != w2[j])
        if diffs != 1:
            return False, f"Invalid step: {w1} -> {w2} ({diffs} changes)"

    return True, "OK"

if __name__ == '__main__':
    puzzles = generate_puzzles(365)

    # Verify all puzzles
    print("\n" + "="*60)
    print("VERIFYING ALL PUZZLES")
    print("="*60)

    all_valid = True
    for i, puzzle in enumerate(puzzles, 1):
        valid, msg = verify_puzzle(puzzle)
        if not valid:
            print(f"Puzzle {i} FAILED: {puzzle}")
            print(f"  Error: {msg}")
            all_valid = False

    if all_valid:
        print(f"All {len(puzzles)} puzzles are VALID!")

    # Save to file
    js_output = format_puzzles_as_js(puzzles)
    output_file = r'C:\Users\jamie\OneDrive\Desktop\Game\puzzles_output.txt'
    with open(output_file, 'w') as f:
        f.write(js_output)

    print(f"\nPuzzles saved to: {output_file}")
