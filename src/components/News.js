import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default function News(props) {


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
// Not a good habit to expose url or backend calls use .env files
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
        const fetchData = async () => {
            setLoading(true);
            let url = `https://newsappbackendproxy.onrender.com/api/news?country=${props.country}&category=${props.category}&page=1&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults); //See the comment below
//             This parsedData object contains:
            // {
            //   status: "ok",
            //   totalResults: 38,   // <-- This!
            //   articles: [ ... ]
            // }
            setLoading(false);
        };
        fetchData();
    }, [props.country, props.category, props.pageSize]);

    



    const handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsappbackendproxy.onrender.com/api/news?country=${props.country}&category=${props.category}&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setPage(page - 1);
        setArticles(parsedData.articles);
        setTimeout(() => setLoading(false), 1000);
    };

    const handleNextClick = async () => {
        console.log("Next");
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
             alert("No more data available.");
        } else {
            let url = `https://newsappbackendproxy.onrender.com/api/news?country=${props.country}&category=${props.category}&page=${page + 1}&pageSize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            setPage(page + 1);
            setArticles(parsedData.articles);
            setTimeout(() => setLoading(false), 1000);
        }
    };


  return (
    <>
        <div className='container my-3' >
           <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
           {loading&&<Spinner></Spinner>}
            <div className='row'>
            {articles.map((element) => {
                return (
                    <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0,45) : "No Title"} description={element.description ? element.description.slice(0, 88) : "No description available"} url={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source}></NewsItem>
                    </div>
                );
            })}
            </div>
            <div className="container d-flex justify-content-between">
                <button  type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
            
            
        </div>
        
    </>
  )
}

//Limit off Set
// import React, { useEffect, useState } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';

// export default function News(props) {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1); // page = (offset / limit) + 1
//   const [totalResults, setTotalResults] = useState(0);

//   const limit = props.pageSize;
//   const offset = (page - 1) * limit;

//   const fetchData = async (currentPage) => {
//     setLoading(true);
//     const limit = props.pageSize;
//     const offset = (currentPage - 1) * limit; // simulate offset
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${currentPage}&pageSize=${limit}`;

//     const data = await fetch(url);
//     const parsedData = await data.json();
//     console.log(`Page: ${currentPage}, Offset: ${offset}`);
//     console.log(parsedData);

//     setArticles(parsedData.articles);
//     setTotalResults(parsedData.totalResults);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData(1);
//   }, [props.country, props.category, props.pageSize]);

//   const handlePrevClick = () => {
//     if (page > 1) {
//       const newPage = page - 1;
//       setPage(newPage);
//       fetchData(newPage);
//     }
//   };

//   const handleNextClick = () => {
//     if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
//       const newPage = page + 1;
//       setPage(newPage);
//       fetchData(newPage);
//     }
//   };

//   return (
//     <div className='container my-3'>
//       <h2 className='text-center'>News App - Top Headlines</h2>
//       {loading && <Spinner />}
//       <div className='row'>
//         {articles.map((element) => (
//           <div className="col-md-4" key={element.url}>
//             <NewsItem
//               title={element.title ? element.title.slice(0, 45) : "No Title"}
//               description={element.description ? element.description.slice(0, 88) : "No description available"}
//               url={element.urlToImage}
//               newsUrl={element.url}
//               author={element.author}
//               date={element.publishedAt}
//               source={element.source?.name || "Unknown"}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="container d-flex justify-content-between">
//         <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
//         <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
//       </div>
//     </div>
//   );
// }
