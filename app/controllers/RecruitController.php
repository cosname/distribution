<?php

class RecruitController extends BaseController {

    /*
    |--------------------------------------------------------------------------
    | Recruit Controller
    |--------------------------------------------------------------------------
    |
    |
    */

    public function __construct(){
        $this->beforeFilter('auth', ['only' => [
            'getNew',
            'postNew',
        ]]);
    }

    public function getIndex() {
        return View::make('recruit.index');
    }

    public function getDetail($recruitId) {
        $recruit = Recruit::find($recruitId);
        return View::make('recruit.detail', compact('recruit'));
    }

    public function getNew() {
        return View::make('recruit.new');
    }

    public function postNew() {
        dd(Input::all());

        $input = [

        ];

        $rules = [

        ];
    }

}
