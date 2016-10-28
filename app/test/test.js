'use strict';

var request = require('supertest');
var server = require('../app').server;
var settings = require('../settings');

describe('API test', function(){

	describe('GET /', function(){
		it('nothing to serve nor test', function(){
			request(server).get('/').expect(404);
		})
	});

  describe('GET /api/v1/dummy', function(){
    it('dummy unauth getter', function(){
      request(server).get('/api/v1/dummy/').expect(404);
    })
  });


});
