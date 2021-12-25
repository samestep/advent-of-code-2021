#!/usr/bin/env bash
set -e

echo 'puzzle 1'
diff --unified <(jq '.[0].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle1.ts input.txt)

echo 'puzzle 2'
diff --unified <(jq '.[1].input' output.json) \
  <(NO_COLOR=1 deno run --allow-read puzzle2.ts input.txt)
