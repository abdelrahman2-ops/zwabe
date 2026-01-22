# Zahab wa Awda Travel API - Complete Documentation

## 📋 Overview
This is a comprehensive OpenAPI 3.0 (Swagger) documentation for the **Zahab wa Awda Travel Booking System API**. The API provides complete functionality for managing travel bookings, content management, and administrative operations.

## 🚀 Quick Start

### Access Documentation
- **Live Documentation**: `http://localhost:3000/api-docs` (when server is running)
- **API Base URL**: `http://192.168.1.4:3000/api/v1`

### Authentication
All protected endpoints require JWT Bearer token:
```bash
Authorization: Bearer <your-jwt-token>
```

## 📚 API Structure

### 🔐 Authentication & Users
- **POST** `/auth/login` - User login
- **POST** `/auth/logout` - User logout
- **GET** `/auth/me` - Get current user profile
- **PATCH** `/auth/changePassword` - Change password
- **GET** `/users` - Get all users (Admin)
- **POST** `/users` - Create user (Admin)
- **PATCH** `/users/update-me` - Update own profile
- **POST** `/users/deactivate/{userId}` - Deactivate user (Admin)

### ✈️ Airlines Management
- **GET** `/airLines` - Get all airlines (Public)
- **POST** `/airLines` - Create airline (Admin/Manager/Data-Entry)
- **GET** `/airLines/admin/{id}` - Get airline by ID
- **PATCH** `/airLines/admin/{id}` - Update airline
- **DELETE** `/airLines/admin/{id}` - Delete airline

### 📝 Blog Management
- **GET** `/blogs` - Get all blogs (Public)
- **POST** `/blogs` - Create blog (Admin/Manager/Data-Entry)
- **GET** `/blogs/{blogSlug}` - Get blog by slug (Public)
- **GET** `/blogs/admin/{id}` - Get blog by ID
- **PATCH** `/blogs/admin/{id}` - Update blog
- **DELETE** `/blogs/admin/{id}` - Delete blog

### 🌍 Countries & Cities
**Countries:**
- **GET** `/countries` - Get all countries (Public)
- **POST** `/countries` - Create country (Admin/Manager/Data-Entry)
- **GET** `/countries/{countrySlug}` - Get country details (Public)
- **GET** `/countries/admin/{id}` - Get country by ID
- **PATCH** `/countries/admin/{id}` - Update country
- **DELETE** `/countries/admin/{id}` - Delete country

**Cities:**
- **GET** `/cities` - Get all cities (Public)
- **POST** `/cities` - Create city (Admin/Manager/Data-Entry)
- **GET** `/cities/{citySlug}` - Get city details with weather (Public)
- **GET** `/cities/admin/{id}` - Get city by ID
- **PATCH** `/cities/admin/{id}` - Update city
- **DELETE** `/cities/admin/{id}` - Delete city

### 🏨 Hotels Management
- **GET** `/hotels` - Get all hotels (Public)
- **POST** `/hotels` - Create hotel (Admin/Manager/Data-Entry)
- **GET** `/hotels/{hotelSlug}` - Get hotel details (Public)
- **GET** `/hotels/admin/{id}` - Get hotel by ID
- **PATCH** `/hotels/admin/{id}` - Update hotel
- **DELETE** `/hotels/admin/{id}` - Delete hotel

### 📦 Packages & Package Types
**Packages:**
- **GET** `/packages` - Get all packages (Public)
- **POST** `/packages` - Create package (Admin/Manager/Data-Entry)
- **GET** `/packages/admin/{id}` - Get package by ID
- **PATCH** `/packages/admin/{id}` - Update package
- **DELETE** `/packages/admin/{id}` - Delete package

**Package Types:**
- **GET** `/packageTypes` - Get all package types (Public)
- **POST** `/packageTypes` - Create package type (Admin/Manager/Data-Entry)
- **GET** `/packageTypes/{packageTypeSlug}` - Get package type countries
- **GET** `/packageTypes/{packageTypeSlug}/countries/{countrySlug}` - Get country packages
- **GET** `/packageTypes/{packageTypeSlug}/countries/{countrySlug}/packages/{packageSlug}` - Get package details
- **GET** `/packageTypes/admin/{id}` - Get package type by ID
- **PATCH** `/packageTypes/admin/{id}` - Update package type
- **DELETE** `/packageTypes/admin/{id}` - Delete package type

### 🎯 Tours Management
- **GET** `/tours` - Get all tours (Public)
- **POST** `/tours` - Create tour (Admin/Manager/Data-Entry)
- **GET** `/tours/{tourSlug}` - Get tour details (Public)
- **GET** `/tours/admin/{id}` - Get tour by ID
- **PATCH** `/tours/admin/{id}` - Update tour
- **DELETE** `/tours/admin/{id}` - Delete tour

### 🛠️ Services Management
- **GET** `/services` - Get all services (Public)
- **POST** `/services` - Create service (Admin/Manager/Data-Entry)
- **GET** `/services/admin/{id}` - Get service by ID
- **PATCH** `/services/admin/{id}` - Update service
- **DELETE** `/services/admin/{id}` - Delete service

### ✈️ Flight Bookings
- **GET** `/flightBookings` - Get all bookings (Admin/Manager)
- **POST** `/flightBookings` - Create booking (Public)
- **GET** `/flightBookings/admin/{id}` - Get booking by ID (Admin/Manager)
- **DELETE** `/flightBookings/admin/{id}` - Delete booking (Admin)

### 🎁 Offers Management
- **GET** `/offers` - Get all offers (Public)
- **POST** `/offers` - Create offer (Admin/Manager/Data-Entry)
- **GET** `/offers/admin/{id}` - Get offer by ID
- **PATCH** `/offers/admin/{id}` - Update offer
- **DELETE** `/offers/admin/{id}` - Delete offer

### 🔍 SEO Pages Management
- **GET** `/seo-pages` - Get all SEO pages (Admin/Manager)
- **POST** `/seo-pages` - Create SEO page (Admin/Manager/Data-Entry)
- **GET** `/seo-pages/{seopageSlug}` - Get SEO page by slug (Public)
- **GET** `/seo-pages/admin/{id}` - Get SEO page by ID (Admin/Manager)
- **PATCH** `/seo-pages/admin/{id}` - Update SEO page (Admin/Manager)
- **DELETE** `/seo-pages/admin/{id}` - Delete SEO page (Admin)

### 📞 Contact Messages
- **GET** `/contact` - Get all messages (Admin/Manager)
- **POST** `/contact` - Submit contact message (Public)
- **GET** `/contact/admin/{id}` - Get message by ID (Admin/Manager)
- **DELETE** `/contact/admin/{id}` - Delete message (Admin)

## 🔐 Role-Based Access Control

### Roles:
- **Public**: No authentication required
- **User**: Basic authenticated user
- **Data-Entry**: Can create content
- **Manager**: Can create and update content
- **Admin**: Full access including delete operations

### Permission Matrix:
| Operation | Public | User | Data-Entry | Manager | Admin |
|-----------|--------|------|------------|---------|-------|
| Read (Public endpoints) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Read (Admin endpoints) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Create | ❌ | ❌ | ✅ | ✅ | ✅ |
| Update | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete | ❌ | ❌ | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ✅ |

## 📊 Key Features

### 🔍 SEO Optimization
All content entities include comprehensive SEO schema:
- Meta titles and descriptions
- Keywords and slug URLs
- OpenGraph tags
- Sitemap priorities
- Indexing controls

### 🖼️ File Upload Support
- Image upload with automatic resizing
- Cloudinary integration
- Support for cover images and galleries
- Optimized for web delivery

### 🔄 Advanced Query Features
- **Pagination**: `?page=1&limit=10`
- **Sorting**: `?sort=-createdAt,name`
- **Field Selection**: `?fields=name,price,description`
- **Filtering**: `?isActive=true&price[gte]=100`

### 📱 Response Format
All responses follow consistent structure:
```json
{
  "status": "success",
  "results": 25,
  "data": {
    "data": [...],
    "pagination": {
      "page": 1,
      "pages": 3,
      "total": 25
    }
  }
}
```

### ⚠️ Error Handling
Standardized error responses:
```json
{
  "status": "error",
  "message": "Detailed error message",
  "errors": [...] // Validation errors if applicable
}
```

## 🚀 Getting Started

1. **Start the server**: `npm run dev`
2. **Access documentation**: Visit `http://localhost:3000/api-docs`
3. **Test endpoints**: Use the interactive Swagger UI
4. **Authentication**: Login via `/auth/login` to get JWT token
5. **Explore**: All endpoints are fully documented with examples

## 📝 Notes

- All timestamps are in ISO 8601 format
- File uploads use `multipart/form-data`
- Rate limiting: 100,000 requests per 15 minutes per IP
- CORS enabled for all origins
- Comprehensive input validation using Zod schemas
- Automatic slug generation for SEO-friendly URLs
- Audit trail with `createdBy` and `updatedBy` fields

## 🔧 Development

### Adding New Endpoints
1. Create route in `/routes`
2. Add controller in `/controllers`
3. Create service in `/services`
4. Add validation schema in `/schema`
5. Update Swagger documentation

### Extending Documentation
The Swagger file is located at `/docs/swagger.yaml` and includes:
- Complete OpenAPI 3.0 specification
- All endpoints with detailed descriptions
- Request/response schemas
- Authentication requirements
- Examples for all operations

This comprehensive API documentation ensures your travel booking system is fully documented, secure, and developer-friendly! 🎉
