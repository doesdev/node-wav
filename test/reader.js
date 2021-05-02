/* eslint-env mocha */

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')
const assert = require('assert')
const Reader = require('../').Reader

describe('Reader', function () {
  describe('RIFF - Little-endian', function () {
    describe('1up.wav', function () {
      const fixture = path.resolve(__dirname, 'fixtures', '1up.wav')

      it('should emit a "format" event', function (done) {
        const reader = new Reader()
        reader.on('format', function (format) {
          assert.strictEqual(1, format.audioFormat)
          assert.strictEqual(1, format.channels)
          assert.strictEqual(11025, format.sampleRate)
          assert.strictEqual(8, format.bitDepth)
          assert.strictEqual(false, format.signed)
          done()
        })
        fs.createReadStream(fixture).pipe(reader).resume()
      })

      it('should emit an "end" event', function (done) {
        const reader = new Reader()
        reader.on('end', done)
        fs.createReadStream(fixture).pipe(reader).resume()
      })
    })

    describe('gameover.wav', function () {
      const fixture = path.resolve(__dirname, 'fixtures', 'gameover.wav')

      it('should emit a "format" event', function (done) {
        const reader = new Reader()
        reader.on('format', function (format) {
          // wave format
          assert.strictEqual('RIFF', this.riffId)
          assert.strictEqual(1, format.audioFormat)

          // pcm format
          assert.strictEqual('LE', format.endianness)
          assert.strictEqual(1, format.channels)
          assert.strictEqual(22050, format.sampleRate)
          assert.strictEqual(16, format.bitDepth)
          assert.strictEqual(true, format.signed)
          done()
        })
        fs.createReadStream(fixture).pipe(reader).resume()
      })

      it('should emit an "end" event', function (done) {
        const reader = new Reader()
        reader.on('end', done)
        fs.createReadStream(fixture).pipe(reader).resume()
      })
    })

    describe('M1F1-float32-AFsp.wav', function () {
      const fixture = path.resolve(__dirname, 'fixtures', 'M1F1-float32-AFsp.wav')

      it('should emit a "format" event', function (done) {
        const reader = new Reader()
        reader.on('format', function (format) {
          assert.strictEqual(3, format.audioFormat)
          assert.strictEqual(2, format.channels)
          assert.strictEqual(8000, format.sampleRate)
          assert.strictEqual(32, format.bitDepth)
          assert.strictEqual(true, format.signed)
          assert.strictEqual(true, format.float)
          done()
        })
        fs.createReadStream(fixture).pipe(reader).resume()
      })

      it('should emit an "end" event', function (done) {
        const reader = new Reader()
        reader.on('end', done)
        fs.createReadStream(fixture).pipe(reader).resume()
      })
    })

    describe('M1F1-float64-AFsp.wav', function () {
      const fixture = path.resolve(__dirname, 'fixtures', 'M1F1-float64-AFsp.wav')

      it('should emit a "format" event', function (done) {
        const reader = new Reader()
        reader.on('format', function (format) {
          assert.strictEqual(3, format.audioFormat)
          assert.strictEqual(2, format.channels)
          assert.strictEqual(8000, format.sampleRate)
          assert.strictEqual(64, format.bitDepth)
          assert.strictEqual(true, format.signed)
          assert.strictEqual(true, format.float)
          done()
        })
        fs.createReadStream(fixture).pipe(reader).resume()
      })

      it('should emit an "end" event', function (done) {
        const reader = new Reader()
        reader.on('end', done)
        fs.createReadStream(fixture).pipe(reader).resume()
      })
    })
  })

  describe('RIFX - Big-endian', function () {
    describe('gameover-rifx.wav', function () {
      const fixture = path.resolve(__dirname, 'fixtures', 'gameover-rifx.wav')

      it('should emit a "format" event', function (done) {
        const reader = new Reader()
        reader.on('format', function (format) {
          // wave format
          assert.strictEqual('RIFX', this.riffId)
          assert.strictEqual(1, format.audioFormat)

          // pcm format
          assert.strictEqual('BE', format.endianness)
          assert.strictEqual(1, format.channels)
          assert.strictEqual(22050, format.sampleRate)
          assert.strictEqual(16, format.bitDepth)
          assert.strictEqual(true, format.signed)
          done()
        })
        fs.createReadStream(fixture).pipe(reader).resume()
      })

      it('should emit an "end" event', function (done) {
        const reader = new Reader()
        reader.on('end', done)
        fs.createReadStream(fixture).pipe(reader).resume()
      })
    })
  })
})
