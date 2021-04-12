const server = require('../server');
const request = require('supertest');
const express = require('express');
var assert = require('assert');
var result = '';
const { json } = require('express');

const app = express();

describe('GET /api/encrypt', function() {
    it('retrieves encrypted text wrapped in json', function(done) {
      request(server)
        .get('/api/encrypt/my text')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
            assert.deepStrictEqual(res.body.Input, "my text");
            assert.deepStrictEqual(res.body.Status, "success");
            assert.deepStrictEqual(res.body.Message, "");
           })
           .end(function(err, res){
            if (err) return done(err);
            done();
          });
    });
  });

  describe('GET /api/decrypt', function() {
    it('retrieves decrypted text wrapped in json', function(done) {
      request(server)
        .get('/api/decrypt/U2FsdGVkX1%2F1G7zGzA+GJXk0%2F4o25LaRraegqMBqRzY=')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
            assert.deepStrictEqual(res.body, JSON.parse(JSON.parse(JSON.stringify(`{
                "Input": "U2FsdGVkX1/1G7zGzA+GJXk0/4o25LaRraegqMBqRzY=",
                "Output": "my text",
                "Status": "success",
                "Message": ""
                }`, null, 3))))
           })
           .end(function(err, res){
            if (err) return done(err);
            done();
          });
    });
  });

  describe('GET /api/health', function() {
    it('is healthy', function(done) {
      request(server)
        .get('/api/health')
        .expect(200)
           .end(function(err, res){
            if (err) return done(err);
            done();
          });
    });
  });



