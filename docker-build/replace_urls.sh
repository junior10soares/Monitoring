#!/bin/bash

echo ">>> Substituindo URLs..."

url_original="$URL_API_ORIGINAL"
url_nova="$URL_API_NOVA"

echo "URL original: $url_original"
echo "URL nova: $url_nova"

# Loop pelos arquivos .js na pasta
for arquivo in /usr/share/nginx/html/assets/*.js; do
    # Verifica se o arquivo é realmente um arquivo .js
    if [ -f "$arquivo" ]; then
        # Realiza a substituição usando sed e salva no mesmo arquivo
        sed -i "s|${url_original}|${url_nova}|g" "$arquivo"
        echo "Substituído em ${arquivo}"
    fi
done
