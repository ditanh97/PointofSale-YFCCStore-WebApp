import React from 'react'


export const Posts = ({tabs}) => {

    return <ul className="list-group mb-4">
        {tabs.map(tab => (
            <li key={tab.id} className="list-group-item">{tab.name}</li>
        ))}
    </ul>
}


export const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = []; 
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=> paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}

const Content = (props) => {
    const [posts, setPosts] = useState([]); //setPosts for changing method
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); //default with page no1
    const [postsPerPage, setPostsPerPage] = useState(10); //posts per page
    
    //make request
    useEffect(()=>{
        //useEffect can not be use along with promise, or async await
        const fetchPosts = async () => {
            setLoading(true);
            const jwt = getJwt();
            const res = await axios.get(GET_PRODUCTS_API, { headers: {"authorization" : jwt} })
            setPosts(res.data.result);
            setLoading(false);
        }
        fetchPosts();
    }, []) //we need to stop this infinite loop with [] that mimicking mount cycle

    //right above return make the pagination
    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination 
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate}/>
        </div>
            
    );
}
