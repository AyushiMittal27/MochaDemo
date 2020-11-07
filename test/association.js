const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/component')
const BlogPost = require('../src/blogPost')
const { populate } = require('../src/user')

describe('Associations' , ()=>{
    
    let joe , blogPost , comment;
    beforeEach((done)=>{
          joe = new User({name :'Joe'})
          blogPost= new BlogPost({title:'Js is Great' , content: 'Yep it really is'})
          comment = new Comment({content: 'Congrats on great post'})

          joe.blogPosts.push(blogPost);
          blogPost.comments.push(comment);
          comment.user = joe;
          

          Promise.all([joe.save(), blogPost.save(), comment.save()])
          .then(()=>done())
    })

    it('saves  a relation between a user and a blogpost' , (done)=>{
        User.findOne({name : 'Joe'})
        .populate('blogPosts')
        .then((user)=>{
            assert(user.blogPosts[0].title === 'Js is Great')
            done();
        })
    })

    it('saves afull relation tree' , (done)=>{
       User.findOne({name : 'Joe'})        // it is going to find one user 
       .populate({                           
           path  : 'blogPosts',            // inside the user find the block whose property is blogposts
           populate: {
               path : 'comments',            // inside the blogposts that was fetch , find the comments property
               model : 'comment',           // which model to use
              populate:{
                  path : 'User',
                  model: 'user'
              }
            }
       })
       .then((user)=>{
           assert(user.name === 'Joe')
           assert(user.blogPosts[0].title === 'Js is Great')
           assert(user.blogPosts[0].comments[0].content === 'Congrats on great post')
           assert(user.blogPosts[0].comments[0].user.name === 'Joe')
           done()
       })
    })

})
