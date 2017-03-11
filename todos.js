Template.todos.list = function(){
    return Lists.findOne({_id:Session.get('listid')});
};

Template.todos.todolist = function(){
    return Todos.find({listid:Session.get('listid')});
};

Template.todos.events({
    'keyup .todotext':function(evt,tmpl){
        if(evt.which == 13){
            alert('Enter No. Of Books');
        }
    },
    'keyup .bcount':function(evt,tmpl){
        if(evt.which == 13){
            var isbn = tmpl.find('.isbn').value;
            var todotext = tmpl.find('.todotext').value;
            var author = tmpl.find('.author').value;
            var price = parseFloat(tmpl.find('.price').value);
            var bcount = parseFloat(tmpl.find('.bcount').value);
            var issued = 0;
            Todos.insert
			({isbn:isbn,todotext:todotext,listid:Session.get('listid'),
			author:author,price:price,count:bcount,issued:issued});
            tmpl.find('.isbn').value = "";
            tmpl.find('.todotext').value = "";
            tmpl.find('.author').value = "";
            tmpl.find('.price').value = "";
            tmpl.find('.bcount').value = "";
        }
    }
});



Template.todolistitem.editing_todo = function(){
    return Session.get('editing_todo');
};

Template.todolistitem.events({
    'click .removetodo':function(evt, tmpl){
        evt.preventDefault();
        Todos.remove({_id:this._id});
    },
    'dblclick .todoitemtext':function(evt,tmpl){
        Session.set('editing_todo',true);
    },
    'dblclick .authoritemtext':function(evt,tmpl){
        Session.set('editing_todo',true);
    },
    'dblclick .priceitemtext':function(evt,tmpl){
        Session.set('editing_todo',true);
    },
    'keyup .todotext2':function(evt,tmpl){
        if(evt.which == 13){
            var todotexts = tmpl.find('.todotext2').value;
            var todotexts3 = tmpl.find('.todotext3').value;
            var todotexts4 = parseFloat(tmpl.find('.todotext4').value);
            Todos.update
			(this._id,{$set:{todotext:todotexts,listid:Session.get('listid'),
			author:todotexts3,price:todotexts4}});
            Session.set('editing_todo',false);
        }
    },
    'keyup .todotext3':function(evt,tmpl){
        if(evt.which == 13){
            var todotexts = tmpl.find('.todotext2').value;
            var todotexts3 = tmpl.find('.todotext3').value;
            var todotexts4 = parseFloat(tmpl.find('.todotext4').value);
            Todos.update
			(this._id,{$set:{todotext:todotexts,listid:Session.get('listid'),
			author:todotexts3,price:todotexts4}});
            Session.set('editing_todo',false);
        }
    },
    'keyup .todotext4':function(evt,tmpl){
        if(evt.which == 13){
            var todotexts = tmpl.find('.todotext2').value;
            var todotexts3 = tmpl.find('.todotext3').value;
            var todotexts4 = parseFloat(tmpl.find('.todotext4').value);
            Todos.update
			(this._id,{$set:{todotext:todotexts,listid:Session.get('listid'),
			author:todotexts3,price:todotexts4}});
            Session.set('editing_todo',false);
        }
    },
    'click .check':function(evt,tmpl){
        evt.preventDefault();
        Todos.update(this._id,{$set:{done:!this.done}});
    },
    'click .bissued':function(evt,tmpl){
        Todos.update(this._id,{$inc:{count: -1}});
        Todos.update(this._id,{$inc:{issued: 1}});
    },
    'click .counter':function(evt,tmpl){
        Todos.update(this._id,{$inc:{count: 1}});
        Todos.update(this._id,{$inc:{issued: -1}});
    }
});