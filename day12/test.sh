#!/usr/bin/env bash
set -e

echo 'puzzle 1 example 1'
diff --unified <(jq '.[0].examples[0]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example1.txt)
echo 'puzzle 1 example 2'
diff --unified <(jq '.[0].examples[1]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example2.txt)
echo 'puzzle 1 example 3'
diff --unified <(jq '.[0].examples[2]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts example3.txt)
echo 'puzzle 1 input'
diff --unified <(jq '.[0].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts input.txt)

echo 'puzzle 2 example 1'
diff --unified <(jq '.[1].examples[0]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example1.txt)
echo 'puzzle 2 example 2'
diff --unified <(jq '.[1].examples[1]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example2.txt)
echo 'puzzle 2 example 3'
diff --unified <(jq '.[1].examples[2]' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts example3.txt)
echo 'puzzle 2 input'
diff --unified <(jq '.[1].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts input.txt)
