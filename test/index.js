import { expect } from 'chai';
import S from '../index';
// import S from '../dist/simple-set';
// import S from '../dist/simple-set.min';

const methods = ['add', 'has', 'clear', 'forEach', 'values', 'entries'];

describe("SimpleSet", function() {
    describe("constructor", function () {
        it("should have 0 length", function () {
            expect(S.length).to.equal(0);
        });
        it("should have expected methods in the proto", function () {
            methods.forEach(name => {
               expect(typeof Set.prototype[name]).to.equal('function');
            });
        });
        it("should use the prototype", function () {
            const s = new S();
            methods.forEach(name => {
                expect(typeof s[name]).to.equal('function');
            });
        });
        it("should keep its constructor", function () {
            expect(new S().constructor.name).to.equal('Set');
        });
        it("should set proper size", function () {
            expect(new S().size).to.equal(0);
            expect(new S([]).size).to.equal(0);
            expect(new S(["a", "b", "c"]).size).to.equal(3);
            expect(new S(["a", "b", "b", "c"]).size).to.equal(3);
        });
        it("should throw TypeError if called without new", function() {
           expect(() => S()).to.throw(TypeError);
        });
    });

    describe("instance", function () {
        beforeEach(function() {
            this.s = new S(['first', 'second']);
        });
        it("should add properly", function () {
            this.s.add('second');
            this.s.add(3);
            this.s.add('fourth');
            expect(this.s.size).to.equal(4);
        });
        it("should chain", function () {
            this.s.add('second').add('fifth').add('fifth');
            expect(this.s.size).to.equal(3);
        });
        it("should check for existence", function() {
            this.s.add('second');
            this.s.add(3).add('fourth');
            expect(this.s.has('2')).to.equal(false);
            expect(this.s.has('3')).to.equal(false);
            expect(this.s.has('first')).to.equal(true);
        });
        it("should return values", function() {
            this.s.add('first');
            this.s.add(0);
            expect(this.s.values()).to.deep.equal(['first', 'second', 0]);
        });
        it("should clear", function() {
            expect(this.s.clear()).to.equal(undefined);
            expect(this.s.size).to.equal(0);
            this.s.add('first');
            expect(this.s.size).to.equal(1);
        });
        it("should loop (forEach)", function() {
            let expected = [];
            this.s.forEach(function(key, value) {
                expected.push([this.size, key, value]);
            });
            expect(expected).to.deep.equal([
                [2, 'first', 'first'],
                [2, 'second', 'second']
            ]);
        });
        it("should bind forEach", function() {
            this.s.forEach(function(key, value) {
                expect(this.hello).to.equal('world');
                expect(key).to.be.oneOf(['first', 'second']);
                expect(value).to.be.oneOf(['first', 'second']);
            }, {hello: 'world'});
        });
        it("should delete values", function() {
            expect(this.s.values()).to.deep.equal(['first', 'second']);
            expect(this.s.size).to.equal(2);
            expect(this.s.delete('kthxbai')).to.equal(false);
            expect(this.s.values()).to.deep.equal(['first', 'second']);
            expect(this.s.size).to.equal(2);
            expect(this.s.delete('first')).to.equal(true);
            expect(this.s.values()).to.deep.equal(['second']);
            expect(this.s.size).to.equal(1);
        });
        it("should return entries", function() {
            expect(this.s.entries()).to.deep.equal([
                ['first', 'first'],
                ['second', 'second']
            ]);
        });
        it("should work with Array.from", function() {
            const arr = Array.from(this.s);
            expect(arr).to.deep.equal(this.s.values());
        });
    });
});
