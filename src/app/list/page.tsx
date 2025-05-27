'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star,
  Menu as MenuIcon,
  ChevronDown,
  Bookmark,
  Map,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import OpenAI from 'openai';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Restaurant {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: string[];
  image: string;
  location: string;
  price: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export interface RestaurantForRecommendation {
  id: number;
  name: string;
  type: string;
  reviews: string[];
}

export default function ListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    categories: ['한식', '일식'], // Active categories
    price: [1, 4], // Price range from $ to $$$$
    rating: 0, // Minimum rating
    distance: 5, // Max distance in km
    features: ['예약 가능', '주차 가능'] // Selected features
  });

  // Mock restaurants data - same as in map view
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: '나주혁신점 맛있는 갈비찜',
      type: '한식',
      rating: 4.8,
      reviews: [
        "갈비찜이 정말 부드럽고 맛있어요. 특히 양념이 잘 배어 있어서 좋았습니다.",
        "직원들이 친절하고 매장도 깨끗해요. 단체 모임에 좋아요.",
        "주차장이 넓어서 편리했어요. 가격은 조금 있지만 맛으로 보상받는 느낌!",
      ],
      image: 'https://picsum.photos/600/400?food=1',
      location: '전남 나주시 혁신로 12',
      price: '$$',
      distance: '0.3km',
      coordinates: { lat: 35.0189, lng: 126.7862 },
      features: ['예약 가능', '주차 가능']
    },
    {
      id: 2,
      name: '혁신도시 스시오마카세',
      type: '일식',
      rating: 4.9,
      reviews: [
        "일식 전문점으로 유명합니다. 스시가 맛있어요.",
        "직원들이 친절하고 서비스가 좋아요.",
        "주차장이 넓어서 편리했어요. 가격은 조금 있지만 맛으로 보상받는 느낌!",
      ],
      image: 'https://picsum.photos/600/400?food=2',
      location: '전남 나주시 빛가람로 740',
      price: '$$$',
      distance: '0.5km',
      coordinates: { lat: 35.0203, lng: 126.7895 },
      features: ['예약 가능', '주차 가능']
    },
    {
      id: 3,
      name: '빛가람 부대찌개',
      type: '한식',
      rating: 4.6,
      reviews: [
        "부대찌개가 맛있어요. 양념이 적당하고 고기도 맛있어요.",
        "직원들이 친절하고 매장도 깨끗해요. 단체 모임에 좋아요.",
        "주차장이 넓어서 편리했어요. 가격은 조금 있지만 맛으로 보상받는 느낌!",
      ],
      image: 'https://picsum.photos/600/400?food=3',
      location: '전남 나주시 빛가람동 170',
      price: '$',
      distance: '0.8km',
      coordinates: { lat: 35.0173, lng: 126.7838 },
      features: ['예약 가능', '주차 가능']
    },
    {
      id: 4,
      name: '나주 토스카나',
      type: '양식',
      rating: 4.7,
      reviews: [
        "토스카나가 맛있어요. 특히 크림 스프가 일품이에요.",
        "직원들이 친절하고 매장도 깨끗해요. 단체 모임에 좋아요.",
        "주차장이 넓어서 편리했어요. 가격은 조금 있지만 맛으로 보상받는 느낌!",
      ],
      image: 'https://picsum.photos/600/400?food=4',
      location: '전남 나주시 빛가람동 192-3',
      price: '$$$',
      distance: '1.2km',
      coordinates: { lat: 35.0159, lng: 126.7813 },
      features: ['예약 가능', '주차 가능']
    },
    {
      id: 5,
      name: '혁신 손만두',
      type: '한식',
      rating: 4.5,
      reviews: [
        "손만두가 맛있어요. 특히 양념이 잘 배어 있어서 좋았습니다.",
        "직원들이 친절하고 매장도 깨끗해요. 단체 모임에 좋아요.",
        "주차장이 넓어서 편리했어요. 가격은 조금 있지만 맛으로 보상받는 느낌!",
      ],
      image: 'https://picsum.photos/600/400?food=5',
      location: '전남 나주시 빛가람로 661',
      price: '$',
      distance: '2.1km',
      coordinates: { lat: 35.0211, lng: 126.7927 },
      features: ['예약 가능', '주차 가능']
    }
  ];

  // Filter categories
  const categories = [
    { name: '한식', count: 1243 },
    { name: '일식', count: 568 },
    { name: '중식', count: 721 },
    { name: '양식', count: 489 },
    { name: '카페', count: 876 },
    { name: '분식', count: 354 }
  ];

  // Restaurant features for filtering
  const features = [
    '예약 가능',
    '주차 가능',
    '배달 가능',
    '포장 가능',
    '단체석',
    '야외석',
    '반려동물 동반',
    '무선 인터넷',
    '주말 영업',
    '심야 영업'
  ];

  // Filter restaurants based on selected filters
  const getFilteredRestaurants = () => {
    return restaurants.filter(restaurant => {
      if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(restaurant.type)) return false;
      if (activeFilters.features.length > 0 && !activeFilters.features.every(feature => restaurant.features.includes(feature))) return false;
      if (searchQuery.trim() !== '' && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setActiveFilters(prev => {
      const newCategories = [...prev.categories];
      if (newCategories.includes(category)) {
        return {
          ...prev,
          categories: newCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...newCategories, category]
        };
      }
    });
  };

  // Toggle feature filter
  const toggleFeature = (feature: string) => {
    setActiveFilters(prev => {
      const newFeatures = [...prev.features];
      if (newFeatures.includes(feature)) {
        return {
          ...prev,
          features: newFeatures.filter(f => f !== feature)
        };
      } else {
        return {
          ...prev,
          features: [...newFeatures, feature]
        };
      }
    });
  };

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setActiveFilters(prev => ({
      ...prev,
      price: value
    }));
  };

  // Handle rating filter change
  const handleRatingChange = (value: number[]) => {
    setActiveFilters(prev => ({
      ...prev,
      rating: value[0]
    }));
  };

  // Handle distance filter change
  const handleDistanceChange = (value: number[]) => {
    setActiveFilters(prev => ({
      ...prev,
      distance: value[0]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      price: [1, 4],
      rating: 0,
      distance: 5,
      features: []
    });
  };

  // When initializing OpenAI
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const restaurantsWithReviews = restaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    type: restaurant.type,
    reviews: restaurant.reviews || [],
  }));

  // Add these states for the recommendation dialog
  const [criteria, setCriteria] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);

  // Add this function for generating recommendations
  const handleGetRecommendation = () => {
    if (!criteria.trim()) {
      setRecommendationError('추천 기준을 입력해주세요.');
      return;
    }

    setLoading(true);
    setRecommendationError(null);
    
    // Simulating API call with setTimeout
    setTimeout(() => {
      try {
        // Select a random restaurant for the demo
        const filteredRestaurants = getFilteredRestaurants();
        const selectedRestaurant = filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
        
        setRecommendation(`"${selectedRestaurant.name}"을(를) 추천합니다. 
        
${criteria}를(을) 중요하게 생각하시는 고객님께 적합한 맛집입니다. 리뷰를 분석한 결과, 이 식당은 깔끔한 환경과 친절한 서비스를 제공하며 음식의 맛이 일관되게 좋다는 평가를 받았습니다.`);
      } catch (err) {
        setRecommendationError('추천을 생성하는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const resetRecommendation = () => {
    setCriteria('');
    setRecommendation(null);
    setRecommendationError(null);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold text-orange-600">맛집지도</Link>
            <nav className="hidden md:flex gap-6 ml-10">
              <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
              <Link href="/map" className="text-gray-600 hover:text-orange-600">지도로 보기</Link>
              <Link href="/list" className="text-orange-600 border-b-2 border-orange-600 pb-1">리스트로 보기</Link>
              <Link href="/favorites" className="text-gray-600 hover:text-orange-600">즐겨찾기</Link>
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
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="text-gray-600 hover:text-orange-600 text-lg">홈</Link>
                  <Link href="/map" className="text-gray-600 hover:text-orange-600 text-lg">지도로 보기</Link>
                  <Link href="/list" className="text-orange-600 font-medium text-lg">리스트로 보기</Link>
                  <Link href="/favorites" className="text-gray-600 hover:text-orange-600 text-lg">즐겨찾기</Link>
                  <Button className="bg-orange-600 hover:bg-orange-700 mt-4 w-full">
                    로그인 / 회원가입
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* List Container with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Filters Sidebar - Desktop */}
        <div 
          className={`w-80 bg-white border-r flex-shrink-0 h-[calc(100vh-65px)] overflow-y-auto transition-all duration-300 hidden md:block ${filtersVisible ? '' : '-ml-80'}`}
        >
          {/* Same filters as in map view */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">필터</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                초기화
              </Button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="지역, 식당 이름, 음식 검색..."
                  className="pl-8 bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">음식 카테고리</h3>
                <button className="text-sm text-orange-600">모두 보기</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <div key={category.name} className="flex items-center gap-2">
                    <Checkbox 
                      id={`category-${category.name}`}
                      checked={activeFilters.categories.includes(category.name)}
                      onCheckedChange={() => toggleCategory(category.name)}
                    />
                    <label 
                      htmlFor={`category-${category.name}`}
                      className="text-sm cursor-pointer flex-1 text-gray-700"
                    >
                      {category.name} <span className="text-gray-400 text-xs">({category.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">가격대</h3>
              <div className="px-1">
                <Slider
                  defaultValue={[1, 4]}
                  min={1}
                  max={4}
                  step={1}
                  value={activeFilters.price}
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$ 저렴</span>
                  <span>$$ 보통</span>
                  <span>$$$ 고급</span>
                  <span>$$$$ 특별</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">최소 평점</h3>
              <div className="px-1">
                <Slider
                  defaultValue={[0]}
                  min={0}
                  max={5}
                  step={0.5}
                  value={[activeFilters.rating]}
                  onValueChange={handleRatingChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>모두</span>
                  <span className="flex items-center">
                    3.0 <Star className="h-3 w-3 ml-0.5 text-yellow-500 fill-yellow-500" />
                  </span>
                  <span className="flex items-center">
                    4.0 <Star className="h-3 w-3 ml-0.5 text-yellow-500 fill-yellow-500" />
                  </span>
                  <span className="flex items-center">
                    5.0 <Star className="h-3 w-3 ml-0.5 text-yellow-500 fill-yellow-500" />
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Distance Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">최대 거리</h3>
              <div className="px-1">
                <Slider
                  defaultValue={[5]}
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={[activeFilters.distance]}
                  onValueChange={handleDistanceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.5km</span>
                  <span>3km</span>
                  <span>5km</span>
                  <span>10km</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Features Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">편의 시설</h3>
              <div className="grid grid-cols-1 gap-2">
                {features.map(feature => (
                  <div key={feature} className="flex items-center gap-2">
                    <Checkbox 
                      id={`feature-${feature}`}
                      checked={activeFilters.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <label 
                      htmlFor={`feature-${feature}`}
                      className="text-sm cursor-pointer text-gray-700"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 relative">
          {/* Toggle Sidebar Button */}
          <button 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="absolute left-4 top-4 z-10 bg-white p-2 rounded-md shadow-md hidden md:flex items-center justify-center"
          >
            {filtersVisible ? (
              <ChevronDown className="h-5 w-5 rotate-90" />
            ) : (
              <Filter className="h-5 w-5" />
            )}
          </button>

          {/* Toggle to Map View Button */}
          <Link 
            href="/map" 
            className="absolute right-4 top-4 z-10 bg-white p-2 rounded-md shadow-md hidden md:flex items-center justify-center"
          >
            <Map className="h-5 w-5" />
          </Link>

          {/* Restaurant List */}
          <div className="container py-6 px-4 md:px-6 overflow-y-auto h-[calc(100vh-65px)]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">나주혁신도시 맛집</h1>
              <p className="text-gray-500">총 {getFilteredRestaurants().length}개의 맛집을 찾았습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredRestaurants().map(restaurant => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
                      <Bookmark className="h-4 w-4 text-gray-400 hover:text-orange-600" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{restaurant.name}</h3>
                        <div className="flex items-center mt-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1 font-medium">{restaurant.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({restaurant.reviews.length})</span>
                          <span className="text-xs ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded-full">{restaurant.type}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {restaurant.price}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-0.5" /> 
                      {restaurant.location} • {restaurant.distance}
                    </div>
                    <div className="mt-3 flex gap-1 flex-wrap">
                      {restaurant.features.map(feature => (
                        <span key={feature} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={`/restaurants/${restaurant.id}`}
                        className="text-sm text-orange-600 font-medium hover:text-orange-700"
                      >
                        자세히 보기
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg rounded-full px-6">
                <Filter className="h-4 w-4 mr-2" /> 필터
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              {/* Same mobile filters as in map view */}
              <div className="pt-6 px-4 overflow-y-auto h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">필터</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    초기화
                  </Button>
                </div>

                <div className="space-y-5">
                  {/* Search Bar */}
                  <div>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="지역, 식당 이름, 음식 검색..."
                        className="pl-8 bg-gray-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-2">음식 카테고리</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <div key={category.name} className="flex items-center gap-2">
                          <Checkbox 
                            id={`mobile-category-${category.name}`}
                            checked={activeFilters.categories.includes(category.name)}
                            onCheckedChange={() => toggleCategory(category.name)}
                          />
                          <label 
                            htmlFor={`mobile-category-${category.name}`}
                            className="text-sm cursor-pointer flex-1 text-gray-700"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">가격대</h3>
                    <div className="px-1">
                      <Slider
                        defaultValue={[1, 4]}
                        min={1}
                        max={4}
                        step={1}
                        value={activeFilters.price}
                        onValueChange={handlePriceChange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>$ 저렴</span>
                        <span>$$ 보통</span>
                        <span>$$$ 고급</span>
                        <span>$$$$ 특별</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Apply Button */}
                  <div className="pt-4">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      필터 적용하기
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Replace the RecommendationDialog component with this */}
      <Dialog open={showRecommendation} onOpenChange={setShowRecommendation}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 rounded-full shadow-lg z-20">
            <Lightbulb className="mr-2 h-4 w-4" />
            맛집 추천받기
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>맞춤 맛집 추천</DialogTitle>
            <DialogDescription>
              무엇을 가장 중요하게 생각하시나요? AI가 맞춤 맛집을 추천해 드립니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!recommendation ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="criteria" className="text-right">
                    평가 기준
                  </Label>
                  <Input
                    id="criteria"
                    placeholder="예: 가성비, 분위기, 주차 편리성..."
                    className="col-span-3"
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-start-2 col-span-3 text-xs text-gray-500">
                    예시: "아이와 함께 가기 좋은 곳", "데이트하기 좋은 분위기", "주차가 편리한 곳"
                  </div>
                </div>
                {recommendationError && (
                  <div className="col-span-4 text-red-500 text-sm">
                    {recommendationError}
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">AI 추천 결과</h4>
                  <p className="text-gray-700 whitespace-pre-line">{recommendation}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {!recommendation ? (
              <Button 
                type="submit" 
                onClick={handleGetRecommendation}
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                추천받기
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={resetRecommendation}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                다시 추천받기
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
