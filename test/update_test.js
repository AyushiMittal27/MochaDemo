const assert= require('assert');
const User = require('../src/user');
const { userInfo } = require('os');


describe('Updating Records', ()=>{

    let joe;
    
    beforeEach((done)=>{
        joe = new User({name : 'Joe', likes: 0});
        joe.save()
        .then(()=>done())
    })

    function assertName(operation , done){
             operation
             .then(()=>{
                User.find({})
            }) 
            .then((users)=>{
                assert(users.length ===1)
                assert(users[0].name==='Alex')
                done();
            })
    }

    it('instance type using set n save', (done)=>{
          joe.set('name', 'Alex');  // set is used whenever you wnat to change the property of an object
          // to persisit these changes call the save method
          assertName(joe.save(), done);
    })

    it('A model instance can update', (done)=>{
         assertName(joe.update({name : 'Alex'}) , done) 
    })
    
    it('A model class can update' , (done)=>{
         assertName(User.update({name:'Joe'}, {name:'Alex'}) , done)          
    })
    
    it('A model class can update one record' , (done)=>{
         assertName(User.findOneAndUpdate({name:'Joe'}, {name:'Alex'}), done)             
    })

    it('A model class can find record with an id and update' , (done)=>{
        assertName(User.findByIdAndUpdate(id, {name:'Alex'}), done)             
    })

    it('A user can have their postcount incremented by 1' , (done)=>{
          User.update({name: 'Joe'}, {$inc: {likes: 10}}) 
          .then(()=>User.findOne({name:'Joe'}))
          .then((user)=>{
              assert(user.likes === 10)
              done()
          })       
     })

})

