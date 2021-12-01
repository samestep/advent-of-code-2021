#!/usr/bin/env bash
set -x

deno run --allow-read puzzle1/code.ts example.txt
deno run --allow-read puzzle1/code.ts input.txt

deno run --allow-read puzzle2/code.ts example.txt
deno run --allow-read puzzle2/code.ts input.txt
