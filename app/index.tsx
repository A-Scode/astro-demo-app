import { View, Text, FlatList, StyleSheet, Button, Pressable, Modal } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { Image } from 'expo-image';
import { Rating } from 'react-native-ratings';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import ReactNativeModal from 'react-native-modal';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';

type astrologer = {
    id:number,
    name: string,
    expertise: string[],
    languages: string[],
    experience: string,
    rate: string,
    orders: number,
    rating: number,
    profileImage: string;
    discountedRate?: undefined|string,
    description : string,
    totalChatTime: string,
    totalCallTime: string,
}

const astrologers:astrologer[] = [
    {
        id: 1,
        name: "AnuradhaM",
        expertise: ["Vedic", "Numerology", "Vastu", "Prashana"],
        languages: ["Tamil"],
        experience: "2 Years",
        rate: "₹ 20/min",
        orders: 14390,
        discountedRate: "₹ 18/min",
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "AnuradhaM is a renowned Vedic astrologer. She has been practicing astrology for 2 years and has deep knowledge of Vedic astrology. She is known for her ability to offer simple and practical solutions to her clients' problems. AnuradhaM specializes in Vastu and Prashana, providing guidance and remedies for relationship issues, financial matters, health concerns, and career challenges. Her clients appreciate her straightforward approach and effective remedies.",
        totalChatTime: "76k mins",
        totalCallTime: "5k mins"
    },
    {
        id: 2,
        name: "Bupathi",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil"],
        experience: "6 Years",
        rate: "₹ 28/min",
        orders: 15832,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Bupathi is an experienced astrologer with over 6 years of practice in Vedic and Nadi astrology. His deep understanding of Nadi astrology allows him to provide highly accurate readings that give clients insights into their life paths. Fluent in Tamil, Bupathi offers personalized consultations that address his clients' specific concerns, helping them make informed decisions and navigate challenges effectively. His clients value his calm demeanor and insightful guidance.",
        totalChatTime: "65k mins",
        totalCallTime: "4.5k mins"
    },
    {
        id: 3,
        name: "Mahipathim",
        expertise: ["Vedic", "Nadi"],
        languages: ["Telugu"],
        experience: "5 Years",
        rate: "₹ 22/min",
        orders: 12432,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Mahipathim is a skilled astrologer with 5 years of experience in Vedic and Nadi astrology. His expertise in Nadi astrology allows him to provide deep insights into his clients' lives and guide them in making important decisions. Fluent in Telugu, Mahipathim is dedicated to helping his clients find clarity and direction through his accurate and insightful readings.",
        totalChatTime: "54k mins",
        totalCallTime: "3.8k mins"
    },
    {
        id: 4,
        name: "ShanmugaS",
        expertise: ["Vedic"],
        languages: ["Tamil", "English"],
        experience: "8 Years",
        discountedRate: "₹ 28/min",
        rate: "₹ 29/min",
        orders: 20227,
        rating: 4.6,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "ShanmugaS is a highly experienced astrologer with 8 years of practice in Vedic astrology. His deep understanding of astrological principles allows him to provide his clients with detailed and accurate readings. Fluent in both Tamil and English, ShanmugaS offers his clients clear and practical advice that helps them navigate life's challenges with confidence. His clients appreciate his ability to offer insightful guidance and effective remedies for their problems.",
        totalChatTime: "89k mins",
        totalCallTime: "6.2k mins"
    },
    {
        id: 5,
        name: "Sendhen",
        expertise: ["Vedic", "Tarot"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 25/min",
        orders: 10342,
        rating: 4.0,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Sendhen is a dedicated astrologer with 4 years of experience in Vedic astrology and tarot reading. His dual expertise allows him to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in English and Tamil, Sendhen's clients value his ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence.",
        totalChatTime: "48k mins",
        totalCallTime: "3.1k mins"
    },
    {
        id: 6,
        name: "Vidhya",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 26/min",
        orders: 15321,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Vidhya is a knowledgeable astrologer with 5 years of experience in Vedic astrology and palmistry. Her expertise in palmistry allows her to offer clients unique insights into their lives, complementing her traditional astrological readings. Fluent in Tamil, Vidhya provides her clients with clear and practical advice that helps them navigate life's challenges with ease.",
        totalChatTime: "62k mins",
        totalCallTime: "4.3k mins"
    },
    {
        id: 7,
        name: "Ramesh",
        expertise: ["Vedic", "Vastu"],
        languages: ["Tamil", "Hindi"],
        experience: "7 Years",
        rate: "₹ 30/min",
        orders: 18342,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ramesh is an experienced astrologer with 7 years of expertise in Vedic astrology and vastu shastra. His deep understanding of Vastu allows him to help clients create harmonious living spaces that support their well-being and prosperity. Fluent in Tamil and Hindi, Ramesh is dedicated to providing his clients with clear and actionable advice that helps them make informed decisions and navigate life's challenges.",
        totalChatTime: "78k mins",
        totalCallTime: "5.5k mins"
    },
    {
        id: 8,
        name: "Priya",
        expertise: ["Vedic", "Tarot"],
        languages: ["Tamil", "Telugu"],
        experience: "6 Years",
        rate: "₹ 28/min",
        orders: 16789,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Priya is a skilled astrologer with 6 years of experience in Vedic astrology and tarot reading. Her dual expertise allows her to provide clients with both traditional astrological insights and intuitive tarot guidance. Priya's clients appreciate her ability to offer clear and practical advice in both Tamil and Telugu. Whether you're facing a challenging decision or simply looking for direction, Priya's readings are designed to provide clarity and support, helping you navigate your life's journey with confidence.",
        totalChatTime: "68k mins",
        totalCallTime: "4.7k mins"
    },
    {
        id: 9,
        name: "Ravi",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil", "Kannada"],
        experience: "7 Years",
        rate: "₹ 27/min",
        orders: 18321,
        rating: 4.4,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ravi is an experienced astrologer with 7 years of expertise in Vedic and Nadi astrology. His deep understanding of Nadi astrology allows him to provide detailed and accurate readings that offer clients valuable insights into their lives. Ravi's ability to connect with clients in both Tamil and Kannada has made him a sought-after astrologer in his community. His readings are known for their clarity and precision, making him a trusted advisor for those seeking guidance on their life's path.",
        totalChatTime: "72k mins",
        totalCallTime: "5.0k mins"
    },
    {
        id: 10,
        name: "Lakshmi",
        expertise: ["Vedic", "Vastu"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 24/min",
        orders: 13432,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Lakshmi is a knowledgeable astrologer with 4 years of experience in Vedic astrology and vastu shastra. Fluent in both English and Tamil, she offers her clients clear and concise advice on a variety of life issues. Lakshmi’s expertise in vastu allows her to help clients create harmonious living spaces that support their well-being and prosperity. Her Vedic astrology readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "56k mins",
        totalCallTime: "3.9k mins"
    },
    {
        id: 11,
        name: "Suresh",
        expertise: ["Vedic", "Numerology"],
        languages: ["Hindi"],
        experience: "8 Years",
        rate: "₹ 26/min",
        orders: 20453,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Suresh is a highly experienced astrologer with 8 years of practice in Vedic astrology and numerology. His expertise in numerology allows him to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in Hindi, Suresh is known for his ability to provide practical advice that helps his clients make informed decisions and navigate their lives with confidence. His clients appreciate his calm demeanor and thoughtful guidance.",
        totalChatTime: "88k mins",
        totalCallTime: "6.1k mins"
    },
    {
        id: 12,
        name: "Kavitha",
        expertise: ["Vedic", "Nadi"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 23/min",
        orders: 15432,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Kavitha is a skilled astrologer with 5 years of experience in Vedic and Nadi astrology. Her deep understanding of Nadi astrology allows her to provide her clients with detailed and accurate readings that offer valuable insights into their lives. Fluent in Tamil, Kavitha's clients appreciate her ability to offer clear and practical advice that helps them navigate life's challenges with confidence. Her readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "66k mins",
        totalCallTime: "4.5k mins"
    },
    {
        id: 13,
        name: "Vikram",
        expertise: ["Vedic", "Vastu"],
        languages: ["Tamil", "Hindi"],
        experience: "6 Years",
        rate: "₹ 27/min",
        discountedRate: "₹ 23/min",
        orders: 17432,
        rating: 4.4,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Vikram is an experienced astrologer with 6 years of expertise in Vedic astrology and vastu shastra. His deep understanding of Vastu allows him to help clients create harmonious living spaces that support their well-being and prosperity. Fluent in both Tamil and Hindi, Vikram provides his clients with clear and practical advice that helps them make informed decisions and navigate life's challenges with confidence. His clients appreciate his ability to offer insightful guidance and effective remedies for their problems.",
        totalChatTime: "72k mins",
        totalCallTime: "5.0k mins"
    },
    {
        id: 14,
        name: "Radha",
        expertise: ["Vedic", "Tarot"],
        languages: ["English", "Tamil"],
        experience: "5 Years",
        rate: "₹ 26/min",
        orders: 16342,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Radha is a dedicated astrologer with 5 years of experience in Vedic astrology and tarot reading. Her dual expertise allows her to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in English and Tamil, Radha's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence. Her readings are known for their clarity and precision, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "64k mins",
        totalCallTime: "4.4k mins"
    },
    {
        id: 15,
        name: "Krishna",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil"],
        experience: "7 Years",
        rate: "₹ 28/min",
        orders: 18321,
        rating: 4.5,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Krishna is a knowledgeable astrologer with 7 years of experience in Vedic astrology and palmistry. His expertise in palmistry allows him to offer clients unique insights into their lives, complementing his traditional astrological readings. Fluent in Tamil, Krishna is dedicated to providing his clients with clear and practical advice that helps them navigate life's challenges with ease. His readings are known for their accuracy and depth, making him a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "78k mins",
        totalCallTime: "5.3k mins"
    },
    {
        id: 16,
        name: "Bhavani",
        expertise: ["Vedic", "Numerology"],
        languages: ["Tamil", "English"],
        experience: "4 Years",
        rate: "₹ 25/min",
        discountedRate: "₹ 23/min",
        orders: 14232,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Bhavani is a skilled astrologer with 4 years of experience in Vedic astrology and numerology. Her expertise in numerology allows her to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in both Tamil and English, Bhavani's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence.",
        totalChatTime: "58k mins",
        totalCallTime: "4.0k mins"
    },
    {
        id: 17,
        name: "Ganesh",
        expertise: ["Vedic", "Tarot"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 23/min",
        orders: 15232,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Ganesh is a dedicated astrologer with 5 years of experience in Vedic astrology and tarot reading. His dual expertise allows him to offer clients a unique combination of traditional astrological insights and intuitive tarot guidance. Fluent in Tamil, Ganesh's clients appreciate his ability to offer clear and practical advice that helps them navigate life's challenges with confidence. His readings are known for their clarity and precision, making him a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "63k mins",
        totalCallTime: "4.3k mins"
    },
    {
        id: 18,
        name: "Nisha",
        expertise: ["Vedic", "Vastu"],
        languages: ["English", "Tamil"],
        experience: "4 Years",
        rate: "₹ 25/min",
        orders: 13232,
        rating: 4.1,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Nisha is a knowledgeable astrologer with 4 years of experience in Vedic astrology and vastu shastra. Fluent in both English and Tamil, she offers her clients clear and concise advice on a variety of life issues. Nisha's expertise in vastu allows her to help clients create harmonious living spaces that support their well-being and prosperity. Her Vedic astrology readings are known for their accuracy and depth, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "52k mins",
        totalCallTime: "3.7k mins"
    },
    {
        id: 19,
        name: "Karthik",
        expertise: ["Vedic", "Palmistry"],
        languages: ["Tamil", "Telugu"],
        experience: "6 Years",
        rate: "₹ 26/min",
        orders: 16432,
        rating: 4.3,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Karthik is a skilled astrologer with 6 years of experience in Vedic astrology and palmistry. His expertise in palmistry allows him to offer clients unique insights into their lives, complementing his traditional astrological readings. Fluent in Tamil and Telugu, Karthik is dedicated to providing his clients with clear and practical advice that helps them navigate life's challenges with ease.",
        totalChatTime: "66k mins",
        totalCallTime: "4.8k mins"
    },
    {
        id: 20,
        name: "Madhuri",
        expertise: ["Vedic", "Numerology"],
        languages: ["Tamil"],
        experience: "5 Years",
        rate: "₹ 24/min",
        orders: 14232,
        rating: 4.2,
        profileImage: `https://api.dicebear.com/9.x/adventurer/svg?seed=Loki`,
        description: "Madhuri is a skilled astrologer with 5 years of experience in Vedic astrology and numerology. Her expertise in numerology allows her to provide clients with detailed and accurate readings that offer insights into their life's path and challenges. Fluent in Tamil, Madhuri's clients value her ability to provide clear and actionable advice that helps them make informed decisions and navigate their lives with confidence. Her readings are known for their clarity and precision, making her a trusted advisor for those seeking guidance on important life decisions.",
        totalChatTime: "58k mins",
        totalCallTime: "4.1k mins"
    }
]
const listPage = () => {

    const [filterModalVisible , setFilterModalVisible] = useState(true);
    
    const [astroList , setAstroList ] = useState<astrologer[]>(astrologers)

    const applyFilters = useCallback((filters:{expertise:string[] , experience:number})=>{
        console.log(astrologers.filter(astro=>{
            return filters.expertise.find(exp => astro.expertise.find(astoexp =>astoexp == exp)) && Number(astro.experience.split(' ')[0]) >= filters.experience
        }))
        setAstroList( astrologers.filter(astro=>{
            return filters.expertise.find(exp => astro.expertise.find(astoexp =>astoexp == exp)) && Number(astro.experience.split(' ')[0]) >= filters.experience
        }))
        setFilterModalVisible(false)
    },[astrologers])



  return (
    <View>
        <CustomHeader openFilter={()=>setFilterModalVisible(true)} />
        <FilterModal filterModalVisible={filterModalVisible} setFilterModalVisible={setFilterModalVisible} applyFilters={applyFilters} />
      <FlatList
      data={astroList}
      renderItem={AstroCard}
      contentContainerStyle={{paddingBottom:120}}
      />
    </View>
  )
}


const AstroCard = ({index , item}:{index:number , item:astrologer})=>{
    const blurhash =  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <Link href={{pathname:'/[id]' , params:{id:item.id , item : JSON.stringify(item)}}} asChild > 
        <Pressable>
        <View style={styles.card}>
            <View style={styles.cardLeft}>
            <Image
                style={styles.profileImage}
                source={item.profileImage}
                contentFit="cover"
                transition={1000}
            />
            <View>

            {item.rating===0?(
                <Text style={{fontWeight:'700' , textAlign:'center' , color:"#bb0101"}}>New!</Text>
            )
            :(<Rating 
            startingValue={item.rating}
            ratingCount={5}
            imageSize={15}
            readonly
            />)}
            <Text style={{textAlign:'center'}}>{Number(item.orders).toLocaleString()} orders</Text>
            </View>
            </View>
            <View style={styles.cardRight}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    {
                        item.expertise.map((value , index)=>(
                            <Text>{value}{index!==item.expertise.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row'}}>
                    {
                        item.languages.map((value , index)=>(
                            <Text>{value}{index!==item.languages.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <Text>Exp : {item.experience}</Text>

                {
                    item.discountedRate?(
                <View style={{flexDirection:'row'}}>
                    <Text style={{textDecorationLine:'line-through'}}>{item.rate}</Text>
                    <Text style={[styles.rate , {color:"#bb0101"}]}>{item.discountedRate}</Text>
                    </View>
                    ):(
                        <Text style={styles.rate}>{item.rate}</Text>
                    )
                }
            </View>

            <Pressable style={styles.chatButton}>
                <Text style={{color:'green'}}>Chat</Text>
            </Pressable>
        </View>
        </Pressable>
        </Link> 
    )
}


const FilterModal = ({filterModalVisible , setFilterModalVisible ,applyFilters}:{
    filterModalVisible:boolean,
    setFilterModalVisible:(prevalue:any)=>void,
    applyFilters:(filters:{expertise:string[] , experience:number})=>void 
})=>{

    const [expertise , setExpertise] =  useState<string[]>([]);
    const [experience , setExperience] =  useState<number>(0);

    const extpertiseList = [
        {lablel:"Vedic" , value:"Vedic"}, 
        {lablel:"Numerology" , value:"Numerology"}, 
        {lablel:"Vastu" , value:"Vastu"}, 
        {lablel:"Prashana" , value:"Prashana"}, 
        {lablel:"Nadi" , value:"Nadi"}, 
        {lablel:"Tarot" , value:"Tarot"}, 
        {lablel:"Palmistry" , value:"Palmistry"},
    ];
    return (
        <ReactNativeModal isVisible={filterModalVisible} onBackdropPress={()=>setFilterModalVisible(false)}>
            <View style={styles.filterModal}>
                <Text style={[styles.name , {fontSize:22  , marginVertical:5}]}>Filters</Text>
                <View> 
                    <Text style={styles.label}>Expertise</Text>
                    <MultiSelect 
                    data={extpertiseList}
                    labelField={'lablel'}
                    valueField={'value'}
                    value={expertise}
                    onChange={setExpertise}
                    style={{backgroundColor:'#f5f5f5',padding:10 , borderRadius:10}}
                    activeColor='#ffe694'
                    selectedStyle={{borderRadius:10 , backgroundColor:'#fff5d6'}}
                    
                    />
                </View>
                <View> 
                    <Text style={styles.label}>Expreience {experience!==0?`: ${experience}`:null}</Text>
                    <Slider
                    thumbTintColor='#ffc400'
                    minimumTrackTintColor='#ffe07c'
                    minimumValue={0}
                    maximumValue={10}
                    value={experience}
                    onValueChange={(value)=>setExperience(Math.round(value))}
                    />
                </View>
            <Pressable onPress={()=>applyFilters({experience , expertise})} style={{alignSelf:'flex-end' , padding:20}}>
                <Text style={{color:'#eeb600'}}>OK</Text>
            </Pressable>
            </View>
        </ReactNativeModal>
    )
}



const CustomHeader = (props:{openFilter:()=>void })=>{
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
            <MaterialCommunityIcons name='menu' color={'black'}  size={35} />
            <View style={{flex:1 , justifyContent:'center'}}>
                <Text style={{textAlign:'center' , fontSize:20 , fontWeight:'700'}} ellipsizeMode='tail'>Chat with Astrologer</Text>
            </View>
            <MaterialCommunityIcons name='magnify' color={'black'}  size={35} />
            <Pressable onPress={props.openFilter}>
            <MaterialCommunityIcons name='filter-outline' color={'black'}  size={35} />

            </Pressable>

            </View>
        </View>
    )
}

export default listPage

const styles = StyleSheet.create({
    card :{
        elevation:5,
        borderRadius:5,
        margin:5,
        // flex:1,
        padding:10,
        backgroundColor:"white",
        flexDirection:"row",
        gap:20,
        width:'100%',
    },
    cardLeft:{
        gap:10
    },
    profileImage:{
        width:80 ,
        height:80,
        borderWidth:1,
        borderRadius:40,
        borderColor:"#ffc400"
    },
    cardRight:{
        gap:2

    },
    name:{
        fontSize:18,
        fontWeight:'700',
    },
    rate:{
        fontSize:15,
        fontWeight:'700',
    },
    chatButton:{
        position:'absolute',
        right:20,
        bottom:20,
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        borderColor:'green',
        borderWidth:1,

    },
    headerContainer:{
        height:100,
        backgroundColor:'#ffc400'
    },
    header:{
        flexDirection:'row',
        gap:20,
        position:'absolute',
        bottom:0,
        padding:10
    },
    filterModal:{
        zIndex: 2,
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:20,
        minWidth:'90%',
        maxWidth:600,
        minHeight:300,
        padding:20,
        gap:15,
    },
    label:{
        fontSize:15,
        marginVertical:5,
    }

})