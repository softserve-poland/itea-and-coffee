<?php defined('DOCROOT') or die('No direct script access.');

class Cache {

  public static function cache_file($key) {
    return DOCROOT.'cache'.DIRECTORY_SEPARATOR.$key;
  }

  public static function set($key, $value) {
    $cache_file = self::cache_file($key);

    file_put_contents($cache_file, json_encode($value), LOCK_EX);

    return $value;
  }

  public static function get($key, $default = NULL) {
    if (self::has($key)) {
      return json_decode(file_get_contents(self::cache_file($key)));
    }

    return $default;
  }

  public static function has($key) {
    $cache_file = self::cache_file($key);

    return (file_exists($cache_file) && (filemtime($cache_file) > (time() - 60 * 5 )));
  }
}
