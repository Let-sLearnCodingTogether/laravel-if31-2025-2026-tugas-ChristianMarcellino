import { useState, useEffect } from "react"

export function AlertInfo({ onClose, color, alertType, alertContent }){
    return <div className={`top-0 z-50 absolute flex items-center p-4 mb-4 text-sm text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 dark:border-${color}-800`} role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    <span className="font-medium">{alertType}</span>{alertContent}
  </div>
</div>
}

export function AlertList({ onClose, items =[], title }){
    return <div className={`top-0 transition-opacity ease-in-out duration-500 z-50 absolute flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
    <svg className="shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div>
        <div className="flex justify-between gap-5">
            <p className="font-medium">{title}</p>
            <button className="px-1 hover:ring-2 rounded-2xl transition duration-400" onClick={onClose}>X</button>
        </div>
        <ul className="mt-1.5 list-disc list-inside">
          {items.map((item, index)=>(
            item ? <li key={index}>{item}</li> :"" 
          ))}
      </ul>
    </div>
  </div>
}

