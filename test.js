var chai = require('chai'),
expect = chai.expect,
fs = require('fs'),
path = require('path')


//that works, it was just missing the callback 
//need to get directoy structure

describe('Output', function() {
it('The sentiment score has to be at least zero', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(global.finalOutputTest.to.be.at.least(0)), 2000)
		done();
		})})
});

describe('Output', function() {
it('The sentiment score has to be a number', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(finalOutput.to.be.a('Number')), 2000)
		done();
		})})
});

describe('Output', function() {
it('sentiment score should always exist', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(finalOutput.to.exist), 2000)
		done();
		})})
});

describe('Output', function() {
it('The output csv should always exist', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(fs.stat(path.join(__dirname,'\output\\sentiment.csv')).to.equal(true)), 2000)
		done();
		})})
});


describe('Input', function() {
it('stopWords should not be empty', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(stopWords.to.have.lengthOf.above(0)), 2000)
		done();
		})})
});


describe('Input', function() {
it('positiveWords should not be empty', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(positiveWords.to.have.lengthOf.above(0)), 2000)
		done();
		})})
});


describe('Input', function() {
it('negativeWords should not be empty', function(done){
	return new Promise((resolve, reject) => {
		setTimeout(() => expect(negativeWords.to.have.lengthOf.above(0)), 2000)
		done();
		})})
});


