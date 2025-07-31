#!/usr/bin/env python3
"""
Backend API Testing for Bonito Drive Guide
Tests all the main endpoints for the tourist attractions API
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://ceea23a8-dfe2-43ad-b181-7e8c53fb474b.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_health_endpoint():
    """Test the health check endpoint"""
    print("🔍 Testing Health Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed")
            print(f"   Status: {data.get('status')}")
            print(f"   Database: {data.get('database')}")
            print(f"   Version: {data.get('version')}")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Health check failed with error: {e}")
        return False

def test_list_attractions():
    """Test listing all attractions"""
    print("\n🔍 Testing List Attractions...")
    try:
        response = requests.get(f"{API_BASE}/attractions", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ List attractions successful")
            print(f"   Found {len(data)} attractions")
            
            if len(data) > 0:
                first_attraction = data[0]
                print(f"   First attraction: {first_attraction.get('name')}")
                print(f"   Category: {first_attraction.get('category')}")
                print(f"   Rating: {first_attraction.get('rating')}")
                
                # Verify required fields
                required_fields = ['id', 'name', 'category', 'rating', 'price', 'coordinates']
                missing_fields = [field for field in required_fields if field not in first_attraction]
                if missing_fields:
                    print(f"⚠️  Missing fields in attraction: {missing_fields}")
                else:
                    print(f"   All required fields present")
            
            return True
        else:
            print(f"❌ List attractions failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ List attractions failed with error: {e}")
        return False

def test_get_specific_attraction():
    """Test getting a specific attraction by ID"""
    print("\n🔍 Testing Get Specific Attraction (gruta-lago-azul)...")
    try:
        attraction_id = "gruta-lago-azul"
        response = requests.get(f"{API_BASE}/attractions/{attraction_id}", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Get specific attraction successful")
            print(f"   Name: {data.get('name')}")
            print(f"   Category: {data.get('category')}")
            print(f"   Rating: {data.get('rating')}")
            print(f"   Price: {data.get('price')}")
            print(f"   Duration: {data.get('duration')}")
            print(f"   Activities: {len(data.get('activities', []))} activities")
            print(f"   Coordinates: {data.get('coordinates')}")
            
            # Verify it's the correct attraction
            if data.get('id') == attraction_id:
                print(f"   ✅ Correct attraction ID returned")
            else:
                print(f"   ❌ Wrong attraction ID: expected {attraction_id}, got {data.get('id')}")
                return False
                
            return True
        elif response.status_code == 404:
            print(f"❌ Attraction not found (404)")
            return False
        else:
            print(f"❌ Get specific attraction failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Get specific attraction failed with error: {e}")
        return False

def test_attractions_stats():
    """Test getting attraction statistics"""
    print("\n🔍 Testing Attractions Statistics...")
    try:
        response = requests.get(f"{API_BASE}/attractions/stats", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Get statistics successful")
            print(f"   Total attractions: {data.get('total_attractions')}")
            print(f"   Average rating: {data.get('average_rating')}")
            
            by_category = data.get('by_category', {})
            print(f"   Categories: {list(by_category.keys())}")
            for category, count in by_category.items():
                print(f"     - {category}: {count}")
            
            by_difficulty = data.get('by_difficulty', {})
            print(f"   Difficulties: {list(by_difficulty.keys())}")
            for difficulty, count in by_difficulty.items():
                print(f"     - {difficulty}: {count}")
            
            most_popular = data.get('most_popular', [])
            print(f"   Most popular attractions: {most_popular[:3]}")
            
            return True
        else:
            print(f"❌ Get statistics failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Get statistics failed with error: {e}")
        return False

def test_attractions_categories():
    """Test getting attraction categories"""
    print("\n🔍 Testing Attractions Categories...")
    try:
        response = requests.get(f"{API_BASE}/attractions/categories", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Get categories successful")
            categories = data.get('categories', [])
            print(f"   Found {len(categories)} categories: {categories}")
            
            # Verify expected categories exist
            expected_categories = ['Gruta', 'Rio', 'Aventura', 'Ecoturismo', 'Cachoeira']
            found_expected = [cat for cat in expected_categories if cat in categories]
            print(f"   Expected categories found: {found_expected}")
            
            return True
        else:
            print(f"❌ Get categories failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Get categories failed with error: {e}")
        return False

def test_attractions_filters():
    """Test filtering attractions by category and rating"""
    print("\n🔍 Testing Attractions Filters (category=Gruta&rating_min=4.5)...")
    try:
        params = {
            'category': 'Gruta',
            'rating_min': 4.5
        }
        response = requests.get(f"{API_BASE}/attractions", params=params, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Filter attractions successful")
            print(f"   Found {len(data)} attractions matching filters")
            
            for attraction in data:
                name = attraction.get('name')
                category = attraction.get('category')
                rating = attraction.get('rating')
                print(f"   - {name}: {category}, Rating: {rating}")
                
                # Verify filters are applied correctly
                if category != 'Gruta':
                    print(f"   ❌ Wrong category: expected Gruta, got {category}")
                    return False
                if rating < 4.5:
                    print(f"   ❌ Rating too low: expected >= 4.5, got {rating}")
                    return False
            
            print(f"   ✅ All filters applied correctly")
            return True
        else:
            print(f"❌ Filter attractions failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Filter attractions failed with error: {e}")
        return False

def test_attractions_search():
    """Test searching attractions"""
    print("\n🔍 Testing Attractions Search (search=gruta)...")
    try:
        params = {
            'search': 'gruta'
        }
        response = requests.get(f"{API_BASE}/attractions", params=params, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Search attractions successful")
            print(f"   Found {len(data)} attractions matching search")
            
            for attraction in data:
                name = attraction.get('name')
                description = attraction.get('description', '')
                print(f"   - {name}")
                
                # Verify search term appears in name or description
                search_term = 'gruta'
                if (search_term.lower() not in name.lower() and 
                    search_term.lower() not in description.lower()):
                    print(f"   ⚠️  Search term '{search_term}' not found in name or description")
            
            return True
        else:
            print(f"❌ Search attractions failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Search attractions failed with error: {e}")
        return False

def test_root_endpoint():
    """Test the root API endpoint"""
    print("\n🔍 Testing Root API Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint successful")
            print(f"   Message: {data.get('message')}")
            print(f"   Version: {data.get('version')}")
            endpoints = data.get('endpoints', [])
            print(f"   Available endpoints: {len(endpoints)}")
            for endpoint in endpoints:
                print(f"     - {endpoint}")
            return True
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint failed with error: {e}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("🚀 Starting Bonito Drive Guide Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    print("=" * 60)
    
    tests = [
        ("Health Check", test_health_endpoint),
        ("Root Endpoint", test_root_endpoint),
        ("List Attractions", test_list_attractions),
        ("Get Specific Attraction", test_get_specific_attraction),
        ("Attractions Statistics", test_attractions_stats),
        ("Attractions Categories", test_attractions_categories),
        ("Attractions Filters", test_attractions_filters),
        ("Attractions Search", test_attractions_search),
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        try:
            results[test_name] = test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with unexpected error: {e}")
            results[test_name] = False
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend API is working correctly.")
        return True
    else:
        print(f"⚠️  {total - passed} tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)