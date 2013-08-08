var assert = require('assert')
  , _ = require('underscore')
  , AudioContext = require('../lib/AudioContext')
  , AudioNode = require('../lib/AudioNode')

describe('AudioContext', function() {
  
  describe('countNodes', function() {

    it('should count all the nodes connected to the context\'s destination', function() {
      //
      //    node3a node3b node3c   node3d
      //                \|/      /  \
      //                  node2a      node2b
      //                     |   \    /
      //                     node1a  node1b
      //                           \/
      //                          dest
      var context = new AudioContext
        , node1a = new AudioNode(context, 2, 1)
        , node1b = new AudioNode(context, 0, 1)
        , node2a = new AudioNode(context, 2, 2)
        , node2b = new AudioNode(context, 1, 1)
        , node3a = new AudioNode(context, 1, 1)
        , node3b = new AudioNode(context, 0, 1)
        , node3c = new AudioNode(context, 1, 2)
        , node3d = new AudioNode(context, 2, 1)
        , collected
      context._kill()

      node1a.id = '1a'
      node1b.id = '1b'
      node2a.id = '2a'
      node2b.id = '2b'
      node3a.id = '3a'
      node3b.id = '3b'
      node3c.id = '3c'
      node3d.id = '3d'

      node1a.connect(context.destination)
      node1b.connect(context.destination)

      node2a.connect(node1a, 1, 0)
      node2b.connect(node1a)

      node3a.connect(node2a)
      node3b.connect(node2a)
      node3c.connect(node2a)

      node3d.connect(node2a, 0, 1)
      node3d.connect(node2b)

      collected = context.collectNodes()
      assert.equal(collected.length, 8)
      assert.deepEqual(
        _.sortBy(collected, function(node) { return node.id }),
        [node1a, node1b, node2a, node2b, node3a, node3b, node3c, node3d])
    })
  
  })

})