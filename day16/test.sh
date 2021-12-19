#!/usr/bin/env bash
set -e

echo 'puzzle 1 example 1'
diff --unified <(jq '.[0].examples[0]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example11.txt)
echo 'puzzle 1 example 2'
diff --unified <(jq '.[0].examples[1]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example12.txt)
echo 'puzzle 1 example 3'
diff --unified <(jq '.[0].examples[2]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example13.txt)
echo 'puzzle 1 example 4'
diff --unified <(jq '.[0].examples[3]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example14.txt)
echo 'puzzle 1 input'
diff --unified <(jq '.[0].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts input.txt)

echo 'puzzle 2 example 1'
diff --unified <(jq '.[1].examples[0]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example21.txt)
echo 'puzzle 2 example 2'
diff --unified <(jq '.[1].examples[1]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example22.txt)
echo 'puzzle 2 example 3'
diff --unified <(jq '.[1].examples[2]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example23.txt)
echo 'puzzle 2 example 4'
diff --unified <(jq '.[1].examples[3]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example24.txt)
echo 'puzzle 2 example 5'
diff --unified <(jq '.[1].examples[4]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example25.txt)
echo 'puzzle 2 example 6'
diff --unified <(jq '.[1].examples[5]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example26.txt)
echo 'puzzle 2 example 7'
diff --unified <(jq '.[1].examples[6]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example27.txt)
echo 'puzzle 2 example 8'
diff --unified <(jq '.[1].examples[7]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example28.txt)
echo 'puzzle 2 input'
diff --unified <(jq '.[1].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts input.txt)
