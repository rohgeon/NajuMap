
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowLeft, 
  Share, 
  MessageSquare, 
  Bookmark, 
  Heart, 
  ChevronRight, 
  Car, 
  Menu as MenuIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface RestaurantDetail {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  hours: string[];
  description: string;
  price: string;
  menu: Array<{
    name: string;
    description: string;
    price: string;
    image?: string;
    popular?: boolean;
  }>;
  photos: string[];
  features: string[];
  reviewList: Array<{
    id: number;
    user: string;
    avatar: string;
    rating: number;
    date: string;
    content: string;
    photos?: string[];
  }>;
}

// Mock data for the restaurant detail
const restaurantData: RestaurantDetail = {
  id: 1,
  name: '강남 깔끔한 한식당',
  type: '한식',
  rating: 4.8,
  reviews: 342,
  address: '서울 강남구 테헤란로 123',
  phone: '02-1234-5678',
  hours: [
    '월-금: 11:00 - 22:00',
    '토-일: 11:30 - 21:30',
    '공휴일: 11:30 - 21:00'
  ],
  description: '신선한 재료와 정갈한 조리법으로 전통 한식의 참맛을 즐길 수 있는 강남의 대표 한식당입니다. 모든 찬류는 매일 아침 직접 준비하며, 계절에 따라 제철 식재료를 활용한 특별 메뉴를 선보입니다.',
  price: '$$',
  menu: [
    {
      name: '비빔밥 세트',
      description: '신선한 계절 야채와 고추장이 어우러진 전통 비빔밥',
      price: '13,000원',
      image: 'https://picsum.photos/300/200?food=21',
      popular: true
    },
    {
      name: '갈비찜 정식',
      description: '특제 양념에 24시간 숙성시킨 소갈비찜과 찬 모듬',
      price: '22,000원',
      image: 'https://picsum.photos/300/200?food=22'
    },
    {
      name: '해물순두부찌개',
      description: '신선한 해산물과 부드러운 순두부가 조화로운 찌개',
      price: '15,000원',
      image: 'https://picsum.photos/300/200?food=23'
    },
    {
      name: '불고기 정식',
      description: '다양한 채소와 함께 구운 부드러운 불고기',
      price: '17,000원',
      image: 'https://picsum.photos/300/200?food=24'
    }
  ],
  photos: [
    'https://picsum.photos/800/500?food=31',
    'https://picsum.photos/800/500?food=32',
    'https://picsum.photos/800/500?food=33',
    'https://picsum.photos/800/500?food=34',
    'https://picsum.photos/800/500?food=35',
    'https://picsum.photos/800/500?food=36'
  ],
  features: [
    '예약 가능', 
    '주차 가능', 
    '단체석', 
    '배달 가능', 
    '포장 가능', 
    '무선 인터넷',
    '반려동물 동반 불가'
  ],
  reviewList: [
    {
      id: 1,
      user: '맛있는여행자',
      avatar: 'https://picsum.photos/100/100?face=1',
      rating: 5,
      date: '2025-04-10',
      content: '비빔밥이 정말 맛있어요! 고추장의 맵기가 적절하고 야채가 정말 신선했습니다. 직원분들도 친절하고 매장도 깔끔해서 자주 방문하게 될 것 같아요.',
      photos: ['https://picsum.photos/500/300?review=11', 'https://picsum.photos/500/300?review=12']
    },
    {
      id: 2,
      user: '맛집탐험가',
      avatar: 'https://picsum.photos/100/100?face=2',
      rating: 4,
      date: '2025-04-05',
      content: '갈비찜 정식을 주문했는데 고기가 정말 부드럽고 맛있었어요. 반찬도 다양하고 맛있었습니다. 가격이 조금 있지만 그만한 가치가 있어요. 주차가 조금 불편한 점이 아쉽네요.',
    },
    {
      id: 3,
      user: '서울맛집러',
      avatar: 'https://picsum.photos/100/100?face=3',
      rating: 5,
      date: '2025-03-22',
      content: '회사 근처라 자주 가는데 언제나 퀄리티가 일정해요. 특히 계절 특선 메뉴는 꼭 먹어보세요. 지금은 봄나물 비빔밥이 정말 맛있어요!',
      photos: ['https://picsum.photos/500/300?review=13']
    },
  ]
};

export default function RestaurantDetail() {
  const params = useParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPhoto, setSelectedPhoto] = useState(restaurantData.photos[0]);

  // In a real app, we would fetch the restaurant data using the ID
  // const { id } = params;
  // useEffect(() => {
  //   const fetchRestaurantData = async () => {
  //     const response = await fetch(`/api/restaurants/${id}`);
  //     const data = await response.json();
  //     setRestaurantData(data);
  //   };
  //   fetchRestaurantData();
  // }, [id]);

  const goBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b p-4 md:hidden flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg">{restaurantData.name}</h1>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-orange-600 text-orange-600' : ''}`} />
          </Button>
        </div>
      </header>

      {/* Desktop Header - Hidden on Mobile */}
      <header className="hidden md:block sticky top-0 z-50 bg-white border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-orange-600">맛집지도</Link>
            <nav className="hidden md:flex gap-6 ml-10">
              <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
              <Link href="/map" className="text-gray-600 hover:text-orange-600">지도로 보기</Link>
              <Link href="/list" className="text-gray-600 hover:text-orange-600">리스트로 보기</Link>
              <Link href="/favorites" className="text-gray-600 hover:text-orange-600">즐겨찾기</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-orange-600 hover:bg-orange-700">
              로그인 / 회원가입
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="text-gray-600 hover:text-orange-600 text-lg">홈</Link>
                  <Link href="/map" className="text-gray-600 hover:text-orange-600 text-lg">지도로 보기</Link>
                  <Link href="/list" className="text-gray-600 hover:text-orange-600 text-lg">리스트로 보기</Link>
                  <Link href="/favorites" className="text-gray-600 hover:text-orange-600 text-lg">즐겨찾기</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Back Button & Breadcrumbs - Desktop Only */}
        <div className="hidden md:flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={goBack} className="flex items-center mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> 뒤로가기
          </Button>
          <div className="text-sm text-gray-500">
            홈 &gt; 서울 &gt; 강남구 &gt; {restaurantData.name}
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" /> 공유하기
            </Button>
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              size="sm"
              className={isBookmarked ? "bg-orange-600" : ""}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="h-4 w-4 mr-1" /> 
              {isBookmarked ? "저장됨" : "저장하기"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-video w-full">
                <Image 
                  src={selectedPhoto} 
                  alt={restaurantData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 overflow-x-auto">
                <div className="flex gap-2">
                  {restaurantData.photos.map((photo, index) => (
                    <button 
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 ${selectedPhoto === photo ? 'border-orange-600' : 'border-transparent'}`}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <Image 
                        src={photo} 
                        alt={`${restaurantData.name} 사진 ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                  <Link 
                    href={`/restaurants/${restaurantData.id}/photos`}
                    className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-100 rounded text-sm text-gray-600 hover:bg-gray-200"
                  >
                    모든 사진<br />보기
                  </Link>
                </div>
              </div>
            </div>

            {/* Restaurant Info Tabs - Replaced with custom tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              {/* Tab Navigation */}
              <div className="flex border-b">
                <button 
                  className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'overview' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  상세정보
                </button>
                <button 
                  className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'menu' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('menu')}
                >
                  메뉴
                </button>
                <button 
                  className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === 'reviews' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  리뷰 ({restaurantData.reviewList.length})
                </button>
              </div>
              
              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <div className="p-4 md:p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">식당 소개</h2>
                      <p className="text-gray-600">{restaurantData.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">영업 정보</h2>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">주소</div>
                            <div className="text-gray-600">{restaurantData.address}</div>
                            <Link
                              href={`https://map.naver.com/search/${encodeURIComponent(restaurantData.address)}`}
                              target="_blank"
                              className="text-orange-600 text-sm hover:underline inline-flex items-center mt-1"
                            >
                              지도에서 보기 <ChevronRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">전화번호</div>
                            <div className="text-gray-600">{restaurantData.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">영업시간</div>
                            <div className="text-gray-600">
                              {restaurantData.hours.map((hour, index) => (
                                <div key={index}>{hour}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">편의시설 및 특징</h2>
                      <div className="flex flex-wrap gap-2">
                        {restaurantData.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Menu Tab Content */}
              {activeTab === 'menu' && (
                <div className="p-4 md:p-6">
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold">메뉴</h2>
                    <div className="grid gap-4">
                      {restaurantData.menu.map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              {item.image && (
                                <div className="w-full md:w-1/4 h-40 md:h-auto relative">
                                  <Image 
                                    src={item.image} 
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                  {item.popular && (
                                    <div className="absolute top-0 left-0 bg-orange-600 text-white text-xs px-2 py-1">
                                      인기
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="p-4 flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-bold text-lg">{item.name}</h3>
                                  <span className="font-bold text-orange-600">{item.price}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab Content */}
              {activeTab === 'reviews' && (
                <div className="p-4 md:p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        리뷰 ({restaurantData.reviewList.length})
                      </h2>
                      <Button size="sm" className="bg-orange-600">
                        <MessageSquare className="h-4 w-4 mr-1" /> 리뷰 작성
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-orange-50 flex flex-col md:flex-row items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-orange-600">{restaurantData.rating}</div>
                        <div className="flex my-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(restaurantData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">{restaurantData.reviews}개의 리뷰</div>
                      </div>

                      <div className="flex-1 md:border-l md:pl-4 grid grid-cols-1 gap-1 w-full">
                        {Array(5).fill(0).map((_, i) => {
                          const starCount = 5 - i;
                          // Calculate percentage (mock data)
                          const percentage = starCount === 5 ? 65 : starCount === 4 ? 25 : starCount === 3 ? 7 : 3;
                          
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 w-12">
                                {starCount} <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full flex-1">
                                <div 
                                  className="h-2 bg-orange-600 rounded-full" 
                                  style={{ width: `${percentage}%` }} 
                                />
                              </div>
                              <div className="text-xs w-10">{percentage}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {restaurantData.reviewList.map((review) => (
                        <Card key={review.id} className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                                  <Image 
                                    src={review.avatar} 
                                    alt={review.user}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{review.user}</div>
                                  <div className="text-xs text-gray-500">
                                    {format(new Date(review.date), 'yyyy년 MM월 dd일')}
                                  </div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <p className="mt-3 text-gray-700">{review.content}</p>
                            
                            {review.photos && review.photos.length > 0 && (
                              <div className="mt-3 flex gap-2 overflow-x-auto py-2">
                                {review.photos.map((photo, photoIndex) => (
                                  <div key={photoIndex} className="relative h-24 w-36 flex-shrink-0 rounded overflow-hidden">
                                    <Image 
                                      src={photo} 
                                      alt={`리뷰 사진 ${photoIndex + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-3 flex justify-between items-center text-sm">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                                <Heart className="h-4 w-4 mr-1" /> 도움됨
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                                <MessageSquare className="h-4 w-4 mr-1" /> 답글
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline">
                        더 많은 리뷰 보기
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Restaurant Quick Info */}
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <h1 className="text-2xl font-bold mb-2">{restaurantData.name}</h1>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(restaurantData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-1 font-semibold">{restaurantData.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({restaurantData.reviews})</span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {restaurantData.type}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {restaurantData.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> 
                    {restaurantData.address}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Phone className="h-4 w-4 mr-1" /> 
                    {restaurantData.phone}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" /> 
                    {restaurantData.hours[0]}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Phone className="h-4 w-4 mr-1" /> 전화하기
                  </Button>
                  <Button 
                    variant={isBookmarked ? "default" : "outline"} 
                    className={isBookmarked ? "bg-orange-600" : "border-orange-600 text-orange-600 hover:bg-orange-50"}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className="h-4 w-4 mr-1" /> 
                    {isBookmarked ? "저장됨" : "저장하기"}
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-1" /> 공유하기
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Map Preview */}
            <Card className="shadow-sm overflow-hidden">
              <div className="relative h-64 w-full">
                <Image 
                  src={`https://picsum.photos/640/400?map=${restaurantData.id}`} 
                  alt="지도 위치"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-30 flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    className="bg-white bg-opacity-90 hover:bg-white"
                  >
                    <MapPin className="h-4 w-4 mr-1 text-orange-600" /> 
                    지도에서 보기
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">오시는 길</span>
                    <Link 
                      href={`https://map.naver.com/search/${encodeURIComponent(restaurantData.address)}`}
                      target="_blank"
                      className="text-orange-600 hover:underline inline-flex items-center"
                    >
                      길찾기 <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="font-medium">주차</span>
                      <span className="ml-2 text-gray-600">
                        {restaurantData.features.includes('주차 가능') ? '가능' : '불가능'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="font-medium">가까운 역</span>
                      <span className="ml-2 text-gray-600">강남역 3번 출구에서 도보 5분</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Nearby Restaurants */}
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3">근처 맛집</h3>
                <div className="space-y-3">
                  {Array(3).fill(0).map((_, index) => (
                    <Link 
                      key={index} 
                      href={`/restaurants/${index + 2}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                        <Image 
                          src={`https://picsum.photos/200/200?restaurant=${index + 5}`} 
                          alt={`근처 맛집 ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-orange-600 transition-colors">
                          {index === 0 ? '강남 스시오마카세' : index === 1 ? '서울 양식당' : '테헤란로 분식'}
                        </h4>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-1">
                            {index === 0 ? '4.9' : index === 1 ? '4.6' : '4.7'} 
                            <span className="text-gray-500 ml-1">({index === 0 ? '156' : index === 1 ? '89' : '124'})</span>
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {index === 0 ? '일식' : index === 1 ? '양식' : '분식'} • 
                          {index === 0 ? ' 150m' : index === 1 ? ' 300m' : ' 450m'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
