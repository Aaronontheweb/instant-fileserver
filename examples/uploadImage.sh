#!/bin/sh

# Shell script written by Aaron Stannard - designed to do a multi-part FORM post with an image and upload it to IFS

FILE="unhappy-cat.jpg"
TYPE="image/jpeg"

curl -F "filename=$FILE;$TYPE;" -F "name=$FILE" -F "image=@$FILE" http://localhost:1337/destination-file.jpeg