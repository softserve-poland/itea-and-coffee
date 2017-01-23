<?php

// Define Docroot of app
define('DOCROOT', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR);

// Require helpers
require DOCROOT.'utils/arr.php';
require DOCROOT.'utils/request.php';
require DOCROOT.'utils/cache.php';
require DOCROOT.'utils/instagram-client.php';
require DOCROOT.'utils/json-response.php';

// Config
$config = require DOCROOT.'config/instagram.php';

$instagram = new InstagramClient($config['access_token']);

// Get request object
$request = Request::factory();

// Factory json response
echo JSONResponse::factory()
  ->code(200)
  ->data($instagram->get_user_photos($config['user_id']))
  ->headers()
  ->body();
