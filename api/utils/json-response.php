<?php defined('DOCROOT') or die('No direct script access.');

class JSONResponse {
  static function factory($code = 200, $data = array()) {
    return new JSONResponse($code, $data);
  }

  protected $_code = 200;

  protected $_data = array();

  public function __construct($code = 200, $data = array()) {
    $this->code($code);
    $this->data($data);
  }

  public function code($code) {
    $this->_code = (int) $code;
    return $this;
  }

  public function data($data) {
    $this->_data = $data;
    return $this;
  }

  public function headers() {
    header('Content-Type: application/json');
    http_response_code($this->_code);
    return $this;
  }

  public function body() {
    return json_encode($this->_data);
  }
}
