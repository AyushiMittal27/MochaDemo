const mongoose = require('mongoose')

mongoose.promise = global.Promise; //hey mongoose whenver yu=ou wnat to use promise , please use thsi one
// global is the default lobrary of e6 promises , just use the e6 implementation , this is what we are telling mongoose


//t runs exactly once , connect to mongo and once it is dome , run the other test
before((done)=>{

    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
    .once('open' , ()=> {done();})
    .on('error' , (error)=>{
    console.warn('Warning', error);
})


});



//hook that will be executed before the test begin
beforeEach((done)=>{

      const{user , comments , blogposts} = mongoose.connection.collections;
      users.drop(()=>{
          comments.drop(()=>{
              blogposts.drop(()=>{
                  done();
              })
          })
      });
    })