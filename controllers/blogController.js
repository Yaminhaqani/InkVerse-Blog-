const { Blog } = require("../models/blogModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");



const getCreateBlogPage = (req,res) =>{

    res.render("createBlog")
}


const getAllBlogs = async (req,res) =>{

    const userId = req.userId
    const blogs = await Blog.find({author : userId}).lean()

    return res.render("blogsList" , {blogsARR : blogs})
}

const getBlogs = async (req,res) =>{

 
  const blogs = await Blog.find().populate('author', 'username').lean()

  return res.render("blogs" , {blogsARR : blogs})
}

const getBlogbyId = async (req,res) =>{

  const {blogId} = req.params
 
  const blog = await Blog.findById(blogId).populate('author', 'username').lean();

  return res.render("blog" , {blogTitle : blog.blogTitle , blogDesc : blog.blogDesc, blogDescShort:blog.blogDescShort, blogImageUrl:blog.blogImageUrl, category:blog.category, author:blog.author.username});
}



const createBlog = async (req, res) => {
  try {
    const userId = req.userId;


    const { blogTitle, blogDesc, blogDescShort, blogImageUrl, category } =req.body;


    if (!req.body) {
        messageHandler(res , 400 , "All Blog details Are required!")
    }
    const newBlog = await Blog.create({
      blogTitle,
      blogDesc,
      blogDescShort,
      blogImageUrl,
      category,
      author : userId
    });

    const updatedUser = await User.findById(userId);
    updatedUser.blogs.push(newBlog._id);
    await updatedUser.save();

    if(newBlog){
        messageHandler(res,200,"Blog Created Successfully")
    }else{
        messageHandler(res , 500 , "Some Error" )
    }

  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server error");
  }
};


const editBlog = async(req,res)=>{
  try {

    const {blogId} = req.params;
    const blog = await Blog.findById(blogId).lean();

    if(!blog){ 
      messageHandler(res , 404 , "Blog not found!")
    }

    res.render("editBlog",{blogArr: blog});

    
  } catch (error) {
    console.error(error);
    messageHandler(res , 500 , "Server error" );
  }
}

const updateEditBlog = async(req,res)=>{
  try {
    const userId = req.userId;
    const {blogId}= req.params;


    const { blogTitle, blogDesc, blogDescShort, blogImageUrl, category } =req.body;

    if (!blogTitle || !blogDesc || !blogDescShort || !blogImageUrl || !category) {
       messageHandler(res, 400, "All Blog details are required!");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
       messageHandler(res, 404, "Blog not found!");
    }

    if (blog.author.toString() !== userId) {
       messageHandler(res, 403, "Unauthorized action!");
    }

    blog.blogTitle = blogTitle;
    blog.blogDesc = blogDesc;
    blog.blogDescShort = blogDescShort;
    blog.blogImageUrl = blogImageUrl;
    blog.category = category;

    await blog.save();
    messageHandler(res, 200, "Blog updated successfully", blog);
    
  } catch (error) {
    console.error(error);
    messageHandler(res, 500, "Server error");
  }
}




module.exports = { createBlog  , getCreateBlogPage , getAllBlogs , getBlogs , getBlogbyId, editBlog, updateEditBlog};