#!/bin/bash

FOLDER_NAME="ext_build"
OUTPUT_DIR="../../$FOLDER_NAME"

ASSETS_DIR="../assets"
WORKER_DIR="../background"
MANIFEST_DIR="../manifest.json"

CONTENT_SCRIPT_DIR="./dist"



if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo "Build Directory created."
else
    echo "Build Directory already exists."
fi


echo "Clearing contents of destination directory: $OUTPUT_DIR"
rm -rf "$OUTPUT_DIR"/*



echo "Copying assets"
cp -r "$ASSETS_DIR" "$OUTPUT_DIR"

echo "Copying service worker"
cp -r "$WORKER_DIR" "$OUTPUT_DIR"

echo "Copying content script"
mkdir -p "$OUTPUT_DIR/content/"
cp -r "$CONTENT_SCRIPT_DIR" "$OUTPUT_DIR/content"

echo "Copying manifest"
cp  "$MANIFEST_DIR" "$OUTPUT_DIR"

