// Enhanced Weather Dashboard JavaScript with Amazing Animations
// Comprehensive Cities and Countries Database

// Weather Dashboard Configuration
const WEATHER_CONFIG = {
  API_KEY: "YOUR_API_KEY_HERE", // Replace with your OpenWeatherMap API key
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_URL: "https://api.openweathermap.org/geo/1.0",
  DEMO_MODE: true, // Set to false when you have an API key
}

// Global State
let currentUnit = "metric" // 'metric' for Celsius, 'imperial' for Fahrenheit
let currentWeatherData = null
const animationTimeouts = []

// Comprehensive Cities Database
const WORLD_CITIES = {
  "United States": [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
    "San Francisco",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington",
    "Boston",
    "El Paso",
    "Nashville",
    "Detroit",
    "Oklahoma City",
    "Portland",
    "Las Vegas",
    "Memphis",
    "Louisville",
    "Baltimore",
    "Milwaukee",
    "Albuquerque",
    "Tucson",
    "Fresno",
    "Sacramento",
    "Mesa",
    "Kansas City",
    "Atlanta",
    "Long Beach",
    "Colorado Springs",
    "Raleigh",
    "Miami",
    "Virginia Beach",
    "Omaha",
    "Oakland",
    "Minneapolis",
    "Tulsa",
    "Arlington",
    "Tampa",
    "New Orleans",
    "Wichita",
  ],
  "United Kingdom": [
    "London",
    "Birmingham",
    "Manchester",
    "Glasgow",
    "Liverpool",
    "Leeds",
    "Sheffield",
    "Edinburgh",
    "Bristol",
    "Cardiff",
    "Leicester",
    "Coventry",
    "Bradford",
    "Belfast",
    "Nottingham",
    "Kingston upon Hull",
    "Newcastle",
    "Stoke-on-Trent",
    "Southampton",
    "Derby",
    "Portsmouth",
    "Brighton",
    "Plymouth",
    "Northampton",
    "Reading",
    "Luton",
    "Wolverhampton",
    "Bolton",
    "Bournemouth",
    "Norwich",
    "Swindon",
    "Swansea",
    "Southend-on-Sea",
    "Middlesbrough",
  ],
  Canada: [
    "Toronto",
    "Montreal",
    "Vancouver",
    "Calgary",
    "Edmonton",
    "Ottawa",
    "Winnipeg",
    "Quebec City",
    "Hamilton",
    "Kitchener",
    "London",
    "Victoria",
    "Halifax",
    "Oshawa",
    "Windsor",
    "Saskatoon",
    "St. Catharines",
    "Regina",
    "Sherbrooke",
    "Barrie",
    "Kelowna",
    "Abbotsford",
    "Sudbury",
    "Kingston",
    "Saguenay",
    "Trois-Rivières",
    "Guelph",
    "Cambridge",
    "Whitby",
    "Coquitlam",
  ],
  Australia: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Adelaide",
    "Gold Coast",
    "Newcastle",
    "Canberra",
    "Sunshine Coast",
    "Wollongong",
    "Geelong",
    "Hobart",
    "Townsville",
    "Cairns",
    "Darwin",
    "Toowoomba",
    "Ballarat",
    "Bendigo",
    "Albury",
    "Launceston",
    "Mackay",
    "Rockhampton",
    "Bunbury",
    "Bundaberg",
    "Coffs Harbour",
    "Wagga Wagga",
    "Hervey Bay",
    "Mildura",
  ],
  Germany: [
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hanover",
    "Nuremberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    '\
        "Bonn',
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
    "Braunschweig",
    "Chemnitz",
    "Kiel",
    "Aachen",
    "Halle",
    "Magdeburg",
    "Freiburg",
    "Krefeld",
    "Lübeck",
    "Oberhausen",
    "Erfurt",
    "Mainz",
    "Rostock",
    "Kassel",
    "Hagen",
    "Potsdam",
  ],
  France: [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Le Havre",
    "Saint-Étienne",
    "Toulon",
    "Grenoble",
    "Dijon",
    "Angers",
    "Nîmes",
    "Villeurbanne",
    "Saint-Denis",
    "Le Mans",
    "Aix-en-Provence",
    "Clermont-Ferrand",
    "Brest",
    "Limoges",
    "Tours",
    "Amiens",
    "Perpignan",
    "Metz",
    "Besançon",
  ],
  Italy: [
    "Rome",
    "Milan",
    "Naples",
    "Turin",
    "Palermo",
    "Genoa",
    "Bologna",
    "Florence",
    "Bari",
    "Catania",
    "Venice",
    "Verona",
    "Messina",
    "Padua",
    "Trieste",
    "Taranto",
    "Brescia",
    "Prato",
    "Parma",
    "Modena",
    "Reggio Calabria",
    "Reggio Emilia",
    "Perugia",
    "Livorno",
    "Ravenna",
    "Cagliari",
    "Foggia",
    "Rimini",
    "Salerno",
    "Ferrara",
    "Sassari",
    "Latina",
    "Giugliano",
    "Monza",
  ],
  Spain: [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Seville",
    "Zaragoza",
    "Málaga",
    "Murcia",
    "Palma",
    "Las Palmas",
    "Bilbao",
    "Alicante",
    "Córdoba",
    "Valladolid",
    "Vigo",
    "Gijón",
    "Hospitalet",
    "A Coruña",
    "Vitoria-Gasteiz",
    "Granada",
    "Elche",
    "Oviedo",
    "Badalona",
    "Cartagena",
    "Terrassa",
    "Jerez de la Frontera",
    "Sabadell",
    "Móstoles",
    "Santa Cruz",
    "Pamplona",
  ],
  Japan: [
    "Tokyo",
    "Yokohama",
    "Osaka",
    "Nagoya",
    "Sapporo",
    "Fukuoka",
    "Kobe",
    "Kawasaki",
    "Kyoto",
    "Saitama",
    "Hiroshima",
    "Sendai",
    "Kitakyushu",
    "Chiba",
    "Sakai",
    "Niigata",
    "Hamamatsu",
    "Okayama",
    "Sagamihara",
    "Kumamoto",
    "Shizuoka",
    "Kagoshima",
    "Matsuyama",
    "Kanazawa",
    "Utsunomiya",
    "Matsudo",
    "Kawaguchi",
    "Takatsuki",
    "Suita",
    "Toyama",
    "Toyonaka",
  ],
  China: [
    "Shanghai",
    "Beijing",
    "Chongqing",
    "Tianjin",
    "Guangzhou",
    "Shenzhen",
    "Wuhan",
    "Dongguan",
    "Chengdu",
    "Nanjing",
    "Foshan",
    "Shenyang",
    "Hangzhou",
    "Xi'an",
    "Harbin",
    "Qingdao",
    "Zhengzhou",
    "Shijiazhuang",
    "Suzhou",
    "Dalian",
    "Changchun",
    "Jinan",
    "Changsha",
    "Taiyuan",
    "Kunming",
    "Xiamen",
    "Hefei",
    "Urumqi",
    "Fuzhou",
    "Wuxi",
    "Zhongshan",
  ],
  India: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan",
    "Vasai",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
  ],
  Brazil: [
    "São Paulo",
    "Rio de Janeiro",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Belo Horizonte",
    "Manaus",
    "Curitiba",
    "Recife",
    "Goiânia",
    "Belém",
    "Porto Alegre",
    "Guarulhos",
    "Campinas",
    "São Luís",
    "São Gonçalo",
    "Maceió",
    "Duque de Caxias",
    "Nova Iguaçu",
    "Teresina",
    "Natal",
    "Campo Grande",
    "São Bernardo",
    "João Pessoa",
    "Santo André",
    "Osasco",
  ],
  Russia: [
    "Moscow",
    "Saint Petersburg",
    "Novosibirsk",
    "Yekaterinburg",
    "Nizhny Novgorod",
    "Kazan",
    "Chelyabinsk",
    "Omsk",
    "Samara",
    "Rostov-on-Don",
    "Ufa",
    "Krasnoyarsk",
    "Perm",
    "Voronezh",
    "Volgograd",
    "Krasnodar",
    "Saratov",
    "Tyumen",
    "Tolyatti",
    "Izhevsk",
    "Barnaul",
    "Ulyanovsk",
    "Irkutsk",
    "Vladivostok",
    "Yaroslavl",
    "Habarovsk",
    "Makhachkala",
    "Tomsk",
    "Orenburg",
  ],
  Mexico: [
    "Mexico City",
    "Guadalajara",
    "Monterrey",
    "Puebla",
    "Tijuana",
    "León",
    "Juárez",
    "Torreón",
    "Querétaro",
    "San Luis Potosí",
    "Mérida",
    "Mexicali",
    "Aguascalientes",
    "Cuernavaca",
    "Saltillo",
    "Hermosillo",
    "Culiacán",
    "Chihuahua",
    "Morelia",
    "Tampico",
    "Reynosa",
    "Toluca",
    "Veracruz",
    "Cancún",
    "Acapulco",
    "Tlalnepantla",
    "Chimalhuacán",
    "Naucalpan",
  ],
}

// Weather Icons Mapping
const WEATHER_ICONS = {
  clear: "fas fa-sun",
  clouds: "fas fa-cloud",
  rain: "fas fa-cloud-rain",
  drizzle: "fas fa-cloud-drizzle",
  thunderstorm: "fas fa-bolt",
  snow: "fas fa-snowflake",
  mist: "fas fa-smog",
  fog: "fas fa-smog",
  haze: "fas fa-smog",
  dust: "fas fa-smog",
  sand: "fas fa-smog",
  ash: "fas fa-smog",
  squall: "fas fa-wind",
  tornado: "fas fa-tornado",
}

// Weather Colors
const WEATHER_COLORS = {
  clear: "#ffa726",
  clouds: "#78909c",
  rain: "#42a5f5",
  drizzle: "#64b5f6",
  thunderstorm: "#5c6bc0",
  snow: "#e1f5fe",
  mist: "#90a4ae",
  fog: "#90a4ae",
  haze: "#90a4ae",
}

// DOM Elements
const elements = {
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  locationBtn: document.getElementById("locationBtn"),
  loadingContainer: document.getElementById("loadingContainer"),
  errorMessage: document.getElementById("errorMessage"),
  mainContent: document.getElementById("mainContent"),
  themeToggle: document.getElementById("themeToggle"),
  searchSuggestions: document.getElementById("searchSuggestions"),

  // Weather display elements
  currentLocation: document.getElementById("currentLocation"),
  currentDate: document.getElementById("currentDate"),
  coordinates: document.getElementById("coordinates"),
  currentTemp: document.getElementById("currentTemp"),
  weatherDescription: document.getElementById("weatherDescription"),
  feelsLike: document.getElementById("feelsLike"),
  weatherTag: document.getElementById("weatherTag"),
  mainWeatherIcon: document.getElementById("mainWeatherIcon"),
  weatherAnimation: document.getElementById("weatherAnimation"),

  // Detail elements
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("windSpeed"),
  pressure: document.getElementById("pressure"),
  visibility: document.getElementById("visibility"),
  uvIndex: document.getElementById("uvIndex"),
  precipitation: document.getElementById("precipitation"),
  sunrise: document.getElementById("sunrise"),
  sunset: document.getElementById("sunset"),

  // Containers
  forecastContainer: document.getElementById("forecastContainer"),
  hourlyContainer: document.getElementById("hourlyContainer"),
  weatherParticles: document.getElementById("weatherParticles"),

  // Controls
  celsiusBtn: document.getElementById("celsiusBtn"),
  fahrenheitBtn: document.getElementById("fahrenheitBtn"),
  retryBtn: document.getElementById("retryBtn"),
  quickCities: document.getElementById("quickCities"),
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

/**
 * Initialize the weather dashboard application
 */
function initializeApp() {
  console.log("🌤️ Initializing Weather Dashboard...")

  // Setup event listeners
  setupEventListeners()

  // Load theme preference
  loadThemePreference()

  // Update current date
  updateCurrentDate()

  // Show content immediately with demo data
  loadDemoData()

  // Initialize animations
  initializeAnimations()

  console.log("✅ Weather Dashboard initialized successfully!")
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Search functionality
  elements.searchBtn.addEventListener("click", handleSearch)
  elements.searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  })
  elements.searchInput.addEventListener("input", debounce(handleSearchInput, 300))
  elements.searchInput.addEventListener("focus", showSearchSuggestions)
  elements.searchInput.addEventListener("blur", () => {
    setTimeout(hideSearchSuggestions, 200) // Delay to allow clicking suggestions
  })

  // Location button
  elements.locationBtn.addEventListener("click", getUserLocation)

  // Theme toggle
  elements.themeToggle.addEventListener("change", toggleTheme)

  // Unit toggle buttons
  elements.celsiusBtn.addEventListener("click", () => switchUnit("metric"))
  elements.fahrenheitBtn.addEventListener("click", () => switchUnit("imperial"))

  // Retry button
  elements.retryBtn.addEventListener("click", () => {
    if (currentWeatherData) {
      const { coord } = currentWeatherData
      getWeatherData(coord.lat, coord.lon)
    } else {
      getUserLocation()
    }
  })

  // Quick cities
  const cityButtons = elements.quickCities.querySelectorAll(".city-btn")
  cityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cityData = btn.dataset.city
      searchForCity(cityData)
    })
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts)
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    elements.searchInput.focus()
  }

  // Ctrl/Cmd + L to get current location
  if ((e.ctrlKey || e.metaKey) && e.key === "l") {
    e.preventDefault()
    getUserLocation()
  }

  // Ctrl/Cmd + D to toggle theme
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault()
    elements.themeToggle.click()
  }
}

/**
 * Initialize amazing animations
 */
function initializeAnimations() {
  // Stagger animation for cards
  const cards = document.querySelectorAll(".detail-card, .forecast-card, .hourly-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add("animate-in")
  })

  // Floating shapes animation
  createFloatingElements()

  // Weather particles
  updateWeatherParticles("clear")
}

/**
 * Create floating elements for background animation
 */
function createFloatingElements() {
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape, index) => {
    // Random animation duration and delay
    const duration = 4 + Math.random() * 4 // 4-8 seconds
    const delay = Math.random() * 2 // 0-2 seconds

    shape.style.animationDuration = `${duration}s`
    shape.style.animationDelay = `${delay}s`
  })
}

/**
 * Handle search input for suggestions
 */
function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase()
  if (query.length < 2) {
    hideSearchSuggestions()
    return
  }

  const suggestions = generateSearchSuggestions(query)
  displaySearchSuggestions(suggestions)
}

/**
 * Generate search suggestions based on query
 */
function generateSearchSuggestions(query) {
  const suggestions = []

  // Search through all cities and countries
  Object.entries(WORLD_CITIES).forEach(([country, cities]) => {
    // Check if country matches
    if (country.toLowerCase().includes(query)) {
      suggestions.push({
        type: "country",
        name: country,
        fullName: country,
        icon: "fas fa-globe",
      })
    }

    // Check cities in this country
    cities.forEach((city) => {
      if (city.toLowerCase().includes(query)) {
        suggestions.push({
          type: "city",
          name: city,
          fullName: `${city}, ${country}`,
          icon: "fas fa-map-marker-alt",
        })
      }
    })
  })

  // Sort by relevance and limit results
  return suggestions
    .sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(query)
      const bStartsWith = b.name.toLowerCase().startsWith(query)
      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1
      return a.name.localeCompare(b.name)
    })
    .slice(0, 8)
}

/**
 * Display search suggestions
 */
function displaySearchSuggestions(suggestions) {
  if (suggestions.length === 0) {
    hideSearchSuggestions()
    return
  }

  const suggestionsHTML = suggestions
    .map(
      (suggestion) => `
        <div class="suggestion-item" data-city="${suggestion.fullName}">
            <i class="${suggestion.icon}"></i>
            <span>${suggestion.fullName}</span>
        </div>
    `,
    )
    .join("")

  elements.searchSuggestions.innerHTML = suggestionsHTML
  elements.searchSuggestions.style.display = "block"

  // Add click listeners to suggestions
  elements.searchSuggestions.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", () => {
      const cityData = item.dataset.city
      elements.searchInput.value = cityData
      hideSearchSuggestions()
      searchForCity(cityData)
    })
  })
}

/**
 * Show search suggestions
 */
function showSearchSuggestions() {
  if (elements.searchInput.value.trim().length >= 2) {
    handleSearchInput({ target: elements.searchInput })
  }
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions() {
  elements.searchSuggestions.style.display = "none"
}

/**
 * Handle search functionality
 */
async function handleSearch() {
  const query = elements.searchInput.value.trim()
  if (!query) return

  hideSearchSuggestions()
  await searchForCity(query)
}

/**
 * Search for a specific city
 */
async function searchForCity(cityQuery) {
  showLoading()

  try {
    if (WEATHER_CONFIG.DEMO_MODE || WEATHER_CONFIG.API_KEY === "YOUR_API_KEY_HERE") {
      // Generate demo data for the searched city
      loadDemoDataForCity(cityQuery)
    } else {
      // Use real API
      const locationData = await getLocationCoordinates(cityQuery)
      if (locationData.length === 0) {
        throw new Error("Location not found")
      }

      const { lat, lon } = locationData[0]
      await getWeatherData(lat, lon)
    }
  } catch (error) {
    showError(`Could not find weather data for "${cityQuery}". Please try a different location.`)
    console.error("Search error:", error)
  }
}

/**
 * Get user's current location
 */
function getUserLocation() {
  if (navigator.geolocation) {
    showLoading()
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        if (WEATHER_CONFIG.DEMO_MODE || WEATHER_CONFIG.API_KEY === "YOUR_API_KEY_HERE") {
          loadDemoData()
        } else {
          await getWeatherData(latitude, longitude)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        // Fallback to demo data
        loadDemoData()
      },
    )
  } else {
    // Geolocation not supported, use demo data
    loadDemoData()
  }
}

/**
 * Load demo data for demonstration
 */
function loadDemoData() {
  console.log("📊 Loading demo weather data...")

  // Hide loading and show content immediately
  elements.loadingContainer.style.display = "none"
  elements.mainContent.style.display = "block"
  elements.errorMessage.style.display = "none"

  // Update current date to today
  updateCurrentDate()

  // Set demo weather data
  const demoData = {
    name: "New York",
    sys: {
      country: "US",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 7200,
    },
    main: {
      temp: 22,
      feels_like: 25,
      humidity: 65,
      pressure: 1013,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: { speed: 3.5, deg: 230 },
    visibility: 10000,
    coord: { lat: 40.7128, lon: -74.006 },
    clouds: { all: 20 },
    dt: Math.floor(Date.now() / 1000),
  }

  currentWeatherData = demoData
  updateWeatherBackground("clear")

  // Add entrance animation to main content
  elements.mainContent.classList.add("animate-in")

  console.log("✅ Demo data loaded successfully!")
}

/**
 * Load demo data for a specific city
 */
function loadDemoDataForCity(cityQuery) {
  console.log(`📊 Loading demo data for ${cityQuery}...`)

  // Parse city and country from query
  const parts = cityQuery.split(",")
  const cityName = parts[0].trim()
  const countryName = parts[1] ? parts[1].trim() : "Unknown"

  // Generate realistic demo data
  const weatherTypes = ["Clear", "Clouds", "Rain", "Snow"]
  const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]

  const demoData = {
    name: cityName,
    sys: {
      country: getCountryCode(countryName),
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 7200,
    },
    main: {
      temp: Math.floor(Math.random() * 30) + 5, // 5-35°C
      feels_like: Math.floor(Math.random() * 30) + 5,
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      pressure: Math.floor(Math.random() * 100) + 1000, // 1000-1100 hPa
    },
    weather: [
      {
        main: randomWeather,
        description: getWeatherDescription(randomWeather),
        icon: getWeatherIcon(randomWeather),
      },
    ],
    wind: {
      speed: Math.random() * 10 + 2, // 2-12 m/s
      deg: Math.floor(Math.random() * 360),
    },
    visibility: Math.floor(Math.random() * 5000) + 5000, // 5-10km
    coord: {
      lat: (Math.random() - 0.5) * 180,
      lon: (Math.random() - 0.5) * 360,
    },
    clouds: { all: Math.floor(Math.random() * 100) },
    dt: Math.floor(Date.now() / 1000),
  }

  currentWeatherData = demoData
  displayCurrentWeather(demoData)
  loadDemoForecast()
  updateWeatherBackground(demoData.weather[0].main.toLowerCase())
  hideLoading()

  console.log(`✅ Demo data loaded for ${cityName}!`)
}

/**
 * Get country code from country name
 */
function getCountryCode(countryName) {
  const countryCodes = {
    "United States": "US",
    "United Kingdom": "GB",
    Canada: "CA",
    Australia: "AU",
    Germany: "DE",
    France: "FR",
    Italy: "IT",
    Spain: "ES",
    Japan: "JP",
    China: "CN",
    India: "IN",
    Brazil: "BR",
    Russia: "RU",
    Mexico: "MX",
  }
  return countryCodes[countryName] || "XX"
}

/**
 * Get weather description
 */
function getWeatherDescription(weatherType) {
  const descriptions = {
    Clear: "clear sky",
    Clouds: "partly cloudy",
    Rain: "light rain",
    Snow: "light snow",
    Thunderstorm: "thunderstorm",
    Drizzle: "light drizzle",
    Mist: "misty",
  }
  return descriptions[weatherType] || "unknown"
}

/**
 * Get weather icon code
 */
function getWeatherIcon(weatherType) {
  const icons = {
    Clear: "01d",
    Clouds: "02d",
    Rain: "10d",
    Snow: "13d",
    Thunderstorm: "11d",
    Drizzle: "09d",
    Mist: "50d",
  }
  return icons[weatherType] || "01d"
}

/**
 * Load demo forecast data
 */
function loadDemoForecast() {
  const demoForecast = {
    list: Array.from({ length: 40 }, (_, i) => {
      const weatherTypes = ["Clear", "Clouds", "Rain", "Snow"]
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]

      return {
        dt: Math.floor(Date.now() / 1000) + i * 3 * 3600, // Every 3 hours
        main: {
          temp: Math.floor(Math.random() * 20) + 10, // 10-30°C
          temp_max: Math.floor(Math.random() * 25) + 15, // 15-40°C
          temp_min: Math.floor(Math.random() * 15) + 5, // 5-20°C
          humidity: Math.floor(Math.random() * 40) + 40,
          pressure: Math.floor(Math.random() * 100) + 1000,
        },
        weather: [
          {
            main: randomWeather,
            description: getWeatherDescription(randomWeather),
            icon: getWeatherIcon(randomWeather),
          },
        ],
        wind: {
          speed: Math.random() * 8 + 2,
          deg: Math.floor(Math.random() * 360),
        },
        clouds: { all: Math.floor(Math.random() * 100) },
      }
    }),
  }

  displayForecast(demoForecast)
  displayHourlyForecast(demoForecast)
}

/**
 * Get location coordinates from city name (for real API)
 */
async function getLocationCoordinates(query) {
  const response = await fetch(
    `${WEATHER_CONFIG.GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${WEATHER_CONFIG.API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch location data")
  }

  return await response.json()
}

/**
 * Get weather data for given coordinates (for real API)
 */
async function getWeatherData(lat, lon) {
  try {
    // Get current weather
    const currentWeatherResponse = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}&units=${currentUnit}`,
    )

    if (!currentWeatherResponse.ok) {
      throw new Error("Failed to fetch current weather data")
    }

    const currentWeather = await currentWeatherResponse.json()
    currentWeatherData = currentWeather

    // Get forecast data
    const forecastResponse = await fetch(
      `${WEATHER_CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_CONFIG.API_KEY}&units=${currentUnit}`,
    )

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data")
    }

    const forecastData = await forecastResponse.json()

    // Display weather data
    displayCurrentWeather(currentWeather)
    displayForecast(forecastData)
    displayHourlyForecast(forecastData)

    // Update background based on weather
    updateWeatherBackground(currentWeather.weather[0].main.toLowerCase())

    hideLoading()
  } catch (error) {
    showError("Failed to fetch weather data. Please try again.")
    console.error("Weather data error:", error)
  }
}

/**
 * Display current weather information with amazing animations
 */
function displayCurrentWeather(data) {
  console.log("🌤️ Displaying current weather data...")

  // Location and date
  elements.currentLocation.textContent = `${data.name}, ${getFullCountryName(data.sys.country)}`
  elements.coordinates.textContent = `${data.coord.lat.toFixed(4)}°N, ${Math.abs(data.coord.lon).toFixed(4)}°${data.coord.lon >= 0 ? "E" : "W"}`

  // Temperature with animation
  const temp = Math.round(data.main.temp)
  const feelsLikeTemp = Math.round(data.main.feels_like)

  animateValue(elements.currentTemp, 0, temp, 1000, "°")
  elements.feelsLike.textContent = `Feels like ${feelsLikeTemp}°`

  // Weather description
  elements.weatherDescription.textContent = capitalizeWords(data.weather[0].description)

  // Weather tag
  elements.weatherTag.textContent = getWeatherTag(data.weather[0].main, temp)
  elements.weatherTag.className = `weather-tag ${getWeatherTagClass(data.weather[0].main)}`

  // Weather icon with animation
  const weatherType = data.weather[0].main.toLowerCase()
  const iconClass = WEATHER_ICONS[weatherType] || "fas fa-sun"
  const iconColor = WEATHER_COLORS[weatherType] || "#ffa726"

  elements.mainWeatherIcon.className = `${iconClass} weather-icon-large`
  elements.mainWeatherIcon.style.color = iconColor

  // Weather details with animated progress bars
  animateValue(document.querySelector("#humidity"), 0, data.main.humidity, 800, "%")
  updateProgressBar(
    document.querySelector("#humidity").closest(".detail-card").querySelector(".detail-progress"),
    data.main.humidity,
  )

  const windSpeedKmh = Math.round(data.wind.speed * 3.6)
  animateValue(document.querySelector("#windSpeed"), 0, windSpeedKmh, 800, " km/h")
  updateProgressBar(
    document.querySelector("#windSpeed").closest(".detail-card").querySelector(".detail-progress"),
    Math.min((windSpeedKmh / 50) * 100, 100),
  )

  animateValue(document.querySelector("#pressure"), 900, data.main.pressure, 800, " hPa")
  updateProgressBar(
    document.querySelector("#pressure").closest(".detail-card").querySelector(".detail-progress"),
    ((data.main.pressure - 950) / 100) * 100,
  )

  const visibilityKm = (data.visibility / 1000).toFixed(1)
  animateValue(document.querySelector("#visibility"), 0, Number.parseFloat(visibilityKm), 800, " km")
  updateProgressBar(
    document.querySelector("#visibility").closest(".detail-card").querySelector(".detail-progress"),
    Math.min((data.visibility / 10000) * 100, 100),
  )

  // UV Index (demo value)
  const uvValue = Math.floor(Math.random() * 11) + 1
  animateValue(document.querySelector("#uvIndex"), 0, uvValue, 800, "")
  updateProgressBar(
    document.querySelector("#uvIndex").closest(".detail-card").querySelector(".detail-progress"),
    (uvValue / 11) * 100,
    getUVIndexClass(uvValue),
  )

  // Precipitation
  const rain = data.rain ? data.rain["1h"] || 0 : 0
  const snow = data.snow ? data.snow["1h"] || 0 : 0
  const totalPrecip = rain + snow
  animateValue(document.querySelector("#precipitation"), 0, totalPrecip, 800, " mm")
  updateProgressBar(
    document.querySelector("#precipitation").closest(".detail-card").querySelector(".detail-progress"),
    Math.min((totalPrecip / 10) * 100, 100),
  )

  // Sunrise and sunset with animation
  const sunriseTime = new Date(data.sys.sunrise * 1000)
  const sunsetTime = new Date(data.sys.sunset * 1000)
  elements.sunrise.textContent = formatTime(sunriseTime)
  elements.sunset.textContent = formatTime(sunsetTime)

  // Animate sun progress bars
  const now = new Date()
  const sunriseProgress = calculateSunProgress(sunriseTime, now, "sunrise")
  const sunsetProgress = calculateSunProgress(sunsetTime, now, "sunset")

  updateProgressBar(document.querySelector(".sunrise-progress"), sunriseProgress)
  updateProgressBar(document.querySelector(".sunset-progress"), sunsetProgress)

  // Add entrance animation to main content
  elements.mainContent.classList.add("animate-in")

  console.log("✅ Current weather displayed successfully!")
}

/**
 * Get full country name from country code
 */
function getFullCountryName(countryCode) {
  const countryNames = {
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    DE: "Germany",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    JP: "Japan",
    CN: "China",
    IN: "India",
    BR: "Brazil",
    RU: "Russia",
    MX: "Mexico",
  }
  return countryNames[countryCode] || countryCode
}

/**
 * Animate numeric values
 */
function animateValue(element, start, end, duration, suffix = "") {
  const startTime = performance.now()
  const difference = end - start

  function updateValue(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = start + difference * easeOutCubic

    element.textContent = Math.round(currentValue) + suffix

    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }

  requestAnimationFrame(updateValue)
}

/**
 * Update progress bar with animation
 */
function updateProgressBar(progressBar, percentage, className = "") {
  if (!progressBar) return

  if (className) {
    progressBar.className = `detail-progress ${className}`
  }

  // Animate width
  progressBar.style.width = "0%"
  setTimeout(() => {
    progressBar.style.width = `${Math.min(Math.max(percentage, 0), 100)}%`
  }, 100)
}

/**
 * Get weather tag text
 */
function getWeatherTag(weatherMain, temp) {
  if (temp > 30) return "Hot"
  if (temp > 25) return "Warm"
  if (temp > 15) return "Pleasant"
  if (temp > 5) return "Cool"
  if (temp > -5) return "Cold"
  return "Freezing"
}

/**
 * Get weather tag CSS class
 */
function getWeatherTagClass(weatherMain) {
  const classes = {
    Clear: "tag-sunny",
    Clouds: "tag-cloudy",
    Rain: "tag-rainy",
    Snow: "tag-snowy",
    Thunderstorm: "tag-stormy",
  }
  return classes[weatherMain] || "tag-default"
}

/**
 * Get UV Index CSS class
 */
function getUVIndexClass(uvIndex) {
  if (uvIndex <= 2) return "uv-low"
  if (uvIndex <= 5) return "uv-moderate"
  if (uvIndex <= 7) return "uv-high"
  if (uvIndex <= 10) return "uv-very-high"
  return "uv-extreme"
}

/**
 * Calculate sun progress percentage
 */
function calculateSunProgress(sunTime, currentTime, type) {
  const sunHour = sunTime.getHours()
  const currentHour = currentTime.getHours()

  if (type === "sunrise") {
    if (currentHour >= sunHour) return 100
    return Math.max(0, ((currentHour + 24 - sunHour) / 24) * 100)
  } else {
    if (currentHour >= sunHour) return 100
    return Math.max(0, (currentHour / sunHour) * 100)
  }
}

/**
 * Display 7-day forecast with animations
 */
function displayForecast(data) {
  console.log("📅 Displaying 7-day forecast...")

  elements.forecastContainer.innerHTML = ""

  // Group forecast data by day
  const dailyForecasts = groupForecastByDay(data.list)

  // Display up to 7 days
  const days = Object.keys(dailyForecasts).slice(0, 7)

  days.forEach((day, index) => {
    const dayData = dailyForecasts[day]
    const forecastCard = createForecastCard(day, dayData, index)
    elements.forecastContainer.appendChild(forecastCard)
  })

  console.log("✅ 7-day forecast displayed!")
}

/**
 * Display hourly forecast with animations
 */
function displayHourlyForecast(data) {
  console.log("⏰ Displaying hourly forecast...")

  elements.hourlyContainer.innerHTML = ""

  // Display next 24 hours (8 entries, each 3 hours apart)
  const hourlyData = data.list.slice(0, 8)

  hourlyData.forEach((hour, index) => {
    const hourlyCard = createHourlyCard(hour, index)
    elements.hourlyContainer.appendChild(hourlyCard)
  })

  console.log("✅ Hourly forecast displayed!")
}

/**
 * Group forecast data by day
 */
function groupForecastByDay(forecastList) {
  const grouped = {}

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dayKey = date.toDateString()

    if (!grouped[dayKey]) {
      grouped[dayKey] = {
        temps: [],
        weather: item.weather[0],
        date: date,
        humidity: [],
        pressure: [],
        wind: [],
      }
    }

    grouped[dayKey].temps.push({
      temp: item.main.temp,
      temp_max: item.main.temp_max,
      temp_min: item.main.temp_min,
    })

    grouped[dayKey].humidity.push(item.main.humidity)
    grouped[dayKey].pressure.push(item.main.pressure)
    grouped[dayKey].wind.push(item.wind.speed)
  })

  // Calculate daily statistics
  Object.keys(grouped).forEach((day) => {
    const data = grouped[day]
    const temps = data.temps

    data.temp_max = Math.max(...temps.map((t) => t.temp_max))
    data.temp_min = Math.min(...temps.map((t) => t.temp_min))
    data.avg_humidity = Math.round(data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length)
    data.avg_pressure = Math.round(data.pressure.reduce((a, b) => a + b, 0) / data.pressure.length)
    data.avg_wind = Math.round(data.wind.reduce((a, b) => a + b, 0) / data.wind.length)
  })

  return grouped
}

/**
 * Create forecast card element with animations
 */
function createForecastCard(day, data, index) {
  const card = document.createElement("div")
  card.className = "forecast-card"
  card.style.animationDelay = `${index * 0.1}s`

  const dayName = data.date.toLocaleDateString("en-US", { weekday: "short" })
  const monthDay = data.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  const weatherType = data.weather.main.toLowerCase()
  const iconClass = WEATHER_ICONS[weatherType] || "fas fa-sun"
  const iconColor = WEATHER_COLORS[weatherType] || "#ffa726"
  const tempHigh = Math.round(data.temp_max)
  const tempLow = Math.round(data.temp_min)

  card.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-date">${monthDay}</div>
        <div class="forecast-icon" style="color: ${iconColor}">
            <i class="${iconClass}"></i>
        </div>
        <div class="forecast-temps">
            <span class="temp-high">${tempHigh}°</span>
            <span class="temp-low">${tempLow}°</span>
        </div>
        <div class="forecast-desc">${capitalizeWords(data.weather.description)}</div>
        <div class="forecast-details">
            <div class="forecast-detail">
                <i class="fas fa-tint"></i>
                <span>${data.avg_humidity}%</span>
            </div>
            <div class="forecast-detail">
                <i class="fas fa-wind"></i>
                <span>${Math.round(data.avg_wind * 3.6)} km/h</span>
            </div>
        </div>
    `

  // Add hover effect
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })

  return card
}

/**
 * Create hourly card element with animations
 */
function createHourlyCard(data, index) {
  const card = document.createElement("div")
  card.className = "hourly-card"
  card.style.animationDelay = `${index * 0.05}s`

  const time = new Date(data.dt * 1000)
  const timeString = formatTime(time)
  const temp = Math.round(data.main.temp)
  const weatherType = data.weather[0].main.toLowerCase()
  const iconClass = WEATHER_ICONS[weatherType] || "fas fa-sun"
  const iconColor = WEATHER_COLORS[weatherType] || "#ffa726"
  const humidity = data.main.humidity
  const windSpeed = Math.round(data.wind.speed * 3.6)

  card.innerHTML = `
        <div class="hourly-time">${timeString}</div>
        <div class="hourly-icon" style="color: ${iconColor}">
            <i class="${iconClass}"></i>
        </div>
        <div class="hourly-temp">${temp}°</div>
        <div class="hourly-details">
            <div class="hourly-detail">
                <i class="fas fa-tint"></i>
                <span>${humidity}%</span>
            </div>
            <div class="hourly-detail">
                <i class="fas fa-wind"></i>
                <span>${windSpeed}</span>
            </div>
        </div>
    `

  return card
}

/**
 * Update weather background animation
 */
function updateWeatherBackground(weatherType) {
  console.log(`🎨 Updating background for ${weatherType} weather...`)

  // Update body background
  const backgroundGradients = {
    clear: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    clouds: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    rain: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    drizzle: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    thunderstorm: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    snow: "linear-gradient(135deg, #e6dee9 0%, #a8edea 100%)",
    mist: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    fog: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    haze: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  }

  const gradient = backgroundGradients[weatherType] || backgroundGradients["clear"]
  document.body.style.background = gradient

  // Update weather particles
  updateWeatherParticles(weatherType)

  console.log("✅ Background updated!")
}

/**
 * Update weather particles animation
 */
function updateWeatherParticles(weatherType) {
  const particles = elements.weatherParticles

  // Clear existing particles
  particles.className = "weather-particles"
  particles.innerHTML = ""

  // Add appropriate weather particles
  switch (weatherType) {
    case "clear":
      particles.classList.add("sunny")
      createSunParticles(particles)
      break
    case "rain":
    case "drizzle":
      particles.classList.add("rainy")
      createRainParticles(particles)
      break
    case "snow":
      particles.classList.add("snowy")
      createSnowParticles(particles)
      break
    case "thunderstorm":
      particles.classList.add("stormy")
      createThunderstormParticles(particles)
      break
    case "clouds":
      createCloudParticles(particles)
      break
  }
}

/**
 * Create sun particles
 */
function createSunParticles(container) {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "sun-particle"
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #ffa726, transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle ${2 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `
    container.appendChild(particle)
  }
}

/**
 * Create rain particles
 */
function createRainParticles(container) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "rain-particle"
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, #42a5f5, transparent);
            left: ${Math.random() * 100}%;
            animation: rainFall ${1 + Math.random()}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `
    container.appendChild(particle)
  }
}

/**
 * Create snow particles
 */
function createSnowParticles(container) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.className = "snow-particle"
    particle.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 6}px;
            height: ${4 + Math.random() * 6}px;
            background: radial-gradient(circle, white, rgba(255,255,255,0.8));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: snowFall ${3 + Math.random() * 2}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `
    container.appendChild(particle)
  }
}

/**
 * Create thunderstorm particles
 */
function createThunderstormParticles(container) {
  // Lightning effect
  const lightning = document.createElement("div")
  lightning.className = "lightning-effect"
  lightning.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: lightning 4s ease-in-out infinite;
    `
  container.appendChild(lightning)

  // Rain particles
  createRainParticles(container)
}

/**
 * Create cloud particles
 */
function createCloudParticles(container) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div")
    particle.className = "cloud-particle"
    particle.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 40}px;
            height: ${10 + Math.random() * 20}px;
            background: rgba(255,255,255,0.1);
            border-radius: 50px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: cloudDrift ${10 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `
    container.appendChild(particle)
  }
}

/**
 * Switch temperature unit
 */
async function switchUnit(unit) {
  if (unit === currentUnit) return

  console.log(`🌡️ Switching to ${unit === "metric" ? "Celsius" : "Fahrenheit"}...`)

  currentUnit = unit

  // Update button states with animation
  elements.celsiusBtn.classList.toggle("active", unit === "metric")
  elements.fahrenheitBtn.classList.toggle("active", unit === "imperial")

  // Convert current temperature display
  if (currentWeatherData) {
    if (WEATHER_CONFIG.DEMO_MODE || WEATHER_CONFIG.API_KEY === "YOUR_API_KEY_HERE") {
      // Convert demo data
      convertTemperatureDisplay(unit)
    } else {
      // Refresh with real API data
      const { coord } = currentWeatherData
      showLoading()
      await getWeatherData(coord.lat, coord.lon)
    }
  }

  console.log("✅ Temperature unit switched!")
}

/**
 * Convert temperature display for demo mode
 */
function convertTemperatureDisplay(unit) {
  if (!currentWeatherData) return

  const tempElement = elements.currentTemp
  const currentTempValue = Number.parseInt(tempElement.textContent)

  let newTemp
  if (unit === "imperial") {
    // Convert C to F
    newTemp = Math.round((currentTempValue * 9) / 5 + 32)
  } else {
    // Convert F to C
    newTemp = Math.round(((currentTempValue - 32) * 5) / 9)
  }

  // Animate temperature change
  animateValue(tempElement, currentTempValue, newTemp, 500, "°")

  // Update feels like temperature
  const feelsLikeValue = Number.parseInt(elements.feelsLike.textContent.match(/\d+/)[0])
  let newFeelsLike
  if (unit === "imperial") {
    newFeelsLike = Math.round((feelsLikeValue * 9) / 5 + 32)
  } else {
    newFeelsLike = Math.round(((feelsLikeValue - 32) * 5) / 9)
  }
  elements.feelsLike.textContent = `Feels like ${newFeelsLike}°`

  // Update forecast temperatures
  updateForecastTemperatures(unit)
}

/**
 * Update forecast temperatures when unit changes
 */
function updateForecastTemperatures(unit) {
  const forecastCards = document.querySelectorAll(".forecast-card")
  forecastCards.forEach((card) => {
    const tempHigh = card.querySelector(".temp-high")
    const tempLow = card.querySelector(".temp-low")

    if (tempHigh && tempLow) {
      const highValue = Number.parseInt(tempHigh.textContent)
      const lowValue = Number.parseInt(tempLow.textContent)

      let newHigh, newLow
      if (unit === "imperial") {
        newHigh = Math.round((highValue * 9) / 5 + 32)
        newLow = Math.round((lowValue * 9) / 5 + 32)
      } else {
        newHigh = Math.round(((highValue - 32) * 5) / 9)
        newLow = Math.round(((lowValue - 32) * 5) / 9)
      }

      tempHigh.textContent = `${newHigh}°`
      tempLow.textContent = `${newLow}°`
    }
  })

  const hourlyCards = document.querySelectorAll(".hourly-card")
  hourlyCards.forEach((card) => {
    const temp = card.querySelector(".hourly-temp")
    if (temp) {
      const tempValue = Number.parseInt(temp.textContent)
      let newTemp
      if (unit === "imperial") {
        newTemp = Math.round((tempValue * 9) / 5 + 32)
      } else {
        newTemp = Math.round(((tempValue - 32) * 5) / 9)
      }
      temp.textContent = `${newTemp}°`
    }
  })
}

/**
 * Toggle dark/light theme with amazing animation
 */
function toggleTheme() {
  const isDark = elements.themeToggle.checked
  const theme = isDark ? "dark" : "light"

  console.log(`🎨 Switching to ${theme} theme...`)

  // Add transition class for smooth theme change
  document.body.classList.add("theme-transition")

  // Apply theme
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  // Create ripple effect
  createThemeRipple(isDark)

  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove("theme-transition")
  }, 300)

  console.log(`✅ Switched to ${theme} theme!`)
}

/**
 * Create ripple effect for theme toggle
 */
function createThemeRipple(isDark) {
  const ripple = document.createElement("div")
  ripple.className = "theme-ripple"
  ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: ${isDark ? "#1a1a1a" : "#ffffff"};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        pointer-events: none;
        animation: rippleExpand 0.6s ease-out forwards;
    `

  document.body.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

/**
 * Load theme preference from localStorage
 */
function loadThemePreference() {
  const savedTheme = localStorage.getItem("theme") || "light"
  const isDark = savedTheme === "dark"

  elements.themeToggle.checked = isDark
  document.documentElement.setAttribute("data-theme", savedTheme)

  console.log(`🎨 Loaded ${savedTheme} theme preference`)
}

/**
 * Update current date display
 */
function updateCurrentDate() {
  const now = new Date()
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  elements.currentDate.textContent = now.toLocaleDateString("en-US", options)
}

/**
 * Format time to 12-hour format
 */
function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Capitalize words
 */
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * Show loading spinner with animation
 */
function showLoading() {
  elements.loadingContainer.style.display = "block"
  elements.errorMessage.style.display = "none"
  elements.mainContent.style.display = "none"

  // Add loading animation class
  elements.loadingContainer.classList.add("animate-in")
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  elements.loadingContainer.style.display = "none"
  elements.mainContent.style.display = "block"

  // Add content animation
  elements.mainContent.classList.add("animate-in")
}

/**
 * Show error message with animation
 */
function showError(message) {
  elements.errorMessage.style.display = "block"
  document.getElementById("errorText").textContent = message
  elements.loadingContainer.style.display = "none"
  elements.mainContent.style.display = "none"

  // Add error animation
  elements.errorMessage.classList.add("animate-in")
}

/**
 * Debounce function to limit API calls
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add CSS animations for particles
const particleStyles = document.createElement("style")
particleStyles.textContent = `
    @keyframes rainFall {
        0% { transform: translateY(-100vh); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes snowFall {
        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes lightning {
        0%, 90%, 100% { opacity: 0; }
        5%, 10% { opacity: 1; }
    }
    
    @keyframes cloudDrift {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(calc(100vw + 100px)); }
    }
    
    @keyframes rippleExpand {
        0% { width: 0; height: 0; opacity: 0.8; }
        100% { width: 200vmax; height: 200vmax; opacity: 0; }
    }
    
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
    
    .forecast-details, .hourly-details {
        display: flex;
        gap: 10px;
        margin-top: 8px;
        font-size: 0.8rem;
        color: var(--text-muted);
    }
    
    .forecast-detail, .hourly-detail {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .forecast-date {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: 10px;
    }
    
    .tag-sunny { background: linear-gradient(135deg, #ffa726, #ff9800); }
    .tag-cloudy { background: linear-gradient(135deg, #78909c, #607d8b); }
    .tag-rainy { background: linear-gradient(135deg, #42a5f5, #2196f3); }
    .tag-snowy { background: linear-gradient(135deg, #e1f5fe, #b3e5fc); color: #333; }
    .tag-stormy { background: linear-gradient(135deg, #5c6bc0, #3f51b5); }
    .tag-default { background: linear-gradient(135deg, #4facfe, #00f2fe); }
    
    .uv-low { background: linear-gradient(90deg, #4caf50, #8bc34a); }
    .uv-moderate { background: linear-gradient(90deg, #ffa726, #ff9800); }
    .uv-high { background: linear-gradient(90deg, #ff7043, #f4511e); }
    .uv-very-high { background: linear-gradient(90deg, #e91e63, #c2185b); }
    .uv-extreme { background: linear-gradient(90deg, #9c27b0, #673ab7); }
`
document.head.appendChild(particleStyles)

// Handle online/offline status
window.addEventListener("online", () => {
  console.log("🌐 Back online")
  if (currentWeatherData && !WEATHER_CONFIG.DEMO_MODE) {
    const { coord } = currentWeatherData
    getWeatherData(coord.lat, coord.lon)
  }
})

window.addEventListener("offline", () => {
  console.log("📴 Gone offline")
  showError("You are currently offline. Displaying cached data.")
})

// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === "measure") {
      console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`)
    }
  }
})
observer.observe({ entryTypes: ["measure"] })

console.log("🚀 Weather Dashboard script loaded successfully!")
