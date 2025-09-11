'use client'

import { useState, useMemo } from 'react'

// Types
interface VehicleItem {
  id: string
  title: string
  image: string
  manufacturer: string
}

interface PartItem {
  id: string
  title: string
  image: string
  category: string
}

type CatalogTab = 'vehicle' | 'parts'
type Manufacturer = 'Toyota' | 'Nissan' | 'Ford' | 'Chevrolet' | 'Mercedes' | 'Volkswagen' | 'Isuzu'
type Category = 'Frontal' | 'Lateral' | 'Trasero' | 'Superior'

// Sample data
const vehicleData: VehicleItem[] = [
  {
    id: 'v1',
    title: 'Toyota Corolla 2020-2023',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Toyota'
  },
  {
    id: 'v2',
    title: 'Toyota Camry 2018-2022',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Toyota'
  },
  {
    id: 'v3',
    title: 'Nissan Sentra 2019-2023',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Nissan'
  },
  {
    id: 'v4',
    title: 'Nissan Altima 2020-2024',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Nissan'
  },
  {
    id: 'v5',
    title: 'Ford F-150 2021-2024',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Ford'
  },
  {
    id: 'v6',
    title: 'Ford Mustang 2018-2023',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Ford'
  },
  {
    id: 'v7',
    title: 'Chevrolet Silverado 2019-2023',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Chevrolet'
  },
  {
    id: 'v8',
    title: 'Chevrolet Malibu 2020-2024',
    image: 'https://images.unsplash.com/photo-1549399562-453c3d855dfd?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Chevrolet'
  },
  {
    id: 'v9',
    title: 'Mercedes C-Class 2021-2024',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Mercedes'
  },
  {
    id: 'v10',
    title: 'Volkswagen Jetta 2019-2023',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Volkswagen'
  },
  {
    id: 'v11',
    title: 'Isuzu D-Max 2020-2024',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Isuzu'
  },
  {
    id: 'v12',
    title: 'Mercedes E-Class 2020-2023',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center',
    manufacturer: 'Mercedes'
  }
]

const partsData: PartItem[] = [
  {
    id: 'p1',
    title: 'Parabrisas Frontal Templado',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center',
    category: 'Frontal'
  },
  {
    id: 'p2',
    title: 'Parabrisas Frontal Laminado',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop&crop=center',
    category: 'Frontal'
  },
  {
    id: 'p3',
    title: 'Cristal Lateral Delantero',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&crop=center',
    category: 'Lateral'
  },
  {
    id: 'p4',
    title: 'Cristal Lateral Trasero',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
    category: 'Lateral'
  },
  {
    id: 'p5',
    title: 'Medallon Trasero',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center',
    category: 'Trasero'
  },
  {
    id: 'p6',
    title: 'Luneta Trasera',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center',
    category: 'Trasero'
  },
  {
    id: 'p7',
    title: 'Techo Solar',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop&crop=center',
    category: 'Superior'
  },
  {
    id: 'p8',
    title: 'Quemacocos',
    image: 'https://images.unsplash.com/photo-1549399562-453c3d855dfd?w=400&h=300&fit=crop&crop=center',
    category: 'Superior'
  },
  {
    id: 'p9',
    title: 'Cristal Lateral Fijo',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center',
    category: 'Lateral'
  },
  {
    id: 'p10',
    title: 'Parabrisas Frontal Premium',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center',
    category: 'Frontal'
  }
]

const manufacturers: Manufacturer[] = ['Toyota', 'Nissan', 'Ford', 'Chevrolet', 'Mercedes', 'Volkswagen', 'Isuzu']
const categories: Category[] = ['Frontal', 'Lateral', 'Trasero', 'Superior']

export function WindshieldCatalog() {
  const [activeTab, setActiveTab] = useState<CatalogTab>('vehicle')
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | 'Todos'>('Todos')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos')

  // Reset filters when switching tabs
  const handleTabChange = (tab: CatalogTab) => {
    setActiveTab(tab)
    setSelectedManufacturer('Todos')
    setSelectedCategory('Todos')
  }

  // Calculate counts for each filter option
  const manufacturerCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Todos': vehicleData.length }
    manufacturers.forEach(manufacturer => {
      counts[manufacturer] = vehicleData.filter(item => item.manufacturer === manufacturer).length
    })
    return counts
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Todos': partsData.length }
    categories.forEach(category => {
      counts[category] = partsData.filter(item => item.category === category).length
    })
    return counts
  }, [])

  // Filter data based on selected filters
  const filteredVehicles = useMemo(() => {
    if (selectedManufacturer === 'Todos') return vehicleData
    return vehicleData.filter(item => item.manufacturer === selectedManufacturer)
  }, [selectedManufacturer])

  const filteredParts = useMemo(() => {
    if (selectedCategory === 'Todos') return partsData
    return partsData.filter(item => item.category === selectedCategory)
  }, [selectedCategory])

  const currentData = activeTab === 'vehicle' ? filteredVehicles : filteredParts
  const totalCount = activeTab === 'vehicle' ? vehicleData.length : partsData.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Catálogo de Parabrisas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra el parabrisas perfecto para tu vehículo. Contamos con la mayor variedad 
              de cristales automotrices para todas las marcas y modelos.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleTabChange('vehicle')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'vehicle'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Por Vehículo
              </button>
              <button
                onClick={() => handleTabChange('parts')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'parts'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Por Parte
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Filter */}
          <div className="w-48 lg:w-64 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                {activeTab === 'vehicle' ? 'Filtrar por Marca' : 'Filtrar por Categoría'}
              </h3>
              
              <div className="space-y-2">
                {activeTab === 'vehicle' ? (
                  <>
                    {/* All Manufacturers Option */}
                    <label className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="manufacturer"
                        value="Todos"
                        checked={selectedManufacturer === 'Todos'}
                        onChange={(e) => setSelectedManufacturer(e.target.value as 'Todos')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1">Todos</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {manufacturerCounts['Todos']}
                      </span>
                    </label>

                    {/* Individual Manufacturers */}
                    {manufacturers.map(manufacturer => (
                      <label
                        key={manufacturer}
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="manufacturer"
                          value={manufacturer}
                          checked={selectedManufacturer === manufacturer}
                          onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 flex-1">{manufacturer}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {manufacturerCounts[manufacturer]}
                        </span>
                      </label>
                    ))}
                  </>
                ) : (
                  <>
                    {/* All Categories Option */}
                    <label className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="category"
                        value="Todos"
                        checked={selectedCategory === 'Todos'}
                        onChange={(e) => setSelectedCategory(e.target.value as 'Todos')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1">Todos</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {categoryCounts['Todos']}
                      </span>
                    </label>

                    {/* Individual Categories */}
                    {categories.map(category => (
                      <label
                        key={category}
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value as Category)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 flex-1">{category}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {categoryCounts[category]}
                        </span>
                      </label>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'vehicle' ? 'Vehículos' : 'Partes'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Mostrando {currentData.length} de {totalCount} productos
                </p>
              </div>
            </div>

            {/* Product Grid */}
            {currentData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {activeTab === 'vehicle' 
                            ? (item as VehicleItem).manufacturer 
                            : (item as PartItem).category
                          }
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-500 mb-4">
                    No hay productos que coincidan con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedManufacturer('Todos')
                      setSelectedCategory('Todos')
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
