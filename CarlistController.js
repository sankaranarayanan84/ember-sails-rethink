/**
 * CarlistController
 *
 * @description :: Server-side logic for managing carlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var thinky = require('thinky')();
var r = thinky.r;
module.exports = {
	


  /**
   * `CarlistController.listcar()`
   */
  listcar: function (req, res) {
  //r = thinky.r;
  r.db('carsondeals').table('Car').run().then(function(result){
 	return res.json({
      'car': result
    });
  },function(err){
	console.log('error')
	console.log(err);
  })
   
  },
  getcar : function(req, res){
 // r = thinky.r; 
  var carid = req.param('car_id');
  console.log(carid);
  r.db('carsondeals').table('Car').filter(function(item){ return item('id').eq(parseInt(carid)); }).run().then(function(result){
	console.log(result);
	return res.json({
      'car': result
    });
  },function(err){
	console.log(err);
  })
  
  },
  updatecar: function(req,res){
	var rawobj = req.params.all().car;
	rawobj.id = parseInt(req.params.all().car_id);
	r.db('carsondeals').table('Car').insert(rawobj,{conflict:'replace'}).run().then(function(result){
	},function(err){
		console.log('error');
		console.log(err);
	});
  },
  addcar: function(req, res){
	var cnt = r.db('carsondeals').table('Car')('id').max().run().then(function(result){
		console.log(result);
		var id = parseInt(result)+1;
		var rawobj = req.params.all().car;
		rawobj.id = id;
		r.db('carsondeals').table('Car').insert(rawobj).run().then(function(result){
			console.log('success')
			console.log(result);
			return res.json({
			'car':result
			});
		},function(err){
			console.log('err');
		})
	});
	
	
  }
};

