
import {useEffect,useState} from 'react';

import {  getPersonalWallets, } from '../util/util';
import Layout from '../components/layout';

export default function Collection() {
  const [data, setData] = useState([]);

  
 

  useEffect(()=> {
    loadNFTS()
  }, [])

  async function loadNFTS(){
      let d=await getPersonalWallets();
      console.log(d[0][0])
    //    console.log(data)
       let arr=[]
       for(let i=0;i<d.length;i++){
        let obj={name:d[i][0],
        address:d[i][1],
      image:d[i][2],
    gallery:d[i][3]}
     data[i]=obj
       }
    console.log(data)
  }

 
  return (
    <Layout>
    <div className='flex justify-center'>
    <div style={{maxWidth: '1400px'}}>
    <div className="md:flex items-stretch justify-center ml-auto px-2  py-2 mt-2  border-gray-600">
      
      <h2 className='text-indigo-400 text-lg font-bold align-middle px-26 py-2'>Your Personal Collections of NFTs Wallet Gallery!! </h2>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-orange-500 drop-shadow-xl rounded-3xl'>
      {
        data.map((nft, i)=>(
         
          <div key={i} className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
              <img src={nft.image}  className='rounded-3xl' width={400} height={50}/>
            
            </div>
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>{
                nft.name}</p>
                
              </div>
              {/* <div style={{height:'40px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700 px-10'><b className='text-green-500'> {nft.description}</b></p>
                  <p className=' text-white bg-zinc-700'><b className='text-yellow-500'>{nft.type}</b></p>
              </div> */}
              <div className='p-4 bg-zinc-700'>
                  <p className='text-3x-1 mb-4 font-bold text-white'>{nft.address}</p>
                  <a href={nft.gallery} target="_blank">
                  <button className='w-full bg-yellow-500 text-black font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                   >Visit Gallery
                  </button>
                  </a>
                </div>
          </div>
        ))
      }
    </div>
    </div>
</div>
</Layout>
      // <footer className={styles.footer}>
      //   <a
      //     href="/"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Powered by{' '}
      //     <span className={styles.logo}>
      //       <Image src="/favicon.ico" alt="Logo" width={30} height={25} />
      //     </span>
      //   </a>
      // </footer>
  
  )
}
