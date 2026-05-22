# API Layer Documentation

## Overview

The API layer provides a clean, scalable architecture for all HTTP requests.

## Structure

```
api/
├── client.js           # Axios instance + interceptors
├── endpoints.js        # Endpoint definitions
├── services/           # API service modules
│   ├── authService.js  # Auth-related APIs
│   ├── callService.js  # Call session APIs
│   └── index.js        # Barrel export
└── index.js            # Main barrel export
```

## Architecture

### 1. Client Layer (`client.js`)

- Axios instance with base configuration
- Request interceptor (adds user ID header)
- Response interceptor (error handling)
- Helper functions (get, post, put, patch, del)

### 2. Endpoints Layer (`endpoints.js`)

- Centralized endpoint definitions
- Query parameter builders
- No hardcoded URLs

### 3. Service Layer (`services/`)

- Business logic for API calls
- Error handling
- Data transformation
- JSDoc documentation

## Usage Examples

### Basic Usage

```javascript
import { authService, callService } from '@/api'

// Get user profile
const profile = await authService.getProfile()

// Get dashboard data
const dashboard = await authService.getDashboard()

// Get call stats
const stats = await callService.getStats()

// Get call history with pagination
const history = await callService.getHistory({ limit: 10, page: 1 })
```

### With Error Handling

```javascript
import { authService } from '@/api'
import toast from 'react-hot-toast'

try {
  const profile = await authService.getProfile()
  console.log(profile)
} catch (error) {
  toast.error(error.message)
  console.error(error)
}
```

### In Custom Hooks

```javascript
import { useState, useEffect } from 'react'
import { authService } from '@/api'

export const useProfile = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authService.getProfile()
        setData(profile)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { data, loading, error }
}
```

## Features

### ✅ Request Interceptor

- Automatically adds `x-user-id` header
- Logs requests in development mode
- Can add authentication tokens

### ✅ Response Interceptor

- Handles errors globally
- Transforms error messages
- Logs responses in development mode

### ✅ Error Handling

- Network errors
- Timeout errors
- HTTP status errors (401, 404, 422, etc.)
- Custom error messages

### ✅ Type Safety

- JSDoc comments for all functions
- Parameter validation
- Return type documentation

## API Services

### Auth Service

```javascript
authService.getProfile() // Get user profile
authService.getDashboard() // Get dashboard data
```

### Call Service

```javascript
callService.getStats() // Get call statistics
callService.getHistory({ limit: 10, page: 1 }) // Get call history
callService.getSession(sessionId) // Get single session
callService.getAllSessions() // Get all sessions
```

## Configuration

### Environment Variables

```env
VITE_API_BASE_URL=https://mock-backend-hintro.vercel.app
```

### Constants

```javascript
// src/utils/constants.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}
```

## Best Practices

### ✅ Do's

- Use services instead of direct API calls
- Handle errors in components
- Use custom hooks for data fetching
- Add JSDoc comments
- Log errors in development

### ❌ Don'ts

- Don't hardcode URLs
- Don't ignore errors
- Don't bypass interceptors
- Don't make direct axios calls in components

## Testing

```javascript
// Mock service in tests
jest.mock('@/api', () => ({
  authService: {
    getProfile: jest.fn(),
    getDashboard: jest.fn(),
  },
}))
```

## Future Enhancements

- [ ] Request caching
- [ ] Retry logic for failed requests
- [ ] Request cancellation
- [ ] Optimistic updates
- [ ] Request queuing
- [ ] Rate limiting

---

**Status:** ✅ Production-ready  
**Last Updated:** Phase 2 - Core Infrastructure
