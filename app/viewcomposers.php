<?php

/*
|--------------------------------------------------------------------------
| View Composers
|--------------------------------------------------------------------------
|
| Defining View Composers
*/

View::composer('*', function($view)
{
    // 全局 view 渲染数据绑定
    //$view->with('test', 123);
});

View::composer('news.index', function($view)
{
    // function object_fetch($object, $attr)
	// {
        // $results = array_map(function($obj)use(&$attr){return $obj->$attr; }, $object);
		// return $results;
	// }
    
    // $items = $view->news->getItems();
    // $item_ids = object_fetch($items, 'id');
    
    //$check = DB::table('news_digg')->whereUser_id(1)->whereIn('news_id', array(1))->first();
    // $array = array();
    // $array = array_add($array, $check->news_id, $check->user_id);
    // dd($array);
    // dd($item_ids);
});
