#!/bin/bash

# 创建新的翻译文章的脚本

if [ -z "$1" ]; then
  echo "用法: ./new_translation.sh \"文章标题\" [cover_image_path]"
  echo "示例: ./new_translation.sh \"DDIA Chapter 3\" \"/assets/images/cover-ddia.jpeg\""
  exit 1
fi

TITLE="$1"
COVER="${2:-}"
DATE=$(date +"%Y-%m-%d %H:%M %z")
FILENAME=$(date +"%Y-%m-%d")-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g').md

# 创建文章文件
cat > "_posts/$FILENAME" << EOF
---
layout: translation
title: "$TITLE"
tag: [translation]
date: $DATE
cover: $COVER
description: 
why_link: 
review_link: 
---

## 

EOF

echo "✅ 翻译文章已创建: _posts/$FILENAME"
echo "📝 请编辑文件并填写 description, why_link, review_link 等字段"

