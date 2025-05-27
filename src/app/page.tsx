'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Star, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Menu,
  Filter,
  GalleryVertical,
  Bookmark,
  Map,
  Heart,
  Clock,
  Utensils,
  Smile,
  Music,
  Car,
  DollarSign
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// Add a new RegionSelector component near the PreferencesSection

function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState<{
    province: string | null;
    city: string | null;
    district: string | null;
  }>({
    province: null,
    city: null,
    district: null
  });

  // Simulated region data
  const provinces = [
    { name: '서울', id: 'seoul' },
    { name: '경기', id: 'gyeonggi' },
    { name: '부산', id: 'busan' },
    { name: '제주', id: 'jeju' }
  ];

  const cityOptions = {
    seoul: [{ name: '전체', id: 'all' }],
    gyeonggi: [
      { name: '수원시', id: 'suwon' },
      { name: '성남시', id: 'seongnam' },
      { name: '용인시', id: 'yongin' }
    ],
    busan: [{ name: '전체', id: 'all' }],
    jeju: [
      { name: '제주시', id: 'jeju_city' },
      { name: '서귀포시', id: 'seogwipo' }
    ]
  };

  const districts = {
    seoul_all: [
      { name: '강남구', id: 'gangnam' },
      { name: '마포구', id: 'mapo' },
      { name: '종로구', id: 'jongno' },
      { name: '용산구', id: 'yongsan' }
    ],
    suwon: [
      { name: '팔달구', id: 'paldal' },
      { name: '영통구', id: 'yeongtong' }
    ],
    seongnam: [
      { name: '분당구', id: 'bundang' },
      { name: '수정구', id: 'sujeong' }
    ],
    yongin: [
      { name: '수지구', id: 'suji' },
      { name: '기흥구', id: 'giheung' }
    ],
    jeju_city: [
      { name: '제주시내', id: 'jeju_downtown' },
      { name: '조천읍', id: 'jocheon' }
    ],
    seogwipo: [
      { name: '서귀포시내', id: 'seogwipo_downtown' },
      { name: '남원읍', id: 'namwon' }
    ]
  };

  // Get current cities based on selected province
  const getCurrentCities = () => {
    if (!selectedRegion.province) return [];
    return cityOptions[selectedRegion.province as keyof typeof cityOptions] || [];
  };

  // Get current districts based on selected province and city
  const getCurrentDistricts = () => {
    if (!selectedRegion.province || !selectedRegion.city) return [];
    const key = `${selectedRegion.province}_${selectedRegion.city}`;
    return districts[key as keyof typeof districts] || districts[`${selectedRegion.city}` as keyof typeof districts] || [];
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedRegion({
      province: provinceId,
      city: null,
      district: null
    });
  };

  const handleCityChange = (cityId: string) => {
    setSelectedRegion({
      ...selectedRegion,
      city: cityId,
      district: null
    });
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedRegion({
      ...selectedRegion,
      district: districtId
    });
  };

  const getLocationText = () => {
    if (selectedRegion.district) {
      const province = provinces.find(p => p.id === selectedRegion.province)?.name;
      
      // Find city name
      let cityName = '';
      if (selectedRegion.city === 'all') {
        cityName = '';
      } else {
        const availableCities = selectedRegion.province ? 
          (cityOptions[selectedRegion.province as keyof typeof cityOptions] || []) : [];
        cityName = availableCities.find(c => c.id === selectedRegion.city)?.name || '';
      }
      
      // Find district name
      const key = `${selectedRegion.province}_${selectedRegion.city}`;
      const districtList = districts[key as keyof typeof districts] || 
                         districts[`${selectedRegion.city}` as keyof typeof districts] || [];
      const district = districtList.find(d => d.id === selectedRegion.district)?.name;
      
      return `${province} ${cityName} ${district}`;
    }
    
    if (selectedRegion.city) {
      const province = provinces.find(p => p.id === selectedRegion.province)?.name;
      const availableCities = selectedRegion.province ? 
        (cityOptions[selectedRegion.province as keyof typeof cityOptions] || []) : [];
      const city = availableCities.find(c => c.id === selectedRegion.city)?.name;
      return `${province} ${city}`;
    }
    
    if (selectedRegion.province) {
      return provinces.find(p => p.id === selectedRegion.province)?.name || '';
    }
    
    return '위치를 선택해주세요';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">
        어느 지역의 맛집을 찾으시나요?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Province Selection */}
        <div>
          <h4 className="font-medium mb-2 text-sm">시/도</h4>
          <div className="grid grid-cols-2 gap-2">
            {provinces.map(province => (
              <Button
                key={province.id}
                variant={selectedRegion.province === province.id ? "default" : "outline"}
                className={selectedRegion.province === province.id ? "bg-orange-600" : ""}
                size="sm"
                onClick={() => handleProvinceChange(province.id)}
              >
                {province.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* City Selection */}
        <div>
          <h4 className="font-medium mb-2 text-sm">시/군/구</h4>
          <div className="grid grid-cols-2 gap-2">
            {getCurrentCities().map(city => (
              <Button
                key={city.id}
                variant={selectedRegion.city === city.id ? "default" : "outline"}
                className={selectedRegion.city === city.id ? "bg-orange-600" : ""}
                size="sm"
                onClick={() => handleCityChange(city.id)}
                disabled={!selectedRegion.province}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* District Selection */}
        <div>
          <h4 className="font-medium mb-2 text-sm">읍/면/동</h4>
          <div className="grid grid-cols-2 gap-2">
            {getCurrentDistricts().map(district => (
              <Button
                key={district.id}
                variant={selectedRegion.district === district.id ? "default" : "outline"}
                className={selectedRegion.district === district.id ? "bg-orange-600" : ""}
                size="sm"
                onClick={() => handleDistrictChange(district.id)}
                disabled={!selectedRegion.city}
              >
                {district.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-orange-50 rounded-md">
        <p className="text-center font-medium text-orange-800">
          {getLocationText()} 맛집을 추천해 드립니다
        </p>
      </div>
    </div>
  );
}

// Update the PreferencesSection component to include more detailed controls
function PreferencesSection() {
  const [activePreferences, setActivePreferences] = useState({
    ambiance: null as string | null,
    focus: null as string | null,
    practical: [] as string[],
    price: null as string | null,
    dietary: [] as string[],
  });

  const ambianceOptions = [
    { label: '조용한', value: 'quiet', icon: <Smile className="h-4 w-4" /> },
    { label: '활기찬', value: 'lively', icon: <Music className="h-4 w-4" /> },
    { label: '가족', value: 'family', icon: <Heart className="h-4 w-4" /> },
  ];

  const focusOptions = [
    { label: '맛', value: 'taste', icon: <Utensils className="h-4 w-4" /> },
    { label: '분위기', value: 'atmosphere', icon: <Music className="h-4 w-4" /> },
    { label: '서비스', value: 'service', icon: <Smile className="h-4 w-4" /> },
  ];

  const practicalOptions = [
    { label: '예약가능', value: 'reservation' },
    { label: '주차가능', value: 'parking', icon: <Car className="h-4 w-4" /> },
    { label: '야외석', value: 'outdoor' },
  ];

  const priceOptions = [
    { label: '가성비', value: 'budget', icon: <DollarSign className="h-4 w-4" /> },
    { label: '보통', value: 'mid-range', icon: <DollarSign className="h-4 w-4" /> },
    { label: '고급', value: 'premium', icon: <DollarSign className="h-4 w-4" /> },
  ];
  
  const dietaryOptions = [
    { label: '채식', value: 'vegetarian' },
    { label: '글루텐프리', value: 'gluten-free' },
    { label: '할랄', value: 'halal' },
  ];

  const togglePreference = (category: string, value: string) => {
    setActivePreferences(prev => {
      if (category === 'practical' || category === 'dietary') {
        const categoryArray = prev[category as 'practical' | 'dietary'] as string[];
        if (categoryArray.includes(value)) {
          return { ...prev, [category]: categoryArray.filter(p => p !== value) };
        } else {
          return { ...prev, [category]: [...categoryArray, value] };
        }
      } else {
        return { ...prev, [category]: prev[category as keyof typeof prev] === value ? null : value };
      }
    });
  };

  // Calculate the match score based on preferences
  const getMatchScore = () => {
    let score = 0;
    
    if (activePreferences.ambiance) score += 20;
    if (activePreferences.focus) score += 20;
    if (activePreferences.price) score += 20;
    score += activePreferences.practical.length * 10;
    score += activePreferences.dietary.length * 10;
    
    return Math.min(score, 100);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">취향에 맞는 맛집을 찾아보세요</h3>
      
      <div className="space-y-5">
        <div>
          <h4 className="font-medium mb-2">분위기</h4>
          <div className="flex gap-2">
            {ambianceOptions.map(option => (
              <Button
                key={option.value}
                variant={activePreferences.ambiance === option.value ? "default" : "outline"}
                className={`flex-1 ${activePreferences.ambiance === option.value ? "bg-orange-600" : ""}`}
                size="sm"
                onClick={() => togglePreference('ambiance', option.value)}
              >
                {option.icon} <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">중요도</h4>
          <div className="flex gap-2">
            {focusOptions.map(option => (
              <Button
                key={option.value}
                variant={activePreferences.focus === option.value ? "default" : "outline"}
                className={`flex-1 ${activePreferences.focus === option.value ? "bg-orange-600" : ""}`}
                size="sm"
                onClick={() => togglePreference('focus', option.value)}
              >
                {option.icon} <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">편의사항</h4>
          <div className="flex gap-2">
            {practicalOptions.map(option => (
              <Button
                key={option.value}
                variant={activePreferences.practical.includes(option.value) ? "default" : "outline"}
                className={`flex-1 ${activePreferences.practical.includes(option.value) ? "bg-orange-600" : ""}`}
                size="sm"
                onClick={() => togglePreference('practical', option.value)}
              >
                {option.icon && <span className="mr-1">{option.icon}</span>} {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">가격대</h4>
          <div className="flex gap-2">
            {priceOptions.map(option => (
              <Button
                key={option.value}
                variant={activePreferences.price === option.value ? "default" : "outline"}
                className={`flex-1 ${activePreferences.price === option.value ? "bg-orange-600" : ""}`}
                size="sm"
                onClick={() => togglePreference('price', option.value)}
              >
                {option.icon} <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">식이 제한</h4>
          <div className="flex gap-2">
            {dietaryOptions.map(option => (
              <Button
                key={option.value}
                variant={activePreferences.dietary.includes(option.value) ? "default" : "outline"}
                className={`flex-1 ${activePreferences.dietary.includes(option.value) ? "bg-orange-600" : ""}`}
                size="sm"
                onClick={() => togglePreference('dietary', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gray-100 h-2.5 rounded-full mb-3">
          <div 
            className="bg-orange-600 h-2.5 rounded-full" 
            style={{ width: `${getMatchScore()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>프로필 완성도: {getMatchScore()}%</span>
          {getMatchScore() < 50 ? (
            <span className="text-orange-600">더 많은 취향을 선택해주세요</span>
          ) : (
            <span className="text-green-600">좋은 추천을 위한 준비가 되었습니다</span>
          )}
        </div>
        <Button className="w-full bg-orange-600 hover:bg-orange-700">
          맞춤 맛집 추천받기
        </Button>
      </div>
    </div>
  );
}

// Update the PersonalizedRecommendations component to improve display of matches
function PersonalizedRecommendations() {
  const recommendations = [
    {
      id: 1,
      name: '강남 깔끔한 한식당',
      matchScore: 97,
      type: '한식',
      highlight: '비빔밥 세트',
      rating: 4.8,
      image: 'https://picsum.photos/600/400?food=10',
      location: '서울 강남구',
      bestMatch: '조용한 분위기 + 깔끔한 서비스',
      personalized: {
        ambiance: '조용한',
        focus: '맛과 서비스',
        practical: ['예약가능', '주차가능'],
        price: '보통',
      }
    },
    {
      id: 2,
      name: '신촌 모던 일식',
      matchScore: 92,
      type: '일식',
      highlight: '오마카세 코스',
      rating: 4.9,
      image: 'https://picsum.photos/600/400?food=11',
      location: '서울 서대문구',
      bestMatch: '프리미엄 경험 + 주차 가능',
      personalized: {
        ambiance: '모던한',
        focus: '분위기와 맛',
        practical: ['예약필수', '주차가능'],
        price: '고급',
      }
    },
    {
      id: 3,
      name: '홍대 숨은 양식당',
      matchScore: 88,
      type: '양식',
      highlight: '트러플 파스타',
      rating: 4.7,
      image: 'https://picsum.photos/600/400?food=12',
      location: '서울 마포구',
      bestMatch: '맛 중심 + 합리적 가격',
      personalized: {
        ambiance: '활기찬',
        focus: '맛 중심',
        practical: ['야외석'],
        price: '가성비',
      }
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-5 rounded-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-800 mb-2">당신을 위한 맛집 추천</h3>
        <p className="text-gray-600 mb-4 text-sm">선택하신 취향과 선호도를 기반으로 추천된 맛집입니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="absolute top-0 left-0 bg-orange-600 text-white px-2 py-1 text-xs font-bold">
                  {restaurant.matchScore}% 일치
                </div>
                <div className="h-36 relative">
                  <Image 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-bold text-sm truncate">{restaurant.name}</h4>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium ml-1">{restaurant.rating}</span>
                    <span className="text-xs ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded-full">
                      {restaurant.type}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">분위기:</span>
                      <span className="font-medium">{restaurant.personalized.ambiance}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">특징:</span>
                      <span className="font-medium">{restaurant.personalized.focus}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">가격대:</span>
                      <span className="font-medium">{restaurant.personalized.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {restaurant.personalized.practical.map((feature, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <Button variant="link" className="text-orange-600 p-0">
            더 많은 맞춤 추천 보기 <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredRestaurants = [
    {
      id: 1,
      name: '서울 맛집 본점',
      type: '한식',
      rating: 4.8,
      reviews: 342,
      image: 'https://picsum.photos/600/400?food=1',
      location: '서울 강남구',
      price: '$$'
    },
    {
      id: 2,
      name: '오마카세 스시 하루',
      type: '일식',
      rating: 4.9,
      reviews: 126,
      image: 'https://picsum.photos/600/400?food=2',
      location: '서울 마포구',
      price: '$$$'
    },
    {
      id: 3,
      name: '셰프의 부대찌개',
      type: '한식',
      rating: 4.6,
      reviews: 258,
      image: 'https://picsum.photos/600/400?food=3',
      location: '서울 용산구',
      price: '$'
    },
    {
      id: 4,
      name: '라따뚜이 프렌치',
      type: '양식',
      rating: 4.7,
      reviews: 187,
      image: 'https://picsum.photos/600/400?food=4',
      location: '서울 서초구',
      price: '$$$'
    }
  ];

  const foodCategories = [
    { name: '한식', icon: '🍲', count: 1243 },
    { name: '일식', icon: '🍣', count: 568 },
    { name: '중식', icon: '🥢', count: 721 },
    { name: '양식', icon: '🍝', count: 489 },
    { name: '카페', icon: '☕', count: 876 },
    { name: '분식', icon: '🍜', count: 354 }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-orange-600">맛집지도</div>
            <nav className="hidden md:flex gap-6 ml-10">
              <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
              <Link href="/map" className="text-gray-600 hover:text-orange-600">지도로 보기</Link>
              <Link href="/list" className="text-gray-600 hover:text-orange-600">리스트로 보기</Link>
              <Link href="/favorites" className="text-gray-600 hover:text-orange-600">즐겨찾기</Link>
              <Link href="/about" className="text-gray-600 hover:text-orange-600">서비스 소개</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-orange-600 hover:bg-orange-700 hidden md:flex">
              로그인 / 회원가입
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="text-gray-600 hover:text-orange-600 text-lg">홈</Link>
                  <Link href="/map" className="text-gray-600 hover:text-orange-600 text-lg">지도로 보기</Link>
                  <Link href="/list" className="text-gray-600 hover:text-orange-600 text-lg">리스트로 보기</Link>
                  <Link href="/favorites" className="text-gray-600 hover:text-orange-600 text-lg">즐겨찾기</Link>
                  <Link href="/about" className="text-gray-600 hover:text-orange-600 text-lg">서비스 소개</Link>
                  <Button className="bg-orange-600 hover:bg-orange-700 mt-4 w-full">
                    로그인 / 회원가입
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-10 md:py-20">
        <div className="container">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              당신 주변의 <span className="text-orange-600">맛집을 발견</span>하세요
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">
              지역, 음식종류, 분위기, 가격대별로 딱 맞는 맛집을 찾아보세요.
              실시간 리뷰와 평점으로 믿을 수 있는 맛집 정보를 제공합니다.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full shadow-lg mt-4 p-1 max-w-2xl mx-auto w-full flex items-center">
              <MapPin className="ml-4 text-orange-600 h-5 w-5" />
              <Input
                type="text"
                placeholder="지역, 식당 또는 음식 검색..."
                className="border-none focus-visible:ring-0 flex-1 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="rounded-full bg-orange-600 hover:bg-orange-700 px-6">
                <Search className="mr-2 h-4 w-4" /> 검색
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="rounded-full">
                <Utensils className="mr-1 h-3 w-3" /> 한식
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Utensils className="mr-1 h-3 w-3" /> 일식
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Utensils className="mr-1 h-3 w-3" /> 중식
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Utensils className="mr-1 h-3 w-3" /> 양식
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="mr-1 h-3 w-3" /> 필터
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Add the personalized preferences section after the Hero section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">내 취향에 맞는 맛집 찾기</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              당신의 취향과 선호도를 선택하면 맞춤형 맛집을 추천해 드립니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <RegionSelector />
              <PreferencesSection />
            </div>
            <div className="md:col-span-7">
              <PersonalizedRecommendations />
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Map className="text-orange-600 w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-2">지도로 보기</h3>
                <p className="text-gray-600 mb-4">내 주변 맛집을 지도에서 한눈에 확인하고 거리와 위치를 고려해 선택하세요.</p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 mt-auto">
                  지도 열기 <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <GalleryVertical className="text-orange-600 w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-2">리스트로 보기</h3>
                <p className="text-gray-600 mb-4">모든 맛집을 리스트로 한눈에 살펴보고 평점, 리뷰를 기준으로 비교해보세요.</p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 mt-auto">
                  리스트 보기 <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Heart className="text-orange-600 w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-2">맞춤 추천</h3>
                <p className="text-gray-600 mb-4">당신의 취향과 선호도를 분석해 딱 맞는 맛집을 추천해드립니다.</p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 mt-auto">
                  추천 받기 <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">음식 카테고리</h2>
            <p className="text-gray-600">다양한 종류의 맛집을 카테고리별로 찾아보세요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {foodCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}개의 맛집</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">인기 맛집</h2>
            <Link href="/popular" className="text-orange-600 hover:underline flex items-center">
              더 보기 <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Bookmark className="h-4 w-4 text-orange-600" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {restaurant.type}
                    </span>
                    <span className="text-xs text-gray-500">{restaurant.price}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 truncate">{restaurant.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({restaurant.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-orange-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">왜 맛집지도인가요?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              맛집지도는 정확한 정보와 실제 방문자의 리뷰를 바탕으로 최고의 맛집 경험을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Star className="text-orange-600 w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mb-2">신뢰할 수 있는 리뷰</h3>
              <p className="text-gray-600">실제 방문자의 정직한 리뷰와 평점으로 믿을 수 있는 정보를 제공합니다.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-orange-600 w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mb-2">정확한 위치 정보</h3>
              <p className="text-gray-600">네이버 지도 API를 활용한 정확한 위치 정보와 길찾기 서비스를 제공합니다.</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-orange-600 w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl mb-2">활발한 커뮤니티</h3>
              <p className="text-gray-600">음식 애호가들과 경험을 공유하고 숨은 맛집을 발견하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 맛집 탐색을 시작하세요
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            내 주변 맛집부터 특별한 장소까지, 맛집지도와 함께라면 더 쉽고 즐겁게 발견할 수 있습니다
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-8">
            지도로 탐색하기 <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-bold text-white text-xl mb-4">맛집지도</h3>
              <p className="text-gray-400 mb-6">
                전국 각지의 숨겨진 맛집을 한 곳에서 찾고,
                맛있는 경험을 나누는 플랫폼입니다.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Youtube size={20} />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">서비스</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">맛집 지도</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">맛집 리스트</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">맛집 리뷰 작성</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">맞춤 추천</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">고객 지원</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">자주 묻는 질문</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">맛집 등록 요청</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">파트너십 문의</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">피드백 보내기</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">법적 고지</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">이용약관</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">개인정보 처리방침</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">위치기반서비스 이용약관</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">쿠키 정책</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 맛집지도. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-white text-sm">사이트맵</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">접근성</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">문의하기</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
