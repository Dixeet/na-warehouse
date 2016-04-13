<?php
/**
 * Created by PhpStorm.
 * User: robin
 * Date: 13/04/16
 * Time: 11:04
 */
include 'config.php';
include 'Request.php';
function getRequestParameter()
{
    $params = [];
    if (!empty($_GET)) {
        $params = $_GET;
    }
    return $params;
}

function postToDb($params, $config)
{
    if (!empty($params) && !empty($params['pseudo']) && !empty($params['infos'])) {
        $req = new Request();
        $data = [];
        $data[$config['form']['pseudoField']] = $params['pseudo'];
        $data[$config['form']['infosField']] = $params['infos'];
        $req->post($config['form']['url'], [], ['Content-Type: application/x-www-form-urlencoded'], http_build_query($data));
    }
}

$params = getRequestParameter();
postToDb($params, $config);
$toto = 'tata';