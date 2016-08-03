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
});
