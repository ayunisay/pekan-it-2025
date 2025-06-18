import React from 'react'
import dashboardBg from '../assets/images/dashboardBg.png'
import imgRight from '../assets/images/dbItem1.png'

export const Dashboard = () => {
  return (
    <>
       <div className={`w-full h-screen bg-cover bg-center flex items-center justify-center`} style={{ backgroundImage: `url(${dashboardBg})`}}>
      <div className='flex flex-row items-center justify-center w-full max-w-7xl mx-auto px-12'>
        <div className='flex-1 max-w-lg mr-16'>
          <h1 className='text-5xl font-bold text-white mb-6 leading-tight'>Sulit fokus sendiri?</h1>
          <p className='text-white text-lg mb-8 leading-relaxed'>
            Temukan partner belajarmu, jadwalkan sesi Pomodoro, dan selesaikan to-do list bersama. Raih target belajarmu lebih cepat!
          </p>
          <button className='bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
            Find your friends
          </button>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <img src={imgRight} alt="" className='max-w-full h-auto object-contain' />
        </div>
      </div>
    </div>
    </>
  )
}