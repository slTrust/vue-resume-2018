{
    var APP_ID = 'ghEwd4inPtAo95a2YlxgHfyb-gzGzoHsz';
    var APP_KEY = 'X5ebA2jizXj0Jp9nyCQUu9Ke';

    AV.init({
    appId: APP_ID,
    appKey: APP_KEY
    });
    console.log(AV)

    // var TestObject = AV.Object.extend('TestObject');
    // var testObject = new TestObject();
    // testObject.save({
    // words: 'Hello World!'
    // }).then(function(object) {
    // alert('LeanCloud Rocks!');
    // })
}