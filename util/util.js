
import { nftAddress,marketPlaceAddress } from '../config';

// import { Framework } from "@superfluid-finance/sdk-core";
let secret = require("../secret.json")
import swal from 'sweetalert';
import nft from '../artifacts/contracts/NFT.sol/NFT.json'
import mp from '../artifacts/contracts/MarketPlace.sol/MarketPlace.json'
import {ethers, Wallet,providers} from 'ethers'
import { connect } from "@textile/tableland";
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


export const getAvatar=async(address)=>{
    let add= address===null?await getSignerAddress():address
    return generator.generateRandomAvatar(add)
}

//load Rpc Provider like InFura,alchemy, geth,ganache
export const getRPCProvider=async()=>{
    return  new ethers.providers.JsonRpcProvider(secret.url)
    
}


export const getTableConnect=async()=>{
    let provider = new providers.JsonRpcProvider(secret.url);    
    const wallet = new Wallet(secret.privatekey);
    const signer = wallet.connect(provider);
    return await connect({ network: "testnet", signer });
}
//load NFT contract from deployed blockchain
export const loadNFTContract=async()=>{
    let provider =await getRPCProvider()
    return new ethers.Contract(nftAddress,nft.abi,provider);
}

//load Marketplace contract from deployed blockchain
export const loadMarketPlaceContract=async()=>{
    let provider =await getRPCProvider()
    return new ethers.Contract(marketPlaceAddress,mp.abi,provider)
}

//load web3 provider from browser like metmask
export const getWeb3Provider=async()=>{
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()    
   return new ethers.providers.Web3Provider(connection)
}

//get signer :connected wallet 
export const getSigner=async()=>{
   return (await getWeb3Provider()).getSigner()
}

export const getMPContract=async()=>{
    let provider =await getSigner()
    return new ethers.Contract(marketPlaceAddress,mp.abi,provider)
}

export const getNFTContract=async()=>{
    let provider =await getSigner()
    return new ethers.Contract(nftAddress,nft.abi,provider)
}

export const formatValue=(value)=>{
   return  ((value * 100) / 100).toFixed(5);
}

//get ether balance of connected wallet
export const getSignerEtherBalance=async()=>{
    // let ebalance = ethers.utils.formatUnits(await(await getSigner()).getBalance());
   return formatValue(ethers.utils.formatUnits(await(await getSigner()).getBalance()))
}

//get ether address of connected wallet
export const getSignerAddress=async()=>{
    return await (await getSigner()).getAddress()
}

export const insertProfile=async (address, username,chain)=>{
    let url= await generator.generateRandomAvatar(address);
    let tbl = await getTableConnect();
   
    await tbl.query(`INSERT INTO userprofile_426 (address, profile_img,username,chain) VALUES ('${address}', '${url}','${username}','${chain}');`);
    return true;
}

export const insertFollower=async (nft_address,title,image)=>{
    let tbl = await getTableConnect();
    let address = await getSignerAddress()
   
    await tbl.query(`INSERT INTO user_follow_427 (address,nft_address,nft_title,nft_image) VALUES  ('${address}', '${nft_address}','${title}','${image}');`);
    return true;
}


export const selectFollower=async (nft_address,title,image)=>{
    let tbl = await getTableConnect();
    let address = await getSignerAddress()
   
    let value =await tbl.query(`SELECT * FROM user_follow_427 WHERE address= '${address}';`);
    return value.data.rows;
}


export const getProfile =async()=>{
    let tbl = await getTableConnect()
    let address = await getSignerAddress();
    
    let value = await tbl.query(`SELECT * FROM userprofile_426  WHERE address ='${address}';`)
    
    return value.data.rows

}


export const getClubs =async()=>{
    let tbl = await getTableConnect()   
    
    let value = await tbl.query(`SELECT * FROM clubs_443;`)
    
    return value.data.rows

}

export const getPersonalWallets =async()=>{
    let tbl = await getTableConnect()   
    
    let value = await tbl.query(`SELECT * FROM personal_451;`)
    
    return value.data.rows

}


export const createSkillMarket=async(name,skills,price,skillscore,testId,router)=>{
    let address = await getSignerAddress();

    let url = await generator.generateRandomAvatar(address+testId+skills+skillscore)    
    if(!name||!price||!skills||!url||!skillscore||!testId) return
    //upload to IPFS
     const data = JSON.stringify({
         name,testId,skills,skillscore,image:url
     })
     try{
         const metadata = await  client.add(data)
         const url = `https://ipfs.infura.io/ipfs/${metadata.path}`
         // run a function that creates sale and passes in the url 
         createSkillData(url,price,router,false)
         }catch(err){
             console.log(err)
         }
     
}


 export const  createSkillData=async(url,amount,router,project)=>{
    await loadNFTContract()

     //create a token
     let contract = await getNFTContract()
    
     let transaction = await contract.mintToken(url)
     let tx = await transaction.wait()
     swal("Submitedd!", "Minting in progress", "info");
     let event = tx.events[0]
     let value = event.args[2]
   
     let tokenId = value.toNumber()
     const price = ethers.utils.parseUnits(amount,'ether')

     //list on marketplace
     contract = await getMPContract();
     let listingPrice = contract.getListingPrice();
     //listingPrice = listingPrice.toString();
     console.log(listingPrice)
     transaction = await contract.createMarketOrder(nftAddress,tokenId,price,{value:listingPrice})
     await transaction.wait()
     swal("Confirmed!", "NFT Post Minted", "success");
     router.push('/')
}


 
export const createProjectMarket=async(name,description,price,link,url,router)=>{   
    console.log(name,description,price,link,url)
    if(!name||!price||!description||!url) return
    //upload to IPFS
     const data = JSON.stringify({
         name,description,link,image:url
     })
     try{
         const metadata = await  client.add(data)
         const url = `https://ipfs.infura.io/ipfs/${metadata.path}`
         // run a function that creates sale and passes in the url 
         createSkillData(url,price.toString(),router,true)
         }catch(err){
             console.log(err)
         }
     
}






// export const loadSF = async()=>{
//     let prvider =  new ethers.providers.JsonRpcProvider(secret.url)
   
//    return await Framework.create({
//          chainId:80001,
//         networkName:"mumbai",
//         cacheProvider: true,
//         provider:prvider ,
//       });

// }

// export const createFlow=async(receiver,stoken,flowRate)=>{
//     let sf = await loadSF();
//     let sender = await getSignerAddress()
//     let signer =await getSigner();

//     const calculatedFlowRate = stoken * 3600 * 24 * 30;
  
//    console.log("Sender :"+sender,"Receiver:"+receiver,'FUSDC :0x42bb40bF79730451B11f6De1CbA222F17b87Afd7','Flowrate :'+10000000)
   
//     const createFlowOperation = sf.cfaV1.createFlow({
//         sender: sender,
//         receiver: receiver,
//         superToken: '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7',
//         flowRate: 1000000000
//       });
      
//       const txnResponse = await createFlowOperation.exec(signer,{ gas: 2100000,gasPrice: 8000000000});
//       const txnReceipt = await txnResponse.wait();
//       swal("Confirmed!", "Streaming Started", "success");
//       console.log(txnReceipt)
// }


// export const getFlow=async(receiver)=>{
//     let sf = await loadSF();
//     let sender = await getSignerAddress()
//     return await sf.cfaV1.getFlow({
//         superToken: '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7',
//         sender: sender,
//         receiver: receiver,
//         providerOrSigner: await getRPCProvider()
//       });

    
// }