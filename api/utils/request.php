<?php defined('DOCROOT') or die('No direct script access.');

class Request {
  protected $_post = array();

  public static function factory() {
    return new Request();
  }

  function __construct() {
    if (empty($_POST)) {
      $this->_post = json_decode(file_get_contents('php://input'), TRUE);
    }
    else {
      $this->_post = $_POST;
    }
  }

  public function post($key = NULL, $default = NULL) {
    if ($key === NULL) {
      return $this->_post;
    }

    if (!empty($key)) {
      return Arr::get($this->_post, $key, $default);
    }
  }
}
