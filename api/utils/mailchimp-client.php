<?php defined('DOCROOT') or die('No direct script access.');

/**
 * Simple Mailchimp Client
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
class MailchimpClient {

  /**
   * API key
   * @type {string}
   */
  protected $_api_key = null;

  /**
   * cURL pointer
   */
  protected $_curl;

  /**
   * @param {String} $api_key http://kb.mailchimp.com/accounts/management/about-api-keys
   */
  function __construct($api_key) {
    $this->_api_key = $api_key;
    $this->_curl = curl_init();
  }

  public function get_list_member($list_id, $email) {
    $id = md5($email);
    $url = $this->_api_origin()."/lists/{$list_id}/members/{$id}";
    return $this->_get($url);
  }

  public function update__list_member($list_id, $email, $data) {
    $id = md5($email);
    $url = $this->_api_origin()."/lists/{$list_id}/members/{$id}";
    return $this->_request($url, $data, 'PATCH');
  }

  /**
   * Subscribe user to list
   * @param {String} $list_id, e.g. b3b71bdf73
   * @param {Array} $data - array(email => 'test@email.com')
   * @return {bool}
   * @throws Exception
   */
  function subscribe($list_id, array $data) {
    $url = $this->_api_origin()."/lists/{$list_id}/members";

    $result = $this->_request($url, $data);

    return $result;
  }

  /**
   * Get origin for api calls
   * @return {String}
   */
  protected function _api_origin() {
    $data_center = explode('-', $this->_api_key)[1];

    return "https://{$data_center}.api.mailchimp.com/3.0";
  }

  protected function _request($url, $data, $method = 'POST') {
    $data = json_encode($data);

    curl_setopt($this->_curl, CURLOPT_URL, $url);
    curl_setopt($this->_curl, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($this->_curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($this->_curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->_curl, CURLOPT_HTTPHEADER, array(
      'Authorization: apikey '.$this->_api_key,
      'Content-Type: application/json',
      'Content-Length: ' . strlen($data))
    );

    return json_decode(curl_exec($this->_curl));
  }

  protected function _get($url) {
    curl_setopt($this->_curl, CURLOPT_URL, $url);
    curl_setopt($this->_curl, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($this->_curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($this->_curl, CURLOPT_HTTPHEADER, array(
      'Authorization: apikey '.$this->_api_key,
      'Content-Type: application/json'
    ));

    return json_decode(curl_exec($this->_curl), TRUE);
  }
}
