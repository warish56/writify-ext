#!/bin/bash


# Exit immediately if a command exits with a non-zero status
set -e

# Template Environment file
TEMPLATE_ENV_FILE="../background/env.temp.js"

# Environment file
ENV_FILE="../background/env.js"





# Check if file exists
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: File '$ENV_FILE' does not exist."
  exit 1
fi

# Set the API URL based on NODE_ENV
if [[ "$NODE_ENV" == "production" ]]; then
  NEW_API_URL="https://obscure-mesa-15631-2bfd37387032.herokuapp.com"
else
  NEW_API_URL="http://localhost:8000"
fi



# Create or overwrite the output file by concatenating source files
cat "${TEMPLATE_ENV_FILE}" > "$ENV_FILE"
echo "Combined contents of source files into '$ENV_FILE'."

# Replace <API_URL> with the new API URL in the file
sed -i '' "s|<API_URL>|$NEW_API_URL|g" "$ENV_FILE"


# Notify user of successful update
echo "Successfully updated <API_URL> to '$NEW_API_URL' in '$ENV_FILE'."
