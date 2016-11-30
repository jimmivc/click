<?php 

namespace App\Services;

class ValidationService {
	function validString($string) {
        if (isset($string)) {
            $trimmed = trim($string);

            if (strlen($trimmed) > 0) {
                return true;
            }
        }

        return false;
    }
}