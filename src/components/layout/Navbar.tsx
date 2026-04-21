import { Search, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/articles?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="h-12 bg-white border-b border-gray-200 flex items-center px-5 gap-3 sticky top-0 z-10 flex-shrink-0">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search articles, tags, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-gray-400 text-gray-800"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <ExternalLink size={15} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-semibold">
            IT
          </div>
          <div className="leading-tight">
            <p className="text-[12px] font-medium text-gray-800">IT Admin</p>
            <p className="text-[10px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
