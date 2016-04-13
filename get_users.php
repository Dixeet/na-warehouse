<?php
/**
 * Created by PhpStorm.
 * User: Robin
 * Date: 12/04/2016
 * Time: 23:45
 */

include 'Request.php';

include 'config.php';
function CsvToJson($csv)
{
    $dataArray = array_map("str_getcsv", explode("\n", $csv));
    $fieldsName = $dataArray[0];
    $csvArray = [];
    foreach ($dataArray as $idx => $data) {
        if ($idx > 0) {
            $csvArray[] = [];
            foreach ($data as $index => $value) {
                $csvArray[$idx - 1][$fieldsName[$index]] = $value;
            }
        }
    }
    return json_encode($csvArray);
}
$req = new Request($config['csv']['url']);
$resp = $req->get();
$data = [];
$data[$config['form']['pseudoField']] = 'php';
$data[$config['form']['infosField']] = 'hemp=2,toto=1';
//$postit = $req->post($config['form']['url'], [], ['Content-Type: application/x-www-form-urlencoded'], http_build_query($data));

echo(CsvToJson($resp[0]));