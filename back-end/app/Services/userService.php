<?php 

namespace App\Services;

class UserService {
	private $storage;
	private $isDBReady = TRUE;

	public function __construct() {
        if ($this->isDBReady) {
            $this->storage = new StorageService();
            $this->valid = new ValidationService();
        }
    }

    public function create(){
        $result = [];

        return $result;
    }
}