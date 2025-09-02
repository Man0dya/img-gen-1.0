import React, { useState, useEffect } from 'react'

import { Loader, Card , FormField  } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#8b5cf6] text-xl uppercase'>
      {title}
    </h2>
  )
}
const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className='max-w-7xl mx-auto'>

      <div>
        <h1 className='font-extrabold text-[#333333] text-[32px]'>
          AI Art Gallery
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Explore a vibrant collection of imaginative images created by our community with DALL-E AI. Share your creations and draw inspiration from others.
        </p>
      </div>

      <div className='mt-16'>
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#333333]'>{searchText}</span>:
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={allPosts?.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))}
                  title='No search results found'
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title='No posts found'
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
