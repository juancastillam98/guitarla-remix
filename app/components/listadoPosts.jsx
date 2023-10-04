import {Post} from "~/components/post"

export default function ListadoPosts({posts}) {
  return (
    <>
        <div className={"blog"}>
            {posts.map(post =>{

                return (

                    <Post
                        key={post.id}
                        post={post.attributes}
                    />
                    )

            })}
        </div>
    </>
  )
}

