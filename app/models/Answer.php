<?php

class Answer extends Eloquent {

    protected $table = 'answer';

    protected $guarded = array(
        'id',
    );

    public static function boot() {
        parent::boot();
        
        static::creating(function($answer) {
        
            $topic = Topic::create([]);
            $answer->topic_id = $topic->id;

            $question = Question::find($answer->question_id);
            $question->answer_count += 1;
            $question->save();
            
        });
    }

    // setter: markdown
    public function setMarkdownAttribute($value) {
        $parsedown = App::make('parsedown');
        $this->attributes['markdown'] = $value;
        $this->attributes['content'] = $parsedown->text($value);
    }

    // relation: user
    public function question() {
        return $this->belongsTo('Question', 'question_id');
    }

    // relation: user
    public function user() {
        return $this->belongsTo('User', 'user_id');
    }

    // relation: topic
    public function topic() {
        return $this->belongsTo('Topic', 'topic_id');
    }

}