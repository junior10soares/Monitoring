#!/bin/bash

echo ">>> Substituindo Parâmetros..."

parametroBase=$PARAMETROS_BASE
parametroSubstituicao=$PARAMETROS_SUBSTITUICAO

echo ">>> Parâmetros base: $parametroBase"
echo ">>> Parâmetros substituição: $parametroSubstituicao"

arrayParametroBase=( $(echo $parametroBase | tr "," "\n") )
arrayParametroSubstituicao=( $(echo $parametroSubstituicao | tr "," "\n") )

for arquivo in /usr/share/nginx/html/assets/*.js; do
    for i in "${!arrayParametroBase[@]}"; do
        echo "Substituindo ${arrayParametroBase[$i]} por ${arrayParametroSubstituicao[$i]} em $arquivo"
        sed -i "s|${arrayParametroBase[$i]}|${arrayParametroSubstituicao[$i]}|g" $arquivo
    done
done


