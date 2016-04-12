<?php
/**
 * Created by PhpStorm.
 * User: Robin
 * Date: 12/04/2016
 * Time: 23:45
 */

$config = [
    'form' => [
        'url' => "https://docs.google.com/forms/d/1WrwwySF5lTweADvVV72fHex03Br3_sc2HIDjqLfa1nw/formResponse",
        'pseudoField' => "entry.673566190",
        'infosField' => "entry.571865672"
    ],
    'csv' => [
        'url' => "https://docs.google.com/spreadsheets/d/1jFQNMjbZZWsqqOZTP2HuUPGujgpFbJVgOVCox4ija28/pub?gid=691791079&single=true&output=csv"
    ]
];
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_AUTOREFERER, true);
curl_setopt($curl, CURLOPT_URL, $config['csv']['url']);
//curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$resp = array(curl_exec($curl), curl_getinfo($curl, CURLINFO_HTTP_CODE));
curl_close($curl);
var_dump($resp);