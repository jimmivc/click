<?php

require "bootstrap.php";

use Slim\Http\Request;
use Slim\Http\Response;

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$contenedor = new \Slim\Container($configuration);

$app = new \Slim\App($contenedor);

$app->post(
    '/app/saveEvent',
    function ($request, $response) {
        $clickerController = new App\Controllers\clickerController();
        
        $result = $clickerController->saveEvent($request);
        return $response->withJson($result);
    }
);

$app->run();