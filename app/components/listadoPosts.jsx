import {Post} from "./post";

export  function ListadoPosts({posts}) {
  return (
    <>
        {posts.length  && (
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
        )}

    </>
  )
}

