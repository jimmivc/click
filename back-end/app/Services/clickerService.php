<?php 

namespace App\Services;

class ClickerService {
	private $storage;
	private $isDBReady = TRUE;

	public function __construct() {
        if ($this->isDBReady) {
            $this->storage = new StorageService();
            $this->valid = new ValidationService();
        }
    }

    public function saveEvent($id_channel,$channel_name,$event_name,$id_rule,$rule_name,$id_object){
        $result = [];

        $values = [':id_channel'=>$id_channel,':channel_name'=>$channel_name,':event_name'=>$event_name,':id_rule'=>$id_rule,':rule_name'=>$rule_name,':id_object'=>$id_object];

        $query = 'INSERT into clicker_events(id_channel,channel_name,event_name,id_rule,rule_name,id_object) values(:id_channel,:channel_name,:event_name,:id_rule,:rule_name,:id_object)' ;

        $result = $this->storage->query($query,$values);

        return $result;
    }
}