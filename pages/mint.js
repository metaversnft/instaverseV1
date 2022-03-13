
import {useState} from 'react';

import { create as ipfsHttpClient } from 'ipfs-http-client';



import { useRouter } from 'next/router';
import { createProjectMarket } from '../util/util';
import Layout from '../components/layout';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

//Store Nft in IPFS
export default function Mint(){
   const [fileURL,setFileURL] = useState();
   const [formInput, updateFormInput] = useState({price:'',name:'',description:'',link:''});
   const router = useRouter();

   async function  onChange(e){
        const image = e.target.files[0];
     
        try{
        const metadata = await client.add(
            image, {
                progress: (prog) => console.log(`received: ${prog}`)
            })
        const url = `https://ipfs.infura.io/ipfs/${metadata.path}`
        setFileURL(url)
        }catch(err){
            console.log(err)
        }
   }

   async function  createMarket(){
       
       const {name,description,price,link} =formInput;
       createProjectMarket(name,description,price,link,fileURL,router)
    
        
   }



   return (
    <Layout>
    <div className='w-full max-w-lg '>
        <div className='w-1/2 flex flex-col pb-12'>
            <input
            placeholder='Name'
            className='mt-8 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, name: e.target.value})} 
            />
            <textarea
            placeholder='Description'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, description: e.target.value})} 
            />
            <input
            placeholder='Price in Eth'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, price: e.target.value})} 
            />
            
            <input
            placeholder='file link unlock after sale'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, link: e.target.value})} 
            /> 
            <input
            type='file'
            name='Project image'
            className='mt-4 text-white'
            onChange={onChange} 
            /> {
            fileURL && (
                <img className='rounded mt-4' width='350px' src={fileURL} />
            )}
            
            <button onClick={createMarket}
            className='font-bold mt-4 bg-yellow-500 text-white rounded p-4 shadow-lg'
            >
                Mint NFT Post
            </button>
        </div>
    </div>
   </Layout>
)

}



