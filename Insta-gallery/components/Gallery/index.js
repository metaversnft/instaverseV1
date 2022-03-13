import React, { Component } from 'react';

import { View, asset, NativeModules } from 'react-360';
import Entity from 'Entity';
import Picture from '../Picture';
const location = NativeModules.Location
const { KeyboardMovementModule } = NativeModules;
 const axios = require('axios');
// import { useMoralisWeb3Api } from "react-moralis";
// const Web3Api = useMoralisWeb3Api();

export default class Gallery extends Component {
  
  state ={
    x: 0,
    z: 0,
    items:[]
  }
  constructor(props) {
    super(props);

   
  }
  //  async fetchAllTokenIds (add){
  //    console.log(add)
  //   const options = {
  //     address: add.toString(),
  //     chain: "eth",
  //   };
  //   const NFTs = await Web3Api.token.getAllTokenIds(options);
  //   console.log(NFTs);
  // };
  

 

  async componentDidMount() {
   let param= location.search;
   let data =param.substring(5,param.length);
   let url= "https://gateway.moralisipfs.com/ipfs/"
   let response = await axios.get('https://deep-index.moralis.io/api/v2/nft/'+data+'?chain=eth&format=decimal',{headers:{
    "x-api-key" :"almzdIW4KOWEr9QYtxqYiapmo5AKy6EKmbpnqQN2cHCpV1hOQBzoYskYwgPEPDcx"
   }})
  
   if(response.data.result.length===0){
    url = "https://gateway.moralisipfs.com/"
    response = await axios.get('https://deep-index.moralis.io/api/v2/'+data+'/nft?chain=eth&format=decimal',{headers:{
      "x-api-key" :"almzdIW4KOWEr9QYtxqYiapmo5AKy6EKmbpnqQN2cHCpV1hOQBzoYskYwgPEPDcx"
     }})
   }
   let count = response.data.result.length>24?24:response.data.result.length
   let arr =[]
  for(let i=0;i<count;i++){
    let nft = await response.data.result[i];
    let md = JSON.parse(nft.metadata);
    let image = md.image;
   
    if(image.substring(0,7) === 'ipfs://'){

      let ip=await image.substring(7,image.length);
      url=url+ip;
    }else{
      url = md.image
    }
    //console.log(url)
     
    // this.state.items[i].token_address = nft.token_address;
    // this.state.items[i].token_id = nft.token_id;
    // this.state.items[i].contract_type = nft.contract_type;
    // this.state.items[i].name = nft.name;
    // this.state.items[i].symbol = nft.symbol;
    // this.state.items[i].url = url;
    let obj = {"token_address":nft.token_address,
     "token_id": nft.token_id,
      "contract_type":nft.contract_type,
      "name":nft.name,
      "symbol":nft.symbol,
      "image":url}
    arr[i] = obj
   // await arr.push()
  }
  this.setState({items:arr})
   
  
  //   let md = JSON.parse(md);
  //   this.setState({nft,md})
    
    
  //  this.setState({url});
   console.log(this.state.items[0].token_address)

  //this.fetchAllTokenIds(data)
  
  
 // console.log(this.state.url)
    setTimeout(() => this.callCheck(), 1000);
  }

  

  callCheck() {
    KeyboardMovementModule.getValueWithCallback((x, z) =>
      this.setState({ x, z })
    );
    setTimeout(() => this.callCheck(), 50);
  }

  render() {
   
    return (
      <View>
        <Entity
          style={{
            transform: [
              { scale: 1 },
              { translate: [this.state.x, 0, this.state.z] },
            ],
          }}
          source={{
            gltf2: asset('scene.gltf'),
          }}
        />
      {this.state.items[0]!==null|| this.state.items[0] !==undefined?
        <Picture
          x={2.57 + this.state.x}
          y={1.4}
          z={-11.4 + this.state.z}
          height={1.4}
          width={1.4}
          rotateY={-90}
          asset=""
           title={this.state.items[0]!==undefined?this.state.items[0].name:""}
          //   question={this.state.items[0][0]}
          //   answers={this.state.items[0][4]}
          // // correctAnswer={0}
          //   artist={this.state.items[0][1]}
          //   date={this.state.items[0][2]}
          // //  location="Louvre Museum (Paris)"
            url={this.state.items[0]!==undefined?this.state.items[0].image:""}
        />:<Picture/>}

         <Picture
          x={2.57 + this.state.x}
          y={2.8}
          z={-8.2 + this.state.z}
          height={1.4}
          width={1.4}
          rotateY={-90}
          asset=""
          title={this.state.items[1]!==undefined?this.state.items[1].name:""}
           question={this.state.items[1]!==undefined?this.state.items[1].token_address:""}
           answers={this.state.items[1]!==undefined?this.state.items[1].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[1]!==undefined?this.state.items[1].contract_type:""}
           date={this.state.items[1]!==undefined?this.state.items[1].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[1]!==undefined?this.state.items[1].image:""}
        />

        <Picture
          x={2.41 + this.state.x}
          y={4.78}
          z={-4.64 + this.state.z}
          height={2.5}
          width={1.7}
          rotateY={-90}
          asset="scream.jpg"
          title={this.state.items[2]!==undefined?this.state.items[2].name:""}
           question={this.state.items[2]!==undefined?this.state.items[2].token_address:""}
           answers={this.state.items[2]!==undefined?this.state.items[2].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[2]!==undefined?this.state.items[2].contract_type:""}
           date={this.state.items[2]!==undefined?this.state.items[2].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[2]!==undefined?this.state.items[2].image:""}
        />

        <Picture
          x={2.35 + this.state.x}
          y={6.9}
          z={-0.64 + this.state.z}
          height={1.8}
          width={1.8}
          rotateY={-90}
          title={this.state.items[3]!==undefined?this.state.items[3].name:""}
           question={this.state.items[3]!==undefined?this.state.items[3].token_address:""}
           answers={this.state.items[3]!==undefined?this.state.items[3].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[3]!==undefined?this.state.items[3].contract_type:""}
           date={this.state.items[3]!==undefined?this.state.items[3].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[3]!==undefined?this.state.items[3].image:""}
        />
        <Picture
          x={2.35 + this.state.x}
          y={8.72}
          z={2.94 + this.state.z}
          height={1.8}
          width={1.8}
          rotateY={-90}
          asset="guernica.jpg"
          title={this.state.items[4]!==undefined?this.state.items[4].name:""}
          question={this.state.items[4]!==undefined?this.state.items[4].token_address:""}
          answers={this.state.items[4]!==undefined?this.state.items[4].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[4]!==undefined?this.state.items[4].contract_type:""}
          date={this.state.items[4]!==undefined?this.state.items[4].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[4]!==undefined?this.state.items[4].image:""}
        />

        <Picture
          x={-3.93 + this.state.x}
          y={10.62}
          z={3.98 + this.state.z}
          height={1.72}
          width={1.34}
          rotateY={90}
          asset="kiss.jpg"
          title={this.state.items[5]!==undefined?this.state.items[5].name:""}
          question={this.state.items[5]!==undefined?this.state.items[5].token_address:""}
          answers={this.state.items[5]!==undefined?this.state.items[5].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[5]!==undefined?this.state.items[5].contract_type:""}
          date={this.state.items[5]!==undefined?this.state.items[5].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[5]!==undefined?this.state.items[5].image:""}
        />

        <Picture
          x={-3.93 + this.state.x}
          y={12.34}
          z={1.8 + this.state.z}
          height={1.72}
          width={1.34}
          rotateY={90}
          asset="girl-pearl.jpg"
          title={this.state.items[6]!==undefined?this.state.items[6].name:""}
           question={this.state.items[6]!==undefined?this.state.items[6].token_address:""}
           answers={this.state.items[6]!==undefined?this.state.items[6].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[6]!==undefined?this.state.items[6].contract_type:""}
           date={this.state.items[6]!==undefined?this.state.items[6].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[6]!==undefined?this.state.items[6].image:""}
        />

        <Picture
          x={-3.93 + this.state.x}
          y={14.05}
          z={-2.99 + this.state.z}
          height={1.7}
          width={1.34}
          rotateY={90}
          asset="meninas.jpg"
          title={this.state.items[7]!==undefined?this.state.items[7].name:""}
           question={this.state.items[7]!==undefined?this.state.items[7].token_address:""}
           answers={this.state.items[7]!==undefined?this.state.items[7].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[7]!==undefined?this.state.items[7].contract_type:""}
           date={this.state.items[7]!==undefined?this.state.items[7].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[7]!==undefined?this.state.items[7].image:""}
        />

        <Picture
          x={-3.93 + this.state.x}
          y={15.76}
          z={-4.64 + this.state.z}
          height={1.7}
          width={1.34}
          rotateY={90}
          asset="venus.jpg"
          title={this.state.items[8]!==undefined?this.state.items[8].name:""}
          question={this.state.items[8]!==undefined?this.state.items[8].token_address:""}
          answers={this.state.items[8]!==undefined?this.state.items[8].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[8]!==undefined?this.state.items[8].contract_type:""}
          date={this.state.items[8]!==undefined?this.state.items[8].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[8]!==undefined?this.state.items[8].image:""}
        />

        <Picture
          x={-3.93 + this.state.x}
          y={17.46}
          z={-6.37 + this.state.z}
          height={1.7}
          width={1.34}
          rotateY={90}
          asset="adam.jpg"
          title={this.state.items[9]!==undefined?this.state.items[9].name:""}
          question={this.state.items[9]!==undefined?this.state.items[9].token_address:""}
          answers={this.state.items[9]!==undefined?this.state.items[9].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[9]!==undefined?this.state.items[9].contract_type:""}
          date={this.state.items[9]!==undefined?this.state.items[9].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[9]!==undefined?this.state.items[9].image:""}
        />

        <Picture
          x={-4.8 + this.state.x}
          y={19.15}
          z={-12.38 + this.state.z}
          height={1.7}
          width={3.08}
          rotateY={90}
          asset="night-watch.jpg"
          title={this.state.items[10]!==undefined?this.state.items[10].name:""}
          question={this.state.items[10]!==undefined?this.state.items[10].token_address:""}
          answers={this.state.items[10]!==undefined?this.state.items[10].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[10]!==undefined?this.state.items[10].contract_type:""}
          date={this.state.items[10]!==undefined?this.state.items[10].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[10]!==undefined?this.state.items[10].image:""}
        />

        <Picture
          x={-5.25 + this.state.x}
          y={20.85}
          z={-12.38 + this.state.z}
          height={1.7}
          width={3.08}
          rotateY={-90}
          asset="memoria.jpg"
          title={this.state.items[11]!==undefined?this.state.items[11].name:""}
           question={this.state.items[11]!==undefined?this.state.items[11].token_address:""}
           answers={this.state.items[11]!==undefined?this.state.items[11].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[11]!==undefined?this.state.items[11].contract_type:""}
           date={this.state.items[11]!==undefined?this.state.items[11].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[11]!==undefined?this.state.items[11].image:""}
        />

        <Picture
          x={-4.2 + this.state.x}
          y={22.34}
          z={-6.38 + this.state.z}
          height={1.3}
          width={1}
          rotateY={-90}
          asset="mother.jpg"
          title={this.state.items[12]!==undefined?this.state.items[12].name:""}
           question={this.state.items[12]!==undefined?this.state.items[12].token_address:""}
           answers={this.state.items[12]!==undefined?this.state.items[12].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[12]!==undefined?this.state.items[12].contract_type:""}
           date={this.state.items[12]!==undefined?this.state.items[12].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[12]!==undefined?this.state.items[12].image:""}
        />

        <Picture
          x={-4.2 + this.state.x}
          y={23.64}
          z={-2.97 + this.state.z}
          height={1.3}
          width={1}
          rotateY={-90}
          asset="arnolfini.jpg"
          title={this.state.items[13]!==undefined?this.state.items[13].name:""}
           question={this.state.items[13]!==undefined?this.state.items[13].token_address:""}
           answers={this.state.items[13]!==undefined?this.state.items[13].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[13]!==undefined?this.state.items[13].contract_type:""}
           date={this.state.items[13]!==undefined?this.state.items[13].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[13]!==undefined?this.state.items[13].image:""}
        />

        <Picture
          x={-4.41 + this.state.x}
          y={25.22}
          z={-4.66 + this.state.z}
          height={1.8}
          width={1.4}
          rotateY={-90}
          title={this.state.items[14]!==undefined?this.state.items[14].name:""}
           question={this.state.items[14]!==undefined?this.state.items[14].token_address:""}
           answers={this.state.items[14]!==undefined?this.state.items[14].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[14]!==undefined?this.state.items[14].contract_type:""}
           date={this.state.items[14]!==undefined?this.state.items[14].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[14]!==undefined?this.state.items[14].image:""}
        />

        <Picture
          x={-4.41 + this.state.x}
          y={27}
          z={1.8 + this.state.z}
          height={1.8}
          width={1.4}
          rotateY={-90}
          asset="ermine.jpg"
          title={this.state.items[15]!==undefined?this.state.items[15].name:""}
           question={this.state.items[15]!==undefined?this.state.items[15].token_address:""}
           answers={this.state.items[15]!==undefined?this.state.items[15].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[15]!==undefined?this.state.items[15].contract_type:""}
           date={this.state.items[15]!==undefined?this.state.items[15].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[15]!==undefined?this.state.items[15].image:""}
        />

        <Picture
          x={-4.41 + this.state.x}
          y={28.8}
          z={3.97 + this.state.z}
          height={1.8}
          width={1.4}
          rotateY={-90}
          asset="galette-dance.jpg"
          title={this.state.items[16]!==undefined?this.state.items[16].name:""}
           question={this.state.items[16]!==undefined?this.state.items[16].token_address:""}
           answers={this.state.items[16]!==undefined?this.state.items[16].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[16]!==undefined?this.state.items[16].contract_type:""}
           date={this.state.items[16]!==undefined?this.state.items[16].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[16]!==undefined?this.state.items[16].image:""}
        />

        <Picture
          x={-10.61 + this.state.x}
          y={30.26}
          z={2.64 + this.state.z}
          height={1.4}
          width={1.4}
          rotateY={90}
          asset="ladies.jpg"
          title={this.state.items[17]!==undefined?this.state.items[17].name:""}
          question={this.state.items[17]!==undefined?this.state.items[17].token_address:""}
          answers={this.state.items[17]!==undefined?this.state.items[17].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[17]!==undefined?this.state.items[17].contract_type:""}
          date={this.state.items[17]!==undefined?this.state.items[17].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[17]!==undefined?this.state.items[17].image:""}
        />


        <Picture
          x={-10.61 + this.state.x}
          y={31.66}
          z={-0.58 + this.state.z}
          height={1.4}
          width={1.4}
          rotateY={90}
          asset="primavera.jpg"
           title={this.state.items[18]!==undefined?this.state.items[18].name:""}
           question={this.state.items[18]!==undefined?this.state.items[18].token_address:""}
           answers={this.state.items[18]!==undefined?this.state.items[18].token_id:""}
         // correctAnswer={0}
           artist={this.state.items[18]!==undefined?this.state.items[18].contract_type:""}
           date={this.state.items[18]!==undefined?this.state.items[18].symbol:""}
          //  location="Louvre Museum (Paris)"
            url={this.state.items[18]!==undefined?this.state.items[18].image:""}
        />

        <Picture
          x={-10.75 + this.state.x}
          y={33.66}
          z={-4.13 + this.state.z}
          height={2.6}
          width={1.7}
          rotateY={90}
          asset="athens-school.jpg"
          title={this.state.items[19]!==undefined?this.state.items[19].name:""}
          question={this.state.items[19]!==undefined?this.state.items[19].token_address:""}
          answers={this.state.items[19]!==undefined?this.state.items[19].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[19]!==undefined?this.state.items[19].contract_type:""}
          date={this.state.items[19]!==undefined?this.state.items[19].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[19]!==undefined?this.state.items[19].image:""}
        />

        <Picture
          x={-10.79 + this.state.x}
          y={35.86}
          z={-8.14 + this.state.z}
          height={1.8}
          width={1.8}
          rotateY={90}
          asset="wanderer.jpg"
          title={this.state.items[20]!==undefined?this.state.items[20].name:""}
          question={this.state.items[20]!==undefined?this.state.items[20].token_address:""}
          answers={this.state.items[20]!==undefined?this.state.items[20].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[20]!==undefined?this.state.items[20].contract_type:""}
          date={this.state.items[20]!==undefined?this.state.items[20].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[20]!==undefined?this.state.items[20].image:""}
        />

        <Picture
          x={-10.79 + this.state.x}
          y={37.66}
          z={-11.72 + this.state.z}
          height={1.8}
          width={1.8}
          rotateY={90}
          asset="sleeping-gypsy.jpg"
          title={this.state.items[21]!==undefined?this.state.items[21].name:""}
          question={this.state.items[21]!==undefined?this.state.items[21].token_address:""}
          answers={this.state.items[21]!==undefined?this.state.items[21].token_id:""}
        // correctAnswer={0}
          artist={this.state.items[21]!==undefined?this.state.items[21].contract_type:""}
          date={this.state.items[21]!==undefined?this.state.items[21].symbol:""}
         //  location="Louvre Museum (Paris)"
           url={this.state.items[21]!==undefined?this.state.items[21].image:""}
        /> 
      </View>
    );
  }
}
