#!/usr/bin/env bash
set -x

deno run --allow-read puzzle1.ts example.txt
deno run --allow-read puzzle1.ts input.txt

deno run --allow-read puzzle2.ts example.txt
deno run --allow-read puzzle2.ts input.txt
