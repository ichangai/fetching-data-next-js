
const Post = ({ post }) => {
    return (
        <>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
        </>
    )
}

export default Post

export const getStaticPaths = async() => 
{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()

    const paths = posts.map(post => {
        return {
            params: {
                postId: `${post.id}`
            }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async(context) => 
{
    const {params} = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const post = await response.json()
    return {
        props: { post: post }
    }
}