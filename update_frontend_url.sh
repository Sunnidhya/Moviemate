#!/bin/bash

# Fetch the ngrok URL from the API
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

# Check if the URL was fetched successfully
if [ -z "$NGROK_URL" ]; then
  echo "Failed to fetch ngrok URL"
  exit 1
fi

echo "Ngrok URL: $NGROK_URL"

# Update the backendUrl in the frontend code
FRONTEND_FILE="./MoviemateProject/Moviematebody.js"

# Replace the backendUrl with the ngrok URL
sed -i "s|const backendUrl = 'http://localhost:5000';|const backendUrl = '$NGROK_URL';|" "$FRONTEND_FILE"

echo "Updated frontend with ngrok URL"

# Optionally restart the frontend service if needed
docker-compose restart frontend
