app.factory('pubnub', function() {
  var pubnub;
  var channel = 'myChat';
  var creds = {
    pubKey: 'pub-c-46004153-6eb2-4bf6-aedd-163660eb6fc5', // my key
    subKey: 'sub-c-e6f1e7a4-bfd3-11e7-930d-6a99ed520776'// my key
  }

  // Initialize the PubNub API connection.

  return {
    connect: (channel, callback) => {
      if (channel) {
        pubnub = new PubNub({
          // use your own keys
          publishKey: creds.pubKey,
          subscribeKey: creds.subKey
        })
        pubnub.addListener({
          status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
              var newState = {
                new: 'connected'
              };
              pubnub.setState({
                  state: newState
                },
                function(status) {
                  // handle state setting response
                  // to being cnnected
                }
              );
            }
          },
          message: function(msg) {
            if (callback) {
              callback(msg.message);
            } else {
              console.log(msg.message);
            }
          }
        });
        pubnub.subscribe({
            //subscribe to channels
            channels:  [channel]
        });
      };
    },

  }
})
