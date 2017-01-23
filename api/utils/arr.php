<?php defined('DOCROOT') or die('No direct script access.');

class Arr {

  /**
   * Retrieve a single key from an array. If the key does not exist in the
   * array, the default value will be returned instead.
   *
   *     // Get the value "username" from $_POST, if it exists
   *     $username = Arr::get($_POST, 'username');
   *
   *     // Get the value "sorting" from $_GET, if it exists
   *     $sorting = Arr::get($_GET, 'sorting');
   *
   * @param   array   $array      array to extract from
   * @param   string  $key        key name
   * @param   mixed   $default    default value
   * @return  mixed
   */
  public static function get($array, $key, $default = NULL) {
    if ($array instanceof ArrayObject) {
      // This is a workaround for inconsistent implementation of isset between PHP and HHVM
      // See https://github.com/facebook/hhvm/issues/3437
      return $array->offsetExists($key) ? $array->offsetGet($key) : $default;
    } else {
      return isset($array[$key]) ? $array[$key] : $default;
    }
  }
}
