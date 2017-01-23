<?php

// Define Docroot of app
define('DOCROOT', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR);

// Require helpers
require DOCROOT.'utils/arr.php';
require DOCROOT.'utils/valid.php';
require DOCROOT.'utils/request.php';
require DOCROOT.'utils/mailchimp-client.php';
require DOCROOT.'utils/json-response.php';

// Config
$mailchimp = require DOCROOT.'config/mailchimp.php';

// Mailchimp client
$client = new MailchimpClient($mailchimp['api_key']);

// Get request object
$request = Request::factory();

// Factory json response
$response = JSONResponse::factory();

// Validate
$email_address = $request->post('email_address');

if (!Valid::not_empty($email_address) OR !Valid::email($email_address)) {
  echo $response
    ->code(403)
    ->data(array('status' => FALSE, 'error' => 'Invalid email address'))
    ->headers()
    ->body();

  return;
}

// Check if email is present in mailchimp list
$member = $client->get_list_member($mailchimp['list_id'], $email_address);
$member_id = Arr::get($member, 'id');
$member_status = Arr::get($member, 'status');

// Everything is ok, just success response
if ($member_id && $member_status === 'subscribed') {
  $response->code(200)->data(array('status' => true));
}
// Just update exsisted member
elseif ($member_id && $member_status !== 'subscribed') {
  $client->update_member($mailchimp['list_id'], $email_address, array(
    "email_address" => $email_address,
    "status"        => "subscribed"
  ));

  $response->code(200)->data(array('status' => true));
}
// Subscribe new user
else {
  $client->subscribe($mailchimp['list_id'], array(
    'status'         => 'subscribed',
    'email_address'  => $email_address
  ));

  $response->code(200)->data(array('status' => true));
}

echo $response->headers()->body();
