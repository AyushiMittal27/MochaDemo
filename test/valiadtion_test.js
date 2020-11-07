const asser = require('assert')
const User = require('../src/user');
const { assert } = require('console');


describe('Validating records', ()=>{
     
    it('requires a user name', ()=>{
          const user = new User({name : undefined});
          const validationResult =user.validateSync();
          const {message} = validationResult.errors.name
          assert(message==='Name is required.')
          
    })

    it('requires a user\'s name longer than 2 character', ()=>{
        const user = new User({name :'Al'})
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name
        assert(message==='Name must be longer than 2 characters.')
    })

    it('disallows a record from being saved' , (done)=>{
        const user = new User({name : 'Al'})
        user.save()
        .catch((validationResult)=>{
           const {message} = validationResult.errors.name
           assert(message === 'Name must be longer than 2 characters.')
           done()
        })
    })
})