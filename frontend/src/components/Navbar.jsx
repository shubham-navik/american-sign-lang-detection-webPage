import React from 'react'

const Navbar = () => {
  return (
      <>
          <div className="navbar bg-blue-800 sticky top-0 left-0 right-0 z-10">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-800 rounded-box w-52">
        <li><a>ASL</a></li>
        <li>
          <a>Developers</a>
          <ul className="p-2">
            <li><a>Satyam</a></li>
            <li><a>Shubham</a></li>
          </ul>
        </li>
        <li><a>About</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl  font-bold text-black"><span className='text-4xl text-slate-50'>S&S </span>Tech</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-slate-50 font-bold">
      <li><a>ASL</a></li>
      <li>
        <details className='bg-blue-800 '>
          <summary>Developers</summary>
          <ul className="p-2">
            <li><a>Shubham</a></li>
            <li><a>Satyam</a></li>
          </ul>
        </details>
      </li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Start</a>
  </div>
</div>
      </>
  )
}

export default Navbar