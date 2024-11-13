import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import axios from "axios";

interface Post {
  _id: string,
  name: string,
  prompt: string,
}

interface RenderCardsProps {
  data : Post[],
  title : string,
}

const RenderCards : React.FC<RenderCardsProps> = ({data, title}) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post}/>)
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
}


const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number | null >(null);

  useEffect(()=>{
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const {data} = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/v1/post`);

        if(data?.success){
          setAllPosts(data?.posts.reverse());
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    fetchPosts();
  },[]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout!);

    setSearchText(e.target.value);

    setSearchTimeout(
      window.setTimeout(() => {
      const searchResults = allPosts?.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

      setSearchedResults(searchResults);

      
    }, 500)
  );
  }

  return (
    <section>
      <div>
         <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
         <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>
      <div className="mt-16">
         <FormField 
           labelName={'search posts'}
           type={'text'}
           name={'text'}
           placeholder={'search posts'}
           value={searchText}
           handleChange={handleSearchChange}
           isSurpriseMe
           handleSurpriseMe={''}
         />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3"> showing results for <span className="text-[#222328]">{searchText}</span></h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchText ? (
              <RenderCards
                data={searchedResults} 
                title={'No search results found'}
              />
            ) : (
              <RenderCards 
              data={allPosts}
              title={'No posts found'}
              />
            )}

          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home