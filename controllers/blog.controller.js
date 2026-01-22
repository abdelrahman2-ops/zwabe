import { getBlogBySlug } from "../services/blog.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"



export const getAllBlogs = getAll('blog')

export const addBlog = createOne('blog')

export const getBlog = getOne('blog')

export const updateBlog = updateOne('blog')

export const deleteBlog = deleteOne('blog')





export const getBlogDetails = async (req, res, next) => {
    const { blogSlug } = req.params
    const blog = await getBlogBySlug(blogSlug)
    if (!blog) {
        return errorResponse(res, 404, 'Not blog found with this slug')
    }

    return successResponse(res, 200, 'all blog details', blog)
} 