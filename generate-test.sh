#!/bin/bash

# Check if two arguments are passed
if [ $# -ne 2 ]; then
  echo "Usage: ./generate-test.sh \"Test Name\" ObstacleID"
  exit 1
fi

# Input args
test_name="$1"
obstacle_id="$2"

# Convert test name to kebab-case for the filename
file_name=$(echo "$test_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
file_path="tests/${file_name}.spec.ts"

# Create tests directory if it doesn't exist
mkdir -p tests

# Write the boilerplate code to the file
cat <<EOF > "$file_path"
import { Constants } from "../constants/constants"
import { test } from "../base/base"
import { expect } from "@playwright/test"

const obstacleId = ${obstacle_id}

test.beforeEach(async ({ page }) => {
  await page.goto(\`\${Constants.BASE_URL}/\${obstacleId}\`)
})

test(\`${test_name} (\${obstacleId})\`, async ({ page }) => {
  await page.locator("").click()
  await expect(page.locator("//h2[.='Good job!']")).toBeVisible()
})
EOF

echo "✅ Test file generated: $file_path"