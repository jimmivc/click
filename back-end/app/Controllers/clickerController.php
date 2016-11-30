<?php
namespace App\Controllers;

use App\Services\clickerService;
use Slim\Http\Request;

class ClickerController {
	private $ClickerService;

    public function __construct() {
        $this->ClickerService = new ClickerService();
    }

	public function saveEvent ($request) {
        $result = [];
        $data = $request->getParsedBody();

        $id_channel = $data['id_channel'];
        $channel_name = $data['channel_name'];
        $event_name = $data['event_name'];
        $id_rule = $data['id_rule'];
        $rule_name = $data['rule_name'];
        $id_object = $data['id_object'];


       $result = $this->ClickerService->saveEvent($id_channel,$channel_name,$event_name,$id_rule,$rule_name,$id_object);

        return $result;
	}
   
}