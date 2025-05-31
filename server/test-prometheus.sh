#!/bin/bash

URL="localhost:8081/api/v1/accounts" # Thay đổi URL này cho phù hợp

for i in {1..1000}
do
  curl -s -o /dev/null -w "Request $i: HTTP %{http_code}\n" "$URL" &
done

wait
echo "Đã gửi xong 1000 request song song!"