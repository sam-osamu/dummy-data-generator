#!/bin/bash

find . -type f | grep -E "(.vue.d.ts|.vue.d.ts.map|.d.ts|.d.ts.map)$" | xargs rm -f
