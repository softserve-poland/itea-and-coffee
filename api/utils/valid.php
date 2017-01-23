<?php defined('DOCROOT') or die('No direct script access.');

function _is_ascii($str) {
  if (is_array($str)) {
    $str = implode($str);
  }
  return ! preg_match('/[^\x00-\x7F]/S', $str);
}


function _strlen($str) {
  if (_is_ascii($str))
    return strlen($str);

  return strlen(utf8_decode($str));
}

class Valid {

  /**
   * Checks if a field is not empty.
   *
   * @return  boolean
   */
  public static function not_empty($value)
  {
    if (is_object($value) AND $value instanceof ArrayObject) {
      // Get the array from the ArrayObject
      $value = $value->getArrayCopy();
    }

    // Value cannot be NULL, FALSE, '', or an empty array
    return ! in_array($value, array(NULL, FALSE, '', array()), TRUE);
  }

  /**
   * Check an email address for correct format.
   *
   * @link  http://www.iamcal.com/publish/articles/php/parsing_email/
   * @link  http://www.w3.org/Protocols/rfc822/
   *
   * @param   string  $email  email address
   * @param   boolean $strict strict RFC compatibility
   * @return  boolean
   */
  public static function email($email, $strict = FALSE) {
    if (_strlen($email) > 254) {
      return FALSE;
    }
    if ($strict === TRUE) {
      $qtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
      $dtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
      $atom  = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
      $pair  = '\\x5c[\\x00-\\x7f]';
      $domain_literal = "\\x5b($dtext|$pair)*\\x5d";
      $quoted_string  = "\\x22($qtext|$pair)*\\x22";
      $sub_domain     = "($atom|$domain_literal)";
      $word           = "($atom|$quoted_string)";
      $domain         = "$sub_domain(\\x2e$sub_domain)*";
      $local_part     = "$word(\\x2e$word)*";
      $expression     = "/^$local_part\\x40$domain$/D";
    }
    else {
      $expression = '/^[-_a-z0-9\'+*$^&%=~!?{}]++(?:\.[-_a-z0-9\'+*$^&%=~!?{}]+)*+@(?:(?![-.])[-a-z0-9.]+(?<![-.])\.[a-z]{2,6}|\d{1,3}(?:\.\d{1,3}){3})$/iD';
    }

    return (bool) preg_match($expression, (string) $email);
  }
}
