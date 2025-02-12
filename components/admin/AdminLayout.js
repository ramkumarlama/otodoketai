import { useUser } from "@auth0/nextjs-auth0"

import { useRouter } from "next/router"
import { MobileMenu, DesktopMenu } from "./Menu"
import { useState } from "react"

// stats, seo, orders,
export default function Admin({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (user) {
    return (
      <div className="h-screen bg-white  flex">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopMenu />
        <div className="flex-1 flex flex-col">
          <div className="w-full max-w-4xl mx-auto  md:px-8 xl:px-0">
            {/* {router.pathname === "/admin/orders" && ( */}
            <div className="mb-8 relative w-full max-w-4xl z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <MenuButton setIsOpen={setIsOpen} />
              <Search />
            </div>
            {/* )}  */}
          </div>
          <main
            className="flex-1 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            <div className="relative max-w-4xl mx-auto px-2.5 ">{children}</div>
          </main>
        </div>
      </div>
    )
  }
  // return <a href="/api/auth/login">Login</a>
  return (window.location.href = `/api/auth/login?returnTo=${router.asPath}`)
}

const MenuButton = ({ setIsOpen }) => (
  <button
    onClick={() => setIsOpen(true)}
    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
  >
    <span className="sr-only">Open sidebar</span>
    {/* Heroicon name: outline/menu-alt=""-2 */}
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  </button>
)
const Search = () => (
  <div className="flex-1 flex justify-between px-4 md:px-0 py-4">
    <div className="flex-1 flex">
      <form className="w-full flex md:ml-0" action="#" method="GET">
        <label htmlFor="search_field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            {/* Heroicon name: solid/search */}
            <svg
              className="flex-shrink-0 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            name="search_field"
            id="search_field"
            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
            placeholder="検索"
            type="search"
          />
          <input
            name="search_field"
            id="search_field"
            className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
            placeholder="検索"
            type="search"
          />
        </div>
      </form>
    </div>
    <div className="ml-4 flex items-center md:ml-6">
      <button className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
        {/* Heroicon name: outline/bell */}
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="sr-only">View notifications</span>
      </button>
    </div>
  </div>
)
