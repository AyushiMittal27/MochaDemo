const assert = require('assert');
const User = require('../src/user');


describe('Creating Records' , ()=>{
      it('saves a user', (done)=>{
          const joe= new User({name : 'Joe'})
          joe.save()
          .then(()=>{
              // has Joe been saved succesfully ??
              assert(joe.isNew);
              done();
          });

      });
});