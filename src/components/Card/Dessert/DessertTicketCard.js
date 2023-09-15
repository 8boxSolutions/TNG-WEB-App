import React from 'react'

export default function DessertTicketCard({item, ticket, setTicket}) {
  return (
    <div onClick={() => setTicket(item)} className='cursor-pointer relative text-center my-4 leading-6 text-sm w-full w-full hoverEffects'>
      {
        item?.Promo &&
        <div className="absolute top-10 z-10 right-[40px] px-8 bg-white transform rotate-45 translate-x-1/2 -translate-y-1/2">
          <span className="text-xs font-bold">{item?.Promo}</span>
        </div>
      }
        <div className={`${ticket?.id === item?.id ? 'bg-[#FF98C3]' : 'bg-[#F9DCED]'} p-6 relative`}>
            <p className='text-lg'>{item?.Name}</p>
            <p className='mb-4 mt-4'>{item?.Description}</p>
            <p className='mt-10'>
            FROM<br/>
            <span className='text-lg font-bold'>PHP {item?.Price}</span>
            </p>
        </div>
    </div>
  )
}
