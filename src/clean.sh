#!/bin/bash

find . -type f | grep -v "node_modules" |  grep -E "(.vue.d.ts|.vue.d.ts.map|.d.ts|.d.ts.map)$" | xargs rm -f
