<?php defined('DOCROOT') or die('No direct script access.');

/**
 * Simple Mailchimp Client
 * @author Andrew Fedyk <https://github.com/fedyk>
 */
class InstagramClient {

  protected $_access_token = null;

  protected $_curl;

  public function __construct($access_token) {
    $this->_access_token = $access_token;
    $this->_curl = curl_init();
  }

  public function get_user_photos($user_id) {
    $cache_key = md5($user_id);
    $url = "https://api.instagram.com/v1/users/{$user_id}/media/recent?access_token={$this->_access_token}&count=10";

    if (Cache::has($cache_key)) {
      return Cache::get($cache_key);
    }
    else {
      return Cache::set($cache_key, $this->_get($url));
    }
  }

  protected function _get($url) {
    curl_setopt($this->_curl, CURLOPT_URL, $url);
    curl_setopt($this->_curl, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($this->_curl, CURLOPT_RETURNTRANSFER, true);
    return json_decode(curl_exec($this->_curl), TRUE);
  }
}
